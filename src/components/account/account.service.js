import ApiService from '../../core/network/api-service';

const BASE_PATH = '/contas';

export default {
  findAll: queryParams => {
    return ApiService.get(`${BASE_PATH}`, { params: queryParams });
  },
  findById: id => {
    return ApiService.get(`${BASE_PATH}/${id}`);
  },
  update: (id, payload) => {
    return ApiService.put(`${BASE_PATH}/${id}`, payload);
  },
  save: payload => {
    return ApiService.post(BASE_PATH, payload);
  },
  delete: id => {
    return ApiService.delete(`${BASE_PATH}/${id}`);
  }
};
