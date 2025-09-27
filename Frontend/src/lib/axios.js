import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:4000/api"
    : "https://clothingstore-w3w0.onrender.com/api",  // backend URL
  withCredentials: true, // send cookies
});

export default axiosInstance;
