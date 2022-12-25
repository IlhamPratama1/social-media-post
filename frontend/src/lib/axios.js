import axios from 'axios';

const baseURL = 'http://localhost:4000/';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 100000,
  headers: {
    Authorization: localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : null,
  },
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
