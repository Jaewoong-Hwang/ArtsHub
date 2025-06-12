import axios from "axios";

const token = localStorage.getItem("accessToken");

const axiosInstance = axios.create({
  baseURL: "http://localhost:8090", // 필요 시 포트 확인
  withCredentials: true, // 쿠키 포함 필수
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default axiosInstance;
