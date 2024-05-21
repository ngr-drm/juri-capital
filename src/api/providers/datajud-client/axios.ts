import axios from 'axios';
import vars from '../../../config-env';

export const config = () => {
  return axios.create({
    method: 'post',
    baseURL: vars.DATAJUD_URL,
    headers: { Authorization: vars.DATAJUD_API_KEY, 'Content-Type': 'application/json' },
  });
};
