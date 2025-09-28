import axios from "axios";

const resolvedBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? "http://localhost:4000/api"
    : "https://clothingstore-1jmp.onrender.com/api");

const axiosInstance = axios.create({
  baseURL: resolvedBaseUrl,
  withCredentials: true,
});

export default axiosInstance;
