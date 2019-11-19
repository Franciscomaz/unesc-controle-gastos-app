import React from 'react';

import { Layout, Menu, Modal } from 'antd';

const { Header, Content, Footer } = Layout;

export default function Dashboard() {
  return (
    <Layout className="layout">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">Dashboard</Menu.Item>
          <Menu.Item key="2">Account</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div
          style={{
            background: '#fff',
            marginTop: 24,
            padding: 24,
            minHeight: 280
          }}
        >
          Dashboard
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Controle financeiro ©2019</Footer>
    </Layout>
  );
}
