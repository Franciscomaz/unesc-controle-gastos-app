import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { Menu, Icon } from 'antd';

function AppMenu() {
  const history = useHistory();
  const location = useLocation();

  return (
    <Menu mode="inline" theme="dark" defaultSelectedKeys={[location.pathname]}>
      <Menu.Item key={'/dashboard'} onClick={() => history.push('/dashboard')}>
        <Icon type="dashboard" />
        <span>Dashboard</span>
      </Menu.Item>
      <Menu.Item key={'/accounts'} onClick={() => history.push('/accounts')}>
        <Icon type="bank" />
        <span>Conta</span>
      </Menu.Item>
      <Menu.Item
        key={'/transactions'}
        onClick={() => history.push('/transactions')}
      >
        <Icon type="transaction" />
        <span>Transação</span>
      </Menu.Item>
      <Menu.Item
        key={'/categories'}
        onClick={() => history.push('/categories')}
      >
        <Icon type="tags" />
        <span>Categoria</span>
      </Menu.Item>
    </Menu>
  );
}

export default AppMenu;
