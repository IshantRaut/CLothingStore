import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:4000/api" 
    : "https://clothingstore-1jmp.onrender.com/api", // point to backend service
  withCredentials: true,
});


export default axiosInstance;
