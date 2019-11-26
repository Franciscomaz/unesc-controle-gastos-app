import React, { useState } from 'react';
import { Select, Spin } from 'antd';

import AccountService from './account.service';

import { debounce } from 'lodash';

import PropTypes from 'prop-types';

function AccountSelect(props) {
  const [accounts, setAccounts] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetchAccounts = async name => {
    setFetching(true);

    try {
      const queryParams = {
        nome: name,
        limit: 999
      };

      const response = await AccountService.findAll(queryParams);
      const content = response.data.content.map(account => {
        return {
          text: account.nome,
          value: account.id
        };
      });

      setAccounts(content);
      setFetching(false);
    } catch {
      setFetching(false);
    }
  };

  return (
    <Select
      ref={props.forwardedRef}
      className="w-100"
      placeholder="Seleciona uma conta"
      defaultValue={props.initialValue}
      onSearch={debounce(fetchAccounts, 500)}
      onChange={props.handleChange}
      onDropdownVisibleChange={() => fetchAccounts()}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      disabled={props.disabled}
      labelInValue
      showSearch
    >
      {accounts.map(option => (
        <Select.Option key={option.value}>{option.text}</Select.Option>
      ))}
    </Select>
  );
}

AccountSelect.propTypes = {
  initialValue: PropTypes.object,
  handleChange: PropTypes.func,
  forwardedRef: PropTypes.func,
  disabled: PropTypes.bool
};

export default React.forwardRef(
  Object.assign(
    (props, ref) => (
      <AccountSelect forwardedRef={ref} {...props}></AccountSelect>
    ),
    { displayName: 'AccountSelect' }
  )
);
