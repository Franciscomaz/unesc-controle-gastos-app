import Api from '../../core/api';

export default {
  login: (username, senha) => {
    const payload = {
      username: username,
      senha: senha
    };

    return Api.post('usuarios/login', payload);
  }
};
