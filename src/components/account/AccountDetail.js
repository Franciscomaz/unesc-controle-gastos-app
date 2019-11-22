import React, { useEffect, useState } from 'react';

import { Form, Input, Modal } from 'antd';

import PropTypes from 'prop-types';

function AccountDetail(props) {
  const {
    getFieldDecorator,
    getFieldError,
    getFieldsError,
    setFieldsValue,
    isFieldTouched,
    validateFields
  } = props.form;

  const [savingAccount, setSavingAccount] = useState(false);

  const nameError = isFieldTouched('name') && getFieldError('name');

  useEffect(() => {
    setFieldsValue({
      name: props.account.nome
    });

    validateFields();
  }, [props.account.nome]);

  const onChangeName = event => {
    setFieldsValue({
      name: event.target.value
    });
  };

  const save = async () => {
    setSavingAccount(true);

    try {
      const fields = await validateFields();

      return props
        .handleSave({ id: props.account.id, nome: fields.name })
        .then(() => closeModal())
        .finally(() => setSavingAccount(false));
    } catch {
      setSavingAccount(false);
    }
  };

  function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  const closeModal = () => {
    props.handleClose();
  };

  return (
    <Modal
      title={(props.account.id ? 'Editar' : 'Cadastrar') + ' conta'}
      visible={props.isVisible}
      okText="Save"
      okButtonProps={{ disabled: hasErrors(getFieldsError()) }}
      onOk={save}
      onCancel={closeModal}
      confirmLoading={savingAccount}
      destroyOnClose
    >
      <Form hideRequiredMark>
        <Form.Item
          label="Nome"
          validateStatus={nameError ? 'error' : ''}
          help={nameError || ''}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Informe o nome da conta!' }]
          })(
            <Input
              onChange={onChangeName}
              placeholder="Nome"
              autoComplete="name"
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}

AccountDetail.propTypes = {
  form: PropTypes.object,
  account: PropTypes.object,
  handleSave: PropTypes.func,
  handleClose: PropTypes.func,
  isVisible: PropTypes.bool
};

export default Form.create()(AccountDetail);
