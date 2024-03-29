import React, { useState, useEffect } from 'react';

import { Row, Col, Input, Button } from 'antd';

import TransactionDetail from './TransactionDetail';
import TransactionService from './transaction.service';
import TransactionTable from './TransactionTable';

import notificator from '../../core/feedback/notificator';

function TransactionPage() {
  const [transaction, setTransaction] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({ perPage: 10 });
  const [isLoading, setIsLoading] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  useEffect(() => {
    fetchTransactions({ limit: 10 });
  }, []);

  const fetchTransactions = async queryParams => {
    setIsLoading(true);

    try {
      const response = await TransactionService.findAll(queryParams);
      setPagination({ total: response.data.total });
      setTransactions(response.data.content);
    } catch {
      setTransactions([]);
    }

    setIsLoading(false);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    fetchTransactions({
      offset: (pagination.current - 1) * pagination.pageSize,
      limit: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order
    });
  };

  const handleSave = payload => {
    const apiServiceCall = () => {
      return !!payload.id
        ? TransactionService.update(payload.contaId, payload.id, payload)
        : TransactionService.save(payload.contaId, payload);
    };

    return apiServiceCall().then(() => {
      notificator.success(
        `Transação ${payload.id ? 'editada' : 'cadastrada'} com sucesso`
      );
      fetchTransactions();
    });
  };

  const handleEdit = data => {
    setTransaction(data);
    setIsTransactionModalOpen(true);
  };

  const handleDelete = (accountId, id) => {
    TransactionService.delete(accountId, id).then(() => fetchTransactions());
  };

  const handleClose = () => {
    setTransaction({});
    setIsTransactionModalOpen(false);
  };

  return (
    <div className="p-2">
      <TransactionDetail
        transaction={transaction}
        isVisible={isTransactionModalOpen}
        handleSave={handleSave}
        handleClose={handleClose}
      />

      <Row className="mb-2" type="flex" justify="space-between">
        <Col>
          <Button
            type="primary"
            icon="plus"
            onClick={() => setIsTransactionModalOpen(true)}
          >
            Transação
          </Button>
        </Col>
        <Col>
          <Row type="flex">
            <Col style={{ paddingRight: 5 }}>
              <Button
                shape="circle"
                icon="reload"
                onClick={() => fetchTransactions()}
                disabled={isLoading}
              />
            </Col>
            <Col>
              <Input.Search
                placeholder="search"
                onSearch={value => fetchTransactions({ nome: value })}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="has-white" style={{ padding: 10 }}>
        <TransactionTable
          pagination={pagination}
          transactions={transactions}
          handleChange={handleTableChange}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          loading={isLoading}
        ></TransactionTable>
      </div>
    </div>
  );
}

export default TransactionPage;
