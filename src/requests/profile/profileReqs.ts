import { axiosInstance } from '../axiosInstance.ts';

export const profileReqs = {
  changeEmail: (email: string) => {
    return axiosInstance.post('/user/change/email', {
      email: email,
    });
  },
  changeNumber: (number: string) => {
    return axiosInstance.patch('/user/change', {
      phone: number,
    });
  },

  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return axiosInstance.post('/user/upload/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
  },
  changeEmailSubmit: (code: number) => {
    return axiosInstance.patch('/user/change/email/submit', {
      code: code,
    });
  },
  changePassword: (oldPassword: string, newPassword: string) => {
    return axiosInstance.post('/user/changepass', {
      old_password: oldPassword,
      new_password: newPassword,
    });
  },
  changePersonalData: (name?: string, surname?: string, login?: string) => {
    return axiosInstance.patch('/user/change', {
      name: name,
      surname: surname,
      login: login,
    });
  },
};
