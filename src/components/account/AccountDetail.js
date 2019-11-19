import React, { useEffect, useState } from 'react';

import { Form, Input, Modal } from 'antd';

import AccountService from './account.service';

import PropTypes from 'prop-types';

import notificator from '../../core/notificator';

function AccountDetail(props) {
  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;

  const [savingAccount, setSavingAccount] = useState(false);

  useEffect(() => {
    if (!props.account) {
      return;
    }

    setFieldsValue({
      name: props.account.name
    });
  }, []);

  const onChangeName = event => {
    setFieldsValue({
      name: event.target.value
    });
  };

  const save = () => {
    const payload = { nome: getFieldValue('name') };

    setSavingAccount(true);

    return AccountService.save(payload)
      .then(() => {
        notificator.success('Sucesso', 'Conta cadastrada com sucesso');
        setSavingAccount(false);
        closeModal();
      })
      .catch(() => setSavingAccount(false));
  };

  const closeModal = () => {
    setFieldsValue({
      name: ''
    });

    props.handleModalVisibility(false);
  };

  return (
    <Modal
      title={props.account ? 'Editar' : 'Cadastrar' + ' conta'}
      visible={props.isVisible}
      okText="Save"
      onOk={save}
      onCancel={closeModal}
      confirmLoading={savingAccount}
    >
      <Form>
        <Form.Item label="Nome">
          {getFieldDecorator('name')(
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
  handleModalVisibility: PropTypes.func,
  isVisible: PropTypes.bool
};

export default Form.create()(AccountDetail);
