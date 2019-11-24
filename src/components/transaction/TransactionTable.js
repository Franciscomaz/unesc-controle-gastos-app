/* eslint-disable react/display-name */
import { TRANSACTION_TYPES } from './transaction-constants';

import React from 'react';
import { Table, Divider, Popconfirm } from 'antd';
import PropTypes from 'prop-types';

function TransactionTable(props) {
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      sorter: true
    },
    {
      title: 'Conta',
      dataIndex: 'conta.nome',
      width: '150px'
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria.nome',
      width: '150px'
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      align: 'right',
      width: '150px',
      render: (text, transaction) => (
        <span
          style={{
            color:
              transaction.tipo === TRANSACTION_TYPES.GANHO ? 'green' : 'red'
          }}
        >
          {text.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
          })}
        </span>
      )
    },
    {
      title: 'Ação',
      key: 'action',
      width: '135px',
      render: (text, transaction) => (
        <span>
          <a onClick={() => props.handleEdit(transaction)}>Editar</a>
          <Divider type="vertical" />
          <Popconfirm
            title="Tem certeza que deseja deletar?"
            okText="Sim"
            cancelText="Não"
            onConfirm={() =>
              props.handleDelete(transaction.conta.id, transaction.id)
            }
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
      dataSource={props.transactions}
      columns={columns}
      loading={props.loading}
      onChange={props.handleTableChange}
      bordered
    />
  );
}

TransactionTable.propTypes = {
  transactions: PropTypes.array,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  handleTableChange: PropTypes.func,
  loading: PropTypes.bool
};

export default TransactionTable;
