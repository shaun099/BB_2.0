import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5500", // Change this if the backend runs on a different port
  withCredentials: true, // Enables session-based authentication
});

// Handle authentication redirects
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
