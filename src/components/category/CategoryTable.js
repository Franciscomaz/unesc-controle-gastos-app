/* eslint-disable react/display-name */
import React from 'react';
import { Table, Divider, Popconfirm } from 'antd';
import PropTypes from 'prop-types';

function CategoryTable(props) {
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
      render: (text, category) => (
        <span>
          <a onClick={() => props.handleEdit(category)}>Editar</a>
          <Divider type="vertical" />
          <Popconfirm
            title="Tem certeza que deseja deletar?"
            okText="Sim"
            cancelText="Não"
            onConfirm={() => props.handleDelete(category.id)}
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
      dataSource={props.categories}
      pagination={props.pagination}
      onChange={props.handleChange}
      loading={props.loading}
      bordered
    />
  );
}

CategoryTable.propTypes = {
  categories: PropTypes.array,
  pagination: PropTypes.object,
  handleChange: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  loading: PropTypes.bool
};

export default CategoryTable;
