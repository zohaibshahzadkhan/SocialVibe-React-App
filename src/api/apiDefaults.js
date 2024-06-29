import axios from 'axios';

axios.defaults.baseURL = 'https://socialvibe-api-32609e33d535.herokuapp.com';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('user.access');
  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return config;
});
