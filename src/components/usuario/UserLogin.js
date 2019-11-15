import React, { useEffect } from 'react';
import { Form, Input, Icon, Button, Checkbox, Card } from 'antd';
import PropTypes from 'prop-types';
import LoginService from './user.service';
import notificator from '../../core/notificator';

const LAST_LOGGED_USER_STORAGE_KEY = 'lastLoggedUser';

function Login(props) {
  const { setFieldsValue, getFieldDecorator, validateFields } = props.form;

  useEffect(() => {
    setFieldsValue({
      username: localStorage.getItem(LAST_LOGGED_USER_STORAGE_KEY)
    });
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
      const result = await validateFields();

      LoginService.login(result.username, result.password).then(response => {
        console.log(response);

        if (result.rememberLogin) {
          localStorage.setItem(LAST_LOGGED_USER_STORAGE_KEY, result.username);
        }

        notificator.success('Sucesso', 'Login realizado com sucesso');
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="display-center">
      <Card>
        <Form>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Informe seu usuário!' }]
            })(
              <Input
                onChange={onChangeUsername}
                prefix={<Icon type="user" className="is-light-grey" />}
                placeholder="Username"
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
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item style={{ textAlign: 'left' }}>
            {getFieldDecorator('rememberLogin', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              onClick={onSubmit}
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

Login.propTypes = {
  form: PropTypes.object
};

export default Form.create({ name: 'user_login' })(Login);
