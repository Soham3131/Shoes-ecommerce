// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Set a base URL to simplify requests
});

// Request interceptor to add the token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 Unauthorized errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is 401 and not for the refresh endpoint itself
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevents infinite loops

      try {
        // Call the refresh endpoint to get a new access token
        const response = await axios.post('http://localhost:5000/api/auth/refresh', {}, { withCredentials: true });
        const newToken = response.data.token;

        // Store the new token
        localStorage.setItem('token', newToken);

        // Update the header for the original request
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        // Retry the original request with the new token
        return apiClient(originalRequest);
      } catch (refreshError) {
        // If the refresh fails, log the user out
        localStorage.clear();
        window.location.href = '/login'; // Redirect to login page
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;