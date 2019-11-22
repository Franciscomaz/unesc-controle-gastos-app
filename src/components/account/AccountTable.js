/* eslint-disable react/display-name */
import React from 'react';
import { Table, Divider, Popconfirm } from 'antd';
import PropTypes from 'prop-types';

function AccountTable(props) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'nome'
    },
    {
      title: 'Action',
      key: 'action',
      width: '115px',
      render: (text, account) => (
        <span>
          <a onClick={() => props.handleEdit(account)}>Edit</a>
          <Divider type="vertical" />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => props.handleDelete(account.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </span>
      )
    }
  ];

  return (
    <Table
      rowKey={record => record.id}
      dataSource={props.accounts}
      columns={columns}
      loading={props.loading}
      bordered
    />
  );
}

AccountTable.propTypes = {
  accounts: PropTypes.array,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  loading: PropTypes.bool
};

export default AccountTable;
