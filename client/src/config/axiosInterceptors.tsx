import axios from "axios";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost", // Change this to your API
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Request Interceptor (Attach Token)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response Interceptor (Handle Errors)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect user
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
