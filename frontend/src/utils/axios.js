import axios from 'axios';

const api = axios.create({
  baseURL: 'https://skillwise-edtech-server.onrender.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    console.log('Response received from:', response.config.url);
    return response;
  },
  (error) => {
    console.error('Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    if (error.response?.status === 401 && !error.config.url.includes('/auth/profile')) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
