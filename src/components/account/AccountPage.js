import React, { useState, useEffect } from 'react';

import { Row, Col, Input, Button } from 'antd';

import AccountDetail from './AccountDetail';
import AccountService from './account.service';
import AccountTable from './AccountTable';

import notificator from '../../core/feedback/notificator';

function AccountPage() {
  const [account, setAccount] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async filter => {
    setIsLoading(true);

    try {
      const response = await AccountService.findAll({ nome: filter });
      setAccounts(response.data.content);
    } catch {
      setAccounts([]);
    }

    setIsLoading(false);
  };

  const handleSave = payload => {
    const apiServiceCall = () => {
      return !!payload.id
        ? AccountService.update(payload.id, payload)
        : AccountService.save(payload);
    };

    return apiServiceCall().then(() => {
      notificator.success(
        `Conta ${payload.id ? 'editada' : 'cadastrada'} com sucesso`
      );
      fetchAccounts();
    });
  };

  const handleEdit = data => {
    setAccount(data);
    setIsAccountModalOpen(true);
  };

  const handleDelete = id => {
    AccountService.delete(id).then(() => fetchAccounts());
  };

  const handleClose = () => {
    setAccount({});
    setIsAccountModalOpen(false);
  };

  return (
    <div className="p-2">
      <AccountDetail
        account={account}
        isVisible={isAccountModalOpen}
        handleSave={handleSave}
        handleClose={handleClose}
      />

      <Row className="mb-2" type="flex" justify="space-between">
        <Col>
          <Button
            type="primary"
            icon="plus"
            onClick={() => setIsAccountModalOpen(true)}
          >
            Account
          </Button>
        </Col>
        <Col>
          <Row type="flex">
            <Col style={{ paddingRight: 5 }}>
              <Button
                shape="circle"
                icon="reload"
                onClick={() => fetchAccounts()}
                disabled={isLoading}
              />
            </Col>
            <Col>
              <Input.Search
                placeholder="search"
                onSearch={value => fetchAccounts(value)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="has-white" style={{ padding: 10 }}>
        <AccountTable
          accounts={accounts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          loading={isLoading}
        ></AccountTable>
      </div>
    </div>
  );
}

export default AccountPage;
