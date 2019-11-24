import React, { useEffect, useState } from 'react';

import { Form, Input, Modal } from 'antd';

import PropTypes from 'prop-types';

function CategoryDetail(props) {
  const {
    getFieldDecorator,
    getFieldError,
    getFieldsError,
    setFieldsValue,
    isFieldTouched,
    validateFields
  } = props.form;

  const [savingCategory, setSavingCategory] = useState(false);

  const nameError = isFieldTouched('name') && getFieldError('name');

  useEffect(() => {
    setFieldsValue({
      name: props.category.nome
    });

    validateFields();
  }, [props.category.nome]);

  const onChangeName = event => {
    setFieldsValue({
      name: event.target.value
    });
  };

  const save = async () => {
    setSavingCategory(true);

    try {
      const fields = await validateFields();

      return props
        .handleSave({ id: props.category.id, nome: fields.name })
        .then(() => closeModal())
        .finally(() => setSavingCategory(false));
    } catch {
      setSavingCategory(false);
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
      title={(props.category.id ? 'Editar' : 'Cadastrar') + ' categoria'}
      visible={props.isVisible}
      okText="Save"
      okButtonProps={{ disabled: hasErrors(getFieldsError()) }}
      onOk={save}
      onCancel={closeModal}
      confirmLoading={savingCategory}
      destroyOnClose
    >
      <Form hideRequiredMark>
        <Form.Item
          label="Nome"
          validateStatus={nameError ? 'error' : ''}
          help={nameError || ''}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Informe o nome da categoria!' }]
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

CategoryDetail.propTypes = {
  form: PropTypes.object,
  category: PropTypes.object,
  handleSave: PropTypes.func,
  handleClose: PropTypes.func,
  isVisible: PropTypes.bool
};

export default Form.create()(CategoryDetail);
