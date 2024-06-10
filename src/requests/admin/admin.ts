import { axiosInstance } from '../axiosInstance.ts';

const adminReqs = {
  getUsers: () => {
    return axiosInstance.get('/admin/users/list');
  },
  deleteUsers: (id: [number] | never[]) => {
    return axiosInstance.delete(`/admin/users/delete`, { data: { id: id } });
  },
};

export default adminReqs;
