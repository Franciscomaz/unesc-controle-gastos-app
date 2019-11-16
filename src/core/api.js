import axios from 'axios';
import notificator from './notificator';

const config = {
  baseURL: 'http://localhost:3000/api/v1/'
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
  errors.forEach(error => notificator.error(error.title, error.detail));
}

function handleUnknownError() {
  notificator.error('Erro desconhecido', 'Ocorreu um erro interno');
}

export default instance;
