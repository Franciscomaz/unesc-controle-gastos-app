import { BEARER_TOKEN_STORAGE_KEY } from '../constants/local-storage.constants';

import axios from 'axios';
import { message } from 'antd';

const config = {
  baseURL: 'http://localhost:8080/api/v1/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem(BEARER_TOKEN_STORAGE_KEY)}`
  }
};

const instance = axios.create(config);

instance.interceptors.response.use(
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

export default instance;
