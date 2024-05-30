import axios from 'axios';
import config from '../../config/config.ts';

const adminReqs = {
  getUsers: () => {
    return axios.get(config.HOST + '/admin/users/list', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
  },
};

export default adminReqs;
