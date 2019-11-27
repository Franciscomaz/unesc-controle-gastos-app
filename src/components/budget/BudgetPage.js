import React, { useState, useEffect } from 'react';

import { Row, Col, Input, Button } from 'antd';

import BudgetDetail from './BudgetDetail';
import BudgetService from './budget.service';
import BudgetTable from './BudgetTable';

import notificator from '../../core/feedback/notificator';

function BudgetPage() {
  const [budget, setBudget] = useState({});
  const [budgets, setBudgets] = useState([]);
  const [pagination, setPagination] = useState({ perPage: 10 });
  const [isLoading, setIsLoading] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  useEffect(() => {
    fetchBudgets({ limit: 10 });
  }, []);

  const fetchBudgets = async queryParams => {
    setIsLoading(true);

    try {
      const response = await BudgetService.findAll(queryParams);
      setPagination({ total: response.data.total });
      setBudgets(response.data.content);
    } catch {
      setBudgets([]);
    }

    setIsLoading(false);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    fetchBudgets({
      offset: (pagination.current - 1) * pagination.pageSize,
      limit: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order
    });
  };

  const handleSave = payload => {
    const apiServiceCall = () => {
      return !!payload.id
        ? BudgetService.update(payload.id, payload)
        : BudgetService.save(payload);
    };

    return apiServiceCall().then(() => {
      notificator.success(
        `Orçamento ${payload.id ? 'editado' : 'cadastrado'} com sucesso`
      );
      fetchBudgets();
    });
  };

  const handleEdit = data => {
    setBudget(data);
    setIsBudgetModalOpen(true);
  };

  const handleDelete = id => {
    BudgetService.delete(id).then(() => fetchBudgets());
  };

  const handleClose = () => {
    setBudget({});
    setIsBudgetModalOpen(false);
  };

  return (
    <div className="p-2">
      <BudgetDetail
        budget={budget}
        isVisible={isBudgetModalOpen}
        handleSave={handleSave}
        handleClose={handleClose}
      />

      <Row className="mb-2" type="flex" justify="space-between">
        <Col>
          <Button
            type="primary"
            icon="plus"
            onClick={() => setIsBudgetModalOpen(true)}
          >
            Orçamento
          </Button>
        </Col>
        <Col>
          <Row type="flex">
            <Col style={{ paddingRight: 5 }}>
              <Button
                shape="circle"
                icon="reload"
                onClick={() => fetchBudgets()}
                disabled={isLoading}
              />
            </Col>
            <Col>
              <Input.Search
                placeholder="search"
                onSearch={value => fetchBudgets({ nome: value })}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="has-white" style={{ padding: 10 }}>
        <BudgetTable
          pagination={pagination}
          budgets={budgets}
          handleChange={handleTableChange}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          loading={isLoading}
        ></BudgetTable>
      </div>
    </div>
  );
}

export default BudgetPage;
