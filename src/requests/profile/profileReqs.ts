import axios from 'axios';
import config from '../../config/config.ts';

export const profileReqs = {
  changeEmail: (email: string) => {
    return () =>
      axios.post(
        config.HOST + '/user/change/email',
        {
          email: email,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        }
      );
  },
  changeNumber: (number: string) => {
    return () =>
      axios.patch(
        config.HOST + '/user/change',
        {
          phone: number,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        }
      );
  },

  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return () =>
      axios.post(config.HOST + '/user/upload/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      });
  },
  changeEmailSubmit: (code: number) => {
    return () =>
      axios.patch(
        config.HOST + '/user/change/email/submit',
        {
          code: code,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        }
      );
  },
  changePassword: (oldPassword: string, newPassword: string) => {
    return () =>
      axios.post(
        config.HOST + '/user/changepass',
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        }
      );
  },
};
