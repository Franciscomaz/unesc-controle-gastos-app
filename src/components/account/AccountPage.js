import React, { useState } from 'react';

import { Button } from 'antd';

import AccountDetail from './AccountDetail';

function AccountPage() {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState();

  return (
    <div>
      <AccountDetail
        isVisible={isAccountModalOpen}
        handleModalVisibility={isVisible => setIsAccountModalOpen(isVisible)}
      />
      <Button type="primary" onClick={() => setIsAccountModalOpen(true)}>
        New account
      </Button>
    </div>
  );
}

export default AccountPage;
