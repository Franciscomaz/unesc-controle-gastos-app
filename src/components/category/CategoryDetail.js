import React, { useEffect, useState } from 'react';

import { Form, Input, Modal } from 'antd';

import PropTypes from 'prop-types';

function CategoryDetail(props) {
  const { getFieldDecorator, setFieldsValue, validateFields } = props.form;

  const [savingCategory, setSavingCategory] = useState(false);

  useEffect(() => {
    setFieldsValue({
      name: props.category.nome
    });
  }, [props.category]);

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

  const closeModal = () => {
    props.handleClose();
  };

  return (
    <Modal
      title={(props.category.id ? 'Editar' : 'Cadastrar') + ' categoria'}
      visible={props.isVisible}
      okText="Save"
      onOk={save}
      onCancel={closeModal}
      confirmLoading={savingCategory}
      destroyOnClose
    >
      <Form hideRequiredMark>
        <Form.Item label="Nome">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Informe o nome da categoria!' }]
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

CategoryDetail.propTypes = {
  form: PropTypes.object,
  category: PropTypes.object,
  handleSave: PropTypes.func,
  handleClose: PropTypes.func,
  isVisible: PropTypes.bool
};

export default Form.create()(CategoryDetail);
