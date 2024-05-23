// type AxiosFunction = () => Promise<AxiosResponse<any>>;

import authRequests from '../pages/auth/requests/auth.ts';
import axios from 'axios';

export const authLayout = (axiosFunction: any) => {
  return axiosFunction
    .then((res: any) => {
      if (res?.response && res?.response?.status === 401) {
        return authRequests
          .refreshToken()
          .then((resRefresh) => {
            if (resRefresh.status === 200) {
              localStorage.setItem('access_token', resRefresh.data.access_token);
              localStorage.setItem('refresh_token', resRefresh.data.refresh_token);

              // Повторяем исходный запрос с обновленными токенами
              return axios(axiosFunction.config)
                .then((resRepeat: any) => {
                  return resRepeat;
                })
                .catch((e: any) => {
                  return Promise.reject(e);
                });
            } else {
              return Promise.reject(resRefresh); // Возвращаем ответ обновления токена, если статус не 200
            }
          })
          .catch((e) => {
            return Promise.reject(e); // Возвращаем ошибку обновления токена
          });
      } else {
        return res; // Возвращаем исходный ответ, если статус не 401
      }
    })
    .catch((error: any) => {
      return Promise.reject(error); // Возвращаем ошибку исходного запроса
    });
};
