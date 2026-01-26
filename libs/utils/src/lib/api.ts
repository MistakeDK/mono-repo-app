import axios, { CreateAxiosDefaults } from 'axios';
type IConfigApi = CreateAxiosDefaults;

export const createConfigApi = (config: IConfigApi) => {
  return axios.create({ ...config });
};
