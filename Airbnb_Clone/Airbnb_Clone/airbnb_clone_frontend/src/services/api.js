import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data; // now returns "Verification code sent to email"
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },
  verifyCode: async ({ email, code }) => {
    try {
      const response = await api.post('/auth/verify-code', { email, code });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Verification failed' };
    }
  },
};

// Properties API calls
export const propertiesAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/properties');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch properties' };
    }
  },

  create: async (propertyData) => {
    try {
      const response = await api.post('/properties', propertyData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create property' };
    }
  },
};

// Bookings API calls
export const bookingsAPI = {
  create: async (bookingData) => {
    try {
      const response = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create booking' };
    }
  },
};

export default api;
