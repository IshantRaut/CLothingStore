import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:4000/api" : "/api", // 👈 fixed
  withCredentials: true, // send cookies
});

export default axiosInstance;
