import axios from "axios";

// Replace this with your actual backend Render URL
const BACKEND_URL = "https://clothingstore-w3w0.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:4000/api" : BACKEND_URL,
  withCredentials: true, // send cookies
});

export default axiosInstance;
