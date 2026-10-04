
import axios from "axios";

const api = axios.create({
  baseURL: "https://careerconnect-oz5g.onrender.com/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("placement_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

