import axios from 'axios';
import { message } from 'antd';
import { getToken } from '../authentication/auth-storage.service';

const config = {
  baseURL: process.env.REACT_APP_API_URL
};

const api = axios.create(config);

api.interceptors.request.use(config => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  success => Promise.resolve(success.data),
  error => {
    if (error.response && error.response.data) {
      if (error.response.data.errors) {
        handleMappedErrors(error.response.data.errors);
      } else {
        handleUnknownError();
      }
    }

    return Promise.reject(error);
  }
);

function handleMappedErrors(errors) {
  errors.forEach(error => message.error(error.detail));
}

function handleUnknownError() {
  message.error('Ocorreu um erro interno');
}

export default api;
