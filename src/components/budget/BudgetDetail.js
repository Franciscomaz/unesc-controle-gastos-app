import React, { useEffect, useState } from 'react';

import { Form, InputNumber, Modal } from 'antd';

import PropTypes from 'prop-types';
import CategorySelect from '../category/CategorySelect';

function BudgetDetail(props) {
  const { getFieldDecorator, setFieldsValue, validateFields } = props.form;

  const [savingBudget, setSavingBudget] = useState(false);

  useEffect(() => {
    setFieldsValue({
      value: props.budget.valor || 0,
      category: props.budget.categoria ? props.budget.categoria.id : null
    });
  }, [setFieldsValue, props.budget]);

  const onChangeValue = value => {
    setFieldsValue({
      value: value
    });
  };

  const onChangeCategory = data => {
    setFieldsValue({
      category: data.key
    });
  };

  const save = async () => {
    setSavingBudget(true);

    try {
      const fields = await validateFields();

      const payload = {
        id: props.budget.id,
        valor: fields.value,
        categoriaId: fields.category
      };

      return props
        .handleSave(payload)
        .then(() => closeModal())
        .finally(() => setSavingBudget(false));
    } catch {
      setSavingBudget(false);
    }
  };

  const closeModal = () => {
    props.handleClose();
  };

  return (
    <Modal
      title={(props.budget.id ? 'Editar' : 'Cadastrar') + ' orçamento'}
      visible={props.isVisible}
      okText="Save"
      onOk={save}
      onCancel={closeModal}
      confirmLoading={savingBudget}
      destroyOnClose
    >
      <Form hideRequiredMark>
        <Form.Item label="Categoria">
          {getFieldDecorator('category', {
            rules: [{ required: true, message: 'Informe a categoria!' }]
          })(
            <CategorySelect
              initialValue={
                props.budget.categoria
                  ? {
                      key: props.budget.categoria.id,
                      label: props.budget.categoria.nome
                    }
                  : undefined
              }
              handleChange={onChangeCategory}
            />
          )}
        </Form.Item>
        <Form.Item label="Valor">
          {getFieldDecorator('value', {
            rules: [
              { required: true, message: 'Informe o valor do orçãmento!' }
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
      </Form>
    </Modal>
  );
}

BudgetDetail.propTypes = {
  form: PropTypes.object,
  budget: PropTypes.object,
  handleSave: PropTypes.func,
  handleClose: PropTypes.func,
  isVisible: PropTypes.bool
};

export default Form.create()(BudgetDetail);
