import React, { useEffect, useState } from 'react';

import { Form, Input, Modal } from 'antd';

import PropTypes from 'prop-types';

function AccountDetail(props) {
  const { getFieldDecorator, setFieldsValue, validateFields } = props.form;

  const [savingAccount, setSavingAccount] = useState(false);

  useEffect(() => {
    setFieldsValue({
      name: props.account.nome
    });
  }, [props.account]);

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

  const closeModal = () => {
    props.handleClose();
  };

  return (
    <Modal
      title={(props.account.id ? 'Editar' : 'Cadastrar') + ' conta'}
      visible={props.isVisible}
      okText="Save"
      onOk={save}
      onCancel={closeModal}
      confirmLoading={savingAccount}
      destroyOnClose
    >
      <Form hideRequiredMark>
        <Form.Item label="Nome">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Informe o nome da conta!' }]
          })(
            <Input
              onChange={onChangeName}
              maxLength={64}
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
