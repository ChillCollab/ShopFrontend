import axios from 'axios';
import config from '../../../config/config.ts';

export interface User {
  id: number;
  login: string;
  name: string;
  surname: string;
  email: string;
  active: boolean;
  created: string;
  updated: string;
  role: number;
}
export interface LoginResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface SuccessInterface {
  message: string;
  success: boolean;
  code: number;
}

export interface RecoveryCodeCheck {
  id: number;
  name: string;
  surname: string;
  email: string;
}

const authRequests = {
  register: (login: string, name: string, surname: string, email: string) => {
    return () =>
      axios.post(config.HOST + '/auth/register', {
        login: login,
        name: name,
        surname: surname,
        email: email,
      });
  },
  registerCodeCheck: (code: string) => {
    return () =>
      axios.post(config.HOST + '/auth/register/check', {
        code: code,
      });
  },
  registerSubmit: (code: string, password: string) => {
    return () =>
      axios.post(config.HOST + '/auth/activate', {
        code: code,
        password: password,
      });
  },
  recovery: (email: string) => {
    return () =>
      axios.post(config.HOST + '/auth/recovery', {
        email: email,
      });
  },
  login: (email: string, password: string) => {
    return () =>
      axios.post(config.HOST + '/auth/login', {
        login: email,
        password: password,
      });
  },
  logout: () => {
    return () =>
      axios.post(
        config.HOST + '/auth/logout',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        }
      );
  },
  sendMail: (email: string) => {
    return () =>
      axios.post(config.HOST + '/auth/activate/send', {
        email: email,
      });
  },
  userInfo: () => {
    return () =>
      axios.get(config.HOST + '/user/info', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      });
  },
  refreshToken: () => {
    return () =>
      axios.post(
        config.HOST + '/auth/refresh',
        {
          token: localStorage.getItem('refresh_token'),
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        }
      );
  },
  recoveryCheckCode: (code: string) => {
    return () =>
      axios.post(config.HOST + '/auth/recovery/check', {
        code: code,
      });
  },
  recoverySubmit: (code: string, password: string) => {
    return () =>
      axios.post(config.HOST + '/auth/recovery/submit', {
        code: code,
        password: password,
      });
  },
};

export default authRequests;
