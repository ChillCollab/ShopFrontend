import { axiosInstance } from '../axiosInstance.ts';

export const settingsReqs = {
  getConfig: () => {
    return axiosInstance.get('/admin/settings/config');
  },
  updateSMTP: (host: string, port: string, email: string, password: string) => {
    return axiosInstance.post('/admin/settings/update/smtp', {
      smtp_host: host,
      smtp_port: port,
      smtp_email: email,
      smtp_password: password,
    });
  },
};
