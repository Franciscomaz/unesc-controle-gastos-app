import Api from '../../core/api';

export default {
  save: (name, username, senha) => {
    const payload = {
      nome: name,
      username: username,
      senha: senha
    };

    return Api.post('usuarios', payload);
  },
  login: (username, senha) => {
    const payload = {
      username: username,
      senha: senha
    };

    return Api.post('usuarios/login', payload);
  }
};
