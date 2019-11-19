import api from '../../core/api';

const BASE_PATH = '/contas';

export default {
  findById: id => {
    return api.get(`${BASE_PATH}/${id}`);
  },
  update: (id, payload) => {
    return api.put(`${BASE_PATH}/${id}`, payload);
  },
  save: payload => {
    return api.post(BASE_PATH, payload);
  }
};
