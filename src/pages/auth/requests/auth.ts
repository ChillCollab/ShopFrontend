import axios, { AxiosResponse } from 'axios';
import config from '../../../config/config.ts';
import { SendEmailResponse } from '../../../types/Auth.ts';

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
    return axios
      .post(config.HOST + '/auth/register', {
        login: login,
        name: name,
        surname: surname,
        email: email,
      })
      .then((registerResponse) => {
        return registerResponse;
      });
  },
  registerCodeCheck: (code: string) => {
    return axios
      .post(config.HOST + '/auth/register/check', {
        code: code,
      })
      .then((registerCodeCheck: AxiosResponse<User>) => {
        return registerCodeCheck;
      });
  },
  registerSubmit: (code: string, password: string) => {
    return axios
      .post(config.HOST + '/auth/activate', {
        code: code,
        password: password,
      })
      .then((registerSubmitResponse: AxiosResponse<SuccessInterface>) => {
        return registerSubmitResponse;
      });
  },
  recovery: (email: string) => {
    return axios
      .post(config.HOST + '/auth/recovery', {
        email: email,
      })
      .then((loginResponse: AxiosResponse<any>) => {
        return loginResponse;
      });
  },
  login: (email: string, password: string) => {
    return axios
      .post(config.HOST + '/auth/login', {
        login: email,
        password: password,
      })
      .then((loginResponse) => {
        return loginResponse;
      });
  },
  logout: () => {
    return axios
      .post(
        config.HOST + '/auth/logout',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        }
      )
      .then((logoutResponse: AxiosResponse<any>) => {
        return logoutResponse;
      })
      .catch((e) => {
        console.error(e);
        return e;
      });
  },
  sendMail: (email: string) => {
    return axios
      .post(config.HOST + '/auth/activate/send', {
        email: email,
      })
      .then((sendResponse: AxiosResponse<SendEmailResponse>) => {
        return sendResponse;
      });
  },
  userInfo: () => {
    return axios
      .get(config.HOST + '/user/info', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      })
      .then((infoResponse: AxiosResponse<User>) => {
        return infoResponse;
      })
      .catch((e) => {
        return e;
      });
  },
  refreshToken: () => {
    try {
      return axios
        .post(
          config.HOST + '/auth/refresh',
          {
            token: localStorage.getItem('refresh_token'),
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            },
          }
        )
        .then((infoResponse: AxiosResponse<LoginResponse>) => {
          return infoResponse;
        });
    } catch (e) {
      throw new Error(`${e}`);
    }
  },
  recoveryCheckCode: (code: string) => {
    return axios
      .post(config.HOST + '/auth/recovery/check', {
        code: code,
      })
      .then((recoveryCheckCode: AxiosResponse<RecoveryCodeCheck>) => {
        return recoveryCheckCode;
      });
  },
  recoverySubmit: (code: string, password: string) => {
    return axios
      .post(config.HOST + '/auth/recovery/submit', {
        code: code,
        password: password,
      })
      .then((recoverySubmitResponse: AxiosResponse<SuccessInterface>) => {
        return recoverySubmitResponse;
      });
  },
};

export default authRequests;
