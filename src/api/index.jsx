import axios from "axios";

export const BASE_URL = "https://gym5api-production.up.railway.app";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const admin = localStorage.getItem('admin');

    // Add auth token if available
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add admin flag if admin is logged in
    if (admin) {
      config.headers['X-Admin'] = 'true';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear stored credentials
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      
      // Redirect to appropriate login page
      const isAdminPath = window.location.pathname.startsWith('/admin');
      window.location.href = isAdminPath ? '/admin/login' : '/login';
    }
    return Promise.reject(error);
  }
);

// Helper functions for file URLs
export const getStorageUrl = (path) => {
  return path ? `${BASE_URL}/storage/${path}` : null;
};

export default api;