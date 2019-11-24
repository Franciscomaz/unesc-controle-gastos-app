import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Layout, Icon, Row, Col, Popconfirm } from 'antd';
import AppMenu from './AppMenu';

import { clearStore } from '../../core/authentication/auth-storage.service';

import PropTypes from 'prop-types';

const { Header, Content, Footer } = Layout;

function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();

  const toggleCollapse = () => setCollapsed(!collapsed);

  const logout = () => {
    clearStore();
    history.push('/login');
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="sidebar-logo" />
        <AppMenu />
      </Layout.Sider>
      <Layout>
        <Header className="has-white" style={{ padding: 0 }}>
          <Row type="flex" justify="space-between">
            <Col>
              <Icon
                className="sidebar-icon"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={toggleCollapse}
              />
            </Col>
            <Col>
              <Popconfirm
                placement="topRight"
                title="Are you sure you want to logout ?"
                onConfirm={logout}
                okText="Yes"
                cancelText="No"
              >
                <Icon className="sidebar-icon" type="logout" />
              </Popconfirm>
            </Col>
          </Row>
        </Header>
        <Content style={{ padding: '0 50px' }}>{children}</Content>
        <Footer className="center-text">Controle financeiro ©2019</Footer>
      </Layout>
    </Layout>
  );
}

AppLayout.propTypes = {
  children: PropTypes.object
};

export default AppLayout;
