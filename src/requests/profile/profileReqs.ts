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
  changeEmailSubmit: (code: number) => {
    return axios
      .post(
        config.HOST + '/user/change/email',
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
};
