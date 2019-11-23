import React, { useState, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';

import { Form, Input, Icon, Button, Checkbox, Card } from 'antd';
import PropTypes from 'prop-types';

import UserService from './user.service';
import AuthService from '../authentication/auth.service';
import {
  getToken,
  storeToken
} from '../../core/authentication/auth-storage.service';

import notificator from '../../core/feedback/notificator';

const LAST_LOGGED_USER_STORAGE_KEY = 'lastLoggedInUser';

function UserLogin(props) {
  const { setFieldsValue, getFieldDecorator, validateFields } = props.form;

  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setFieldsValue({
      username: localStorage.getItem(LAST_LOGGED_USER_STORAGE_KEY)
    });
  }, []);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    }

    AuthService.authenticate(token).then(response =>
      setRedirectToDashboard(response.data)
    );
  }, []);

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

  const onSubmit = async () => {
    try {
      const fields = await validateFields();

      UserService.login(fields.username, fields.password).then(response => {
        if (fields.rememberLogin) {
          localStorage.setItem(LAST_LOGGED_USER_STORAGE_KEY, fields.username);
        }

        storeToken(response.data.token);

        history.push('/dashboard');

        notificator.success('Login realizado com sucesso');
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (redirectToDashboard) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="display-center">
      <Card className="user-login">
        <Form>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Informe seu usuário!' }]
            })(
              <Input
                onChange={onChangeUsername}
                prefix={<Icon type="user" className="is-light-grey" />}
                autoComplete="username"
                placeholder="Usuário"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Informe sua senha!' }]
            })(
              <Input
                onChange={onChangePassword}
                prefix={<Icon type="lock" className="is-light-grey" />}
                type="password"
                autoComplete="current-password"
                placeholder="Senha"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('rememberLogin', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <Button
              className="w-100"
              type="primary"
              htmlType="submit"
              onClick={onSubmit}
            >
              Sign in
            </Button>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

UserLogin.propTypes = {
  form: PropTypes.object
};

export default Form.create()(UserLogin);
