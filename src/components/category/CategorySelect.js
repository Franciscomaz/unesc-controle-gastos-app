/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { Select, Spin } from 'antd';

import CategoryService from './category.service';

import { debounce } from 'lodash';

import PropTypes from 'prop-types';

function CategorySelect(props) {
  const [categories, setCategories] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetchCategories = async name => {
    setFetching(true);

    try {
      const queryParams = {
        nome: name,
        limit: 999
      };

      const response = await CategoryService.findAll(queryParams);
      const content = response.data.content.map(category => {
        return {
          text: category.nome,
          value: category.id
        };
      });

      setCategories(content);
      setFetching(false);
    } catch {
      setFetching(false);
    }
  };

  return (
    <Select
      ref={props.forwardedRef}
      className="w-100"
      placeholder="Seleciona uma categoria"
      defaultValue={props.initialValue}
      onSearch={debounce(fetchCategories, 500)}
      onChange={props.handleChange}
      onDropdownVisibleChange={() => fetchCategories()}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      labelInValue
      showSearch
    >
      {categories.map(option => (
        <Select.Option key={option.value}>{option.text}</Select.Option>
      ))}
    </Select>
  );
}

CategorySelect.propTypes = {
  initialValue: PropTypes.object,
  handleChange: PropTypes.func,
  forwardedRef: PropTypes.func
};

export default React.forwardRef((props, ref) => (
  <CategorySelect forwardedRef={ref} {...props}></CategorySelect>
));
