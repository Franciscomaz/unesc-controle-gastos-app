import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';

const { Header, Content, Footer } = Layout;

function DefaultLayout({ children }) {
  const location = useLocation();

  return (
    <Layout className="layout">
      <Header>
        <Menu
          mode="horizontal"
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key={'/dashboard'}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key={'/accounts'}>
            <Link to="/accounts">Account</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>{children}</Content>
      <Footer className="center-text">Controle financeiro ©2019</Footer>
    </Layout>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.object
};

export default DefaultLayout;
