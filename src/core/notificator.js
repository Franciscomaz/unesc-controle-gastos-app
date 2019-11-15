import { notification } from 'antd';

export default {
  success: (title, detail) => {
    notification.success({
      message: title,
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
