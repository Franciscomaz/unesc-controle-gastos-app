import { TRANSACTION_TYPES } from './transaction-constants';

import React, { useEffect, useState } from 'react';

import { Form, Input, InputNumber, Select, Modal, Row, Col } from 'antd';

import PropTypes from 'prop-types';
import AccountSelect from '../account/AccountSelect';
import CategorySelect from '../category/CategorySelect';

function TransactionDetail(props) {
  const { getFieldDecorator, setFieldsValue, validateFields } = props.form;

  const [savingTransaction, setSavingTransaction] = useState(false);

  useEffect(() => {
    setFieldsValue({
      name: props.transaction.nome,
      value: props.transaction.valor || 0,
      account: props.transaction.conta ? props.transaction.conta.id : null,
      category: props.transaction.categoria
        ? props.transaction.categoria.id
        : null
    });
  }, [setFieldsValue, props.transaction]);

  const onChangeName = event => {
    setFieldsValue({
      name: event.target.value
    });
  };

  const onChangeValue = value => {
    setFieldsValue({
      value: value
    });
  };

  const onChangeAccount = data => {
    setFieldsValue({
      account: data.key
    });
  };

  const onChangeCategory = data => {
    setFieldsValue({
      category: data.key
    });
  };

  const onChangeType = type => {
    setFieldsValue({
      type: type
    });
  };

  const save = async () => {
    setSavingTransaction(true);

    try {
      const fields = await validateFields();

      const payload = {
        id: props.transaction.id,
        nome: fields.name,
        valor: fields.value,
        tipo: fields.type,
        contaId: fields.account,
        categoriaId: fields.category
      };

      return props
        .handleSave(payload)
        .then(() => closeModal())
        .finally(() => setSavingTransaction(false));
    } catch {
      setSavingTransaction(false);
    }
  };

  const closeModal = () => {
    props.handleClose();
  };

  return (
    <Modal
      title={(props.transaction.id ? 'Editar' : 'Cadastrar') + ' transação'}
      visible={props.isVisible}
      okText="Save"
      onOk={save}
      onCancel={closeModal}
      confirmLoading={savingTransaction}
      destroyOnClose
    >
      <Form hideRequiredMark>
        <Form.Item label="Nome">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Informe o nome da transação!' }]
          })(
            <Input
              onChange={onChangeName}
              maxLength={64}
              placeholder="Nome"
              autoComplete="name"
            />
          )}
        </Form.Item>
        <Row gutter={6}>
          <Col span={16}>
            <Form.Item label="Conta">
              {getFieldDecorator('account', {
                rules: [{ required: true, message: 'Informe a conta!' }]
              })(
                <AccountSelect
                  initialValue={
                    props.transaction.conta
                      ? {
                          key: props.transaction.conta.id,
                          label: props.transaction.conta.nome
                        }
                      : undefined
                  }
                  handleChange={onChangeAccount}
                  disabled={!!props.transaction.id}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Valor">
              {getFieldDecorator('value', {
                rules: [
                  { required: true, message: 'Informe o valor da transação!' }
                ]
              })(
                <InputNumber
                  className="w-100"
                  onChange={onChangeValue}
                  min={0}
                  precision={2}
                  formatter={value => `R$ ${value}`}
                  parser={value => value.replace(/R\$\s?|(,*)/g, '')}
                  placeholder="Valor"
                  autoComplete="value"
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={6}>
          <Col span={16}>
            <Form.Item label="Categoria">
              {getFieldDecorator('category', {
                rules: [{ required: true, message: 'Informe a categoria!' }]
              })(
                <CategorySelect
                  initialValue={
                    props.transaction.categoria
                      ? {
                          key: props.transaction.categoria.id,
                          label: props.transaction.categoria.nome
                        }
                      : undefined
                  }
                  handleChange={onChangeCategory}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Tipo">
              {getFieldDecorator('type', {
                initialValue: props.transaction.tipo || TRANSACTION_TYPES.GANHO,
                rules: [
                  { required: true, message: 'Informe o tipo da transação!' }
                ]
              })(
                <Select className="w-100" onChange={onChangeType}>
                  <Select.Option value={TRANSACTION_TYPES.GANHO}>
                    {TRANSACTION_TYPES.GANHO}
                  </Select.Option>
                  <Select.Option value={TRANSACTION_TYPES.DESPESA}>
                    {TRANSACTION_TYPES.DESPESA}
                  </Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

TransactionDetail.propTypes = {
  form: PropTypes.object,
  transaction: PropTypes.object,
  handleSave: PropTypes.func,
  handleClose: PropTypes.func,
  isVisible: PropTypes.bool
};

export default Form.create()(TransactionDetail);
