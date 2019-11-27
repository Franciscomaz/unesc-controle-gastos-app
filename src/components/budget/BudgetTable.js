/* eslint-disable react/display-name */
import React from 'react';
import { Table, Divider, Popconfirm } from 'antd';
import PropTypes from 'prop-types';

function BudgetTable(props) {
  const columns = [
    {
      title: 'Categoria',
      dataIndex: 'categoria.nome',
      sorter: true
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      align: 'right',
      width: '150px',
      sorter: true,
      render: (text, budget) => (
        <span>
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
      render: (text, budget) => (
        <span>
          <a onClick={() => props.handleEdit(budget)}>Editar</a>
          <Divider type="vertical" />
          <Popconfirm
            title="Tem certeza que deseja deletar?"
            okText="Sim"
            cancelText="Não"
            onConfirm={() => props.handleDelete(budget.id)}
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
      dataSource={props.budgets}
      pagination={props.pagination}
      onChange={props.handleChange}
      loading={props.loading}
      bordered
    />
  );
}

BudgetTable.propTypes = {
  budgets: PropTypes.array,
  pagination: PropTypes.object,
  handleChange: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  handleTableChange: PropTypes.func,
  loading: PropTypes.bool
};

export default BudgetTable;
