import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? "https://clothingstore-1jmp.onrender.com/api" : "/api", // 👈 fixed
  withCredentials: true, // send cookies
});

export default axiosInstance;
