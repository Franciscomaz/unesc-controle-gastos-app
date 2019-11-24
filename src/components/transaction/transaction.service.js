import ApiService from '../../core/network/api-service';

export default {
  findAll: queryParams => {
    return ApiService.get('contas/transacoes', { params: queryParams });
  },
  findAllFromAccount: (accountId, queryParams) => {
    return ApiService.get(`contas/${accountId}/transacoes`, {
      params: queryParams
    });
  },
  findById: (accountId, id) => {
    return ApiService.get(`contas/${accountId}/transacoes/${id}`);
  },
  update: (accountId, id, payload) => {
    return ApiService.put(`contas/${accountId}/transacoes/${id}`, payload);
  },
  save: (accountId, payload) => {
    return ApiService.post(`contas/${accountId}/transacoes`, payload);
  },
  delete: (accountId, id) => {
    return ApiService.delete(`contas/${accountId}/transacoes/${id}`);
  }
};
