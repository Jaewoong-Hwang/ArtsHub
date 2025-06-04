// src/services/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8090',
  withCredentials: true,
});

// 응답 인터셉터 설정 - AccessToken 만료 시 자동으로 재요청
axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    // accessToken이 만료되어 401 에러가 났을 때
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/api/refresh-token')
    ) {
      originalRequest._retry = true;

      try {
        // refresh-token 요청
        await axiosInstance.get('/api/refresh-token');
        // 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // refresh-token도 실패하면 로그인 페이지 등으로 유도 가능
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
