import { notification } from 'antd';

export default {
  success: detail => {
    notification.success({
      message: 'Sucesso',
      description: detail
    });
  },
  error: (title, detail) => {
    notification.error({
      message: title,
      description: detail
    });
  }
};
