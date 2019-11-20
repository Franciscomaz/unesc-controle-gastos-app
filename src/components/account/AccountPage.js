import React, { useState } from 'react';

import { Row, Col, Input, Button } from 'antd';

import AccountDetail from './AccountDetail';

function AccountPage() {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState();

  return (
    <div className="p-2">
      <Row className="mb-2" type="flex" justify="space-between">
        <Col span={2}>
          <Button
            type="primary"
            icon="plus"
            onClick={() => setIsAccountModalOpen(true)}
          >
            Account
          </Button>
        </Col>
        <Col xs={16} md={16} lg={10} xl={5}>
          <Row>
            <Col span={2}>
              <Button shape="circle" icon="reload" />
            </Col>
            <Col span={22}>
              <Input.Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="has-white" style={{ minHeight: 280 }}>
        <AccountDetail
          isVisible={isAccountModalOpen}
          handleModalVisibility={isVisible => setIsAccountModalOpen(isVisible)}
        />
      </div>
    </div>
  );
}

export default AccountPage;
