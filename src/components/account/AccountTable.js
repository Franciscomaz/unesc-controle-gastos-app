/* eslint-disable react/display-name */
import React from 'react';
import { Table, Divider, Popconfirm } from 'antd';
import PropTypes from 'prop-types';

function AccountTable(props) {
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      sorter: true
    },
    {
      title: 'Ação',
      key: 'action',
      width: '135px',
      render: (text, account) => (
        <span>
          <a onClick={() => props.handleEdit(account)}>Editar</a>
          <Divider type="vertical" />
          <Popconfirm
            title="Tem certeza que deseja deletar?"
            okText="Sim"
            cancelText="Não"
            onConfirm={() => props.handleDelete(account.id)}
          >
            <a>Deletar</a>
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
