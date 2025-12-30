import axios from "axios";

const API = axios.create({
  baseURL: "https://bookmyclean.onrender.com", // backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: interceptor
// API.interceptors.response.use(
//   response => response,
//   error => {
//     console.error("API Error:", error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

export default API;
