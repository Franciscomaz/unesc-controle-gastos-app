import { TRANSACTION_TYPES } from './transaction-constants';

import React from 'react';
import PropTypes from 'prop-types';

const COLOR = {
  GREEN: '#3f8600',
  RED: '#cf1322'
};

function TransactionValue(props) {
  return (
    <span
      style={{
        color: props.type === TRANSACTION_TYPES.GANHO ? COLOR.GREEN : COLOR.RED
      }}
    >
      {props.value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        style: 'currency',
        currency: 'BRL'
      })}
    </span>
  );
}

TransactionValue.propTypes = {
  type: PropTypes.string,
  value: PropTypes.number
};

export default TransactionValue;
