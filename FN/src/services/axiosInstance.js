// src/services/axiosInstance.js
import axios from 'axios';

const api = axios.create({
  withCredentials: true, // accessToken 쿠키 포함
});

// 응답 인터셉터 설정 - AccessToken 만료 시 자동으로 재요청
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post('/api/refresh-token');
        return api(originalRequest);
      } catch (err) {
        alert('세션 만료. 다시 로그인하세요.');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
