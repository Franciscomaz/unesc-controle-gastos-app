import React from 'react';
import { Card, Form, Input, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import UserService from './user.service';
import PropTypes from 'prop-types';
import notificator from '../../core/notificator';

function UserRegistration(props) {
  const {
    getFieldDecorator,
    getFieldValue,
    setFieldsValue,
    validateFields
  } = props.form;

  const onChangeName = event => {
    setFieldsValue({
      name: event.target.value
    });
  };

  const onChangeUsername = event => {
    setFieldsValue({
      username: event.target.value
    });
  };

  const onChangePassword = event => {
    setFieldsValue({
      password: event.target.value
    });
  };

  const onChangePasswordConfirmation = event => {
    setFieldsValue({
      passwordConfirmation: event.target.value
    });
  };

  const validatePasswordConfirmation = (rule, value, callback) => {
    if (value === getFieldValue('password')) {
      callback();
    }

    callback('É necessário ser igual a senha informada');
  };

  const onSignIn = async () => {
    try {
      const fields = await validateFields();
      UserService.save(fields.name, fields.username, fields.password).then(
        response => {
          notificator.success('Sucesso', 'Usuário cadastrado com sucesso');
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="display-center">
      <Card style={{ minWidth: '400px', marginTop: '10%' }}>
        <Form hideRequiredMark>
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Informe seu nome' },
                {
                  max: 60,
                  message: 'O nome deve possuir no máximo 60 caracteres'
                }
              ]
            })(
              <Input
                onChange={onChangeName}
                placeholder="Nome"
                prefix={<Icon type="user" className="is-light-grey" />}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Informe seu usuário' },
                {
                  min: 4,
                  message: 'O usuário deve possuir pelo menos 4 caracteres'
                },
                {
                  max: 60,
                  message: 'O usuário deve possuir no máximo 60 caracteres'
                }
              ]
            })(
              <Input
                onChange={onChangeUsername}
                placeholder="Usuário"
                prefix={<Icon type="user" className="is-light-grey" />}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Informe sua senha' },
                {
                  min: 4,
                  message: 'A senha deve possuir pelo menos 4 caracteres'
                },
                {
                  max: 60,
                  message: 'A senha deve possuir no máximo 60 caracteres'
                }
              ]
            })(
              <Input
                onChange={onChangePassword}
                type="password"
                placeholder="Senha"
                prefix={<Icon type="lock" className="is-light-grey" />}
              />
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('passwordConfirmation', {
              rules: [
                { required: true, message: 'Confirme sua senha' },
                { validator: validatePasswordConfirmation }
              ]
            })(
              <Input
                onChange={onChangePasswordConfirmation}
                type="password"
                placeholder="Confirmar"
                prefix={<Icon type="check" className="is-light-grey" />}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              style={{ width: '100%' }}
              type="primary"
              htmlType="submit"
              onClick={onSignIn}
            >
              Sign up
            </Button>
            Or <Link to="/login">log in!</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

UserRegistration.propTypes = {
  form: PropTypes.object
};

export default Form.create()(UserRegistration);
