import axios, { AxiosResponse } from 'axios';
import config from '../../config/config.ts';

export const profileReqs = {
  changeEmail: (email: string) => {
    return axios
      .post(
        config.HOST + '/user/change/email',
        {
          email: email,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        }
      )
      .then((loginResponse: AxiosResponse<any>) => {
        return loginResponse;
      })
      .catch((err) => {
        return err;
      });
  },
  changeNumber: (number: string) => {
    return axios
      .patch(
        config.HOST + '/user/change',
        {
          phone: number,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        }
      )
      .then((loginResponse: AxiosResponse<any>) => {
        return loginResponse;
      });
  },

  changeEmailSubmit: (code: number) => {
    return axios
      .patch(
        config.HOST + '/user/change/email/submit',
        {
          code: code,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        }
      )
      .then((loginResponse: AxiosResponse<any>) => {
        return loginResponse;
      });
  },
  changePassword: (oldPassword: string, newPassword: string) => {
    return axios
      .post(
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
      )
      .then((loginResponse: AxiosResponse<any>) => {
        return loginResponse;
      });
  },
};
