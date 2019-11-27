/* eslint-disable react/display-name */
import React from 'react';
import { Table, Divider, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import TransactionValue from './TransactionValue';

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
      width: '150px',
      sorter: true
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria.nome',
      width: '150px',
      sorter: true
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      align: 'right',
      width: '150px',
      sorter: true,
      render: (text, transaction) => (
        <TransactionValue
          key={transaction.id}
          value={text}
          type={transaction.tipo}
        />
      )
    },
    {
      title: 'Data e hora',
      dataIndex: 'createdAt',
      width: '170px',
      sorter: true,
      render: text => <span>{moment(text).format('D/M/Y [ás] k:mm[h]')}</span>
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
      columns={columns}
      rowKey={record => record.id}
      dataSource={props.transactions}
      pagination={props.pagination}
      onChange={props.handleChange}
      loading={props.loading}
      bordered
    />
  );
}

TransactionTable.propTypes = {
  transactions: PropTypes.array,
  pagination: PropTypes.object,
  handleChange: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  handleTableChange: PropTypes.func,
  loading: PropTypes.bool
};

export default TransactionTable;
