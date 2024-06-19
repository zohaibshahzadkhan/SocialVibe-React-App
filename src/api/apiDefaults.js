import axios from 'axios';

axios.defaults.baseURL = 'https://socialvibe-api-32609e33d535.herokuapp.com';

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('user.access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
