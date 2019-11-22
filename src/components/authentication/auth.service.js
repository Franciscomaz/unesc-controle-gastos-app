import ApiService from '../../core/network/api-service';

export default {
  authenticate: token => {
    return ApiService.post('/authenticate', { token: token });
  }
};
