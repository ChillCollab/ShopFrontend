import authRequests from '../pages/auth/requests/auth.ts';
import { AxiosError, AxiosResponse } from 'axios';
import { routePaths } from '../config/configRoutes/configRoutes.tsx';
import { storage } from '../storage/storage.ts';

export default function authLayout(axiosFunction: any) {
  return axiosFunction()
    .then((res: AxiosResponse<any>) => {
      if (res.status === 200) {
        return res;
      }
    })
    .catch(async (e: AxiosError<any>) => {
      if (e?.response?.status !== 200) {
        localStorage.removeItem(storage.userData);
        if (e?.response?.status === 401) {
          try {
            const resRefresh = authRequests.refreshToken();
            return resRefresh().then((res) => {
              if (res?.status === 200 && res?.data) {
                if (res?.data) {
                  localStorage.setItem(storage.accessToken, res.data.access_token);
                  localStorage.setItem(storage.refreshToken, res.data.refresh_token);

                  return axiosFunction().then((resRetry: AxiosResponse<any>) => {
                    return resRetry;
                  });
                }
              }
            });
          } catch (refreshError) {
            const refreshErr = refreshError as AxiosError;
            if (refreshErr.response?.status !== 200) {
              localStorage.removeItem(storage.accessToken);
              localStorage.removeItem(storage.refreshToken);
              window.location.href = routePaths.ADMIN_AUTH_LOGIN;
              throw refreshErr;
            }
          }
        } else {
          throw e;
        }
      }
    });
}
