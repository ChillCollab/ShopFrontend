import { axiosInstance } from '../axiosInstance.ts';

const adminReqs = {
  getUsers: () => {
    return axiosInstance.get('/admin/users/list');
  },
  deleteUsers: (id: number[] | never[]) => {
    return axiosInstance.delete(`/admin/users/delete`, { data: { id: id } });
  },
  getCategories: () => {
    return axiosInstance.get('/admin/categories/list');
  },
  deleteCategories: (id: string[] | never[]) => {
    return axiosInstance.delete(`/admin/categories/delete`, { data: { category_id: id } });
  },
  addUser: (name: string, surname: string, login: string, email: string, send_mail: boolean) => {
    return axiosInstance.post('/admin/users/create', {
      name: name,
      surname: surname,
      login: login,
      email: email,
      send_mail: send_mail,
    });
  },
  changeUserData: (
    id: number,
    login: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    role: number,
    active: boolean
  ) => {
    return axiosInstance.post('/admin/users/change', {
      id: id,
      login: login,
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      role: role,
      active: active,
    });
  },
};

export default adminReqs;
