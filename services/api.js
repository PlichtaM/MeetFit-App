// services/api.js

import axios from 'axios';

// Ustaw bazowy URL API
const API_BASE_URL = 'localhost:7244'; // Zastąp tym twoim lokalnym adresem IP i portem

const api = axios.create({
  baseURL: API_BASE_URL,
  // Możesz dodać inne globalne ustawienia, jak nagłówki
});
// Funkcje dla Category
const getCategory = (id) => api.get(`/api/category/${id}`);
const createCategory = (data) => api.post('/api/category', data);
const updateCategory = (id, data) => api.put(`/api/category/${id}`, data);
const deleteCategory = (id) => api.delete(`/api/category/${id}`);

// Funkcje dla MapPoint
const getMapPoint = (id) => api.get(`/api/mapPoint/${id}`);
const createMapPoint = (data) => api.post('/api/mapPoint', data);
const updateMapPoint = (id, data) => api.put(`/api/mapPoint/${id}`, data);
const deleteMapPoint = (id) => api.delete(`/api/mapPoint/${id}`);

// Funkcje dla User
const registerUser = (data) => api.post('/api/user/register', data);
const loginUser = (data) => api.post('/api/user/login', data);
const forgotPassword = (data) => api.post('/api/user/forgotPassword', data);
const resetPassword = (data) => api.post('/api/user/resetPassword', data);

export {
  api,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getMapPoint,
  createMapPoint,
  updateMapPoint,
  deleteMapPoint,
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword
};

export default api;