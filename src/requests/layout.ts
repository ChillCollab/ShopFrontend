import { AxiosResponse } from 'axios';
import authRequests from '../pages/auth/requests/auth.ts';

type AxiosFunction = () => Promise<AxiosResponse<any>>;

export const authLayout = async (axiosFunction: Promise<AxiosResponse<any>>) => {
  return await axiosFunction()
    .then((res) => {
      if (res.status === 401) {
        authRequests.refreshToken().then((res) => {
          if (res.status === 200) {
            axiosFunction().then((repeatedRes) => {
              return repeatedRes;
            });
          } else {
            return res;
          }
        });
      } else {
        return res;
      }
    })
    .catch((e) => {
      if (e.response.status === 401) {
        authRequests.refreshToken().then((res) => {
          if (res.status === 200) {
            axiosFunction().then((repeatedRes) => {
              return repeatedRes;
            });
          } else {
            return res;
          }
        });
      } else {
        return e;
      }
    });
};
