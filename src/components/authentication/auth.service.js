import api from '../../core/api';

export default {
  authenticate: token => {
    return api.post('/authenticate', { token: token });
  }
};
