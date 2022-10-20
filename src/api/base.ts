import axios from 'axios';
// const baseURL =  import.meta.env.BASE_URL;
import {AxiosRequestConfig} from 'axios'

const instance = axios.create({
    headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
        'Access-Control-Allow-Origin-Type': '*',
      },
    baseURL:'http://192.168.137.1:8080',
    timeout:15000
})
instance.interceptors.request.use((config: AxiosRequestConfig<any>) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers!.jwt = token;
  }
  (error:any) => {
    return Promise.reject(error);
  };
  return config;
});
instance.interceptors.response.use(
  config => {
    if (config.status === 401) {
      return Promise.reject(config);
    }
    return config;
  },
  error => {
    console.log(error);
  }
);
export default instance