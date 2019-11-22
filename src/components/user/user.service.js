import ApiService from '../../core/network/api-service';

export default {
  save: (name, username, senha) => {
    const payload = {
      nome: name,
      username: username,
      senha: senha
    };

    return ApiService.post('usuarios', payload);
  },
  login: (username, senha) => {
    const payload = {
      username: username,
      senha: senha
    };

    return ApiService.post('usuarios/login', payload);
  }
};
