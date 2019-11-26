import ApiService from '../../core/network/api-service';

const BASE_PATH = '/dashboards';

export default {
  getSummary: () => {
    return ApiService.get(`${BASE_PATH}/sumario`);
  }
};
