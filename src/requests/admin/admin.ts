import { axiosInstance } from '../axiosInstance.ts';

const adminReqs = {
  getUsers: () => {
    return axiosInstance.get('/admin/users/list');
  },
};

export default adminReqs;
