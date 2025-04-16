import axios, { AxiosInstance } from "axios";

// API 기본 URL 설정
const API_ENDPOINT_URL =
  process.env.API_ENDPOINT_URL || "http://localhost:8000";

// axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: API_ENDPOINT_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30초 타임아웃 설정
});

export default apiClient;
