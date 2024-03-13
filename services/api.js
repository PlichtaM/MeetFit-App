// services.js

import axios from 'axios';

// Ustaw bazowy URL API
const API_BASE_URL = 'http://130.162.208.87:8094/api'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  // Możesz dodać inne globalne ustawienia, jak nagłówki
});
// Funkcje dla Category
const getCategory = (id) => api.get(`/category/${id}`);
const createCategory = (data) => api.post('/category', data);
const updateCategory = (id, data) => api.put(`/category/${id}`, data);
const deleteCategory = (id) => api.delete(`/category/${id}`);

// Funkcje dla MapPoint
const getMapPoint = () => api.get(`/mapPoint`);
const getMapPointId = (id) => api.get(`/mapPoint/${id}`);
const createMapPoint = (data) => api.post('/mapPoint', data);
const updateMapPoint = (id, data) => api.put(`/mapPoint/${id}`, data);
const deleteMapPoint = (id) => api.delete(`/mapPoint/${id}`);

// Funkcje dla User
const registerUser = (data) => api.post('/user/Register', data);
const loginUser = (data) => api.post('/user/Login', data);
const forgotPassword = (data) => api.post('/user/ForgotPassword', data);
const resetPassword = (data) => api.post('/user/resetPassword', data);


const getFunFacts = () => api.get(`/funFact`);
export {
  api,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getMapPoint,
  getMapPointId,
  createMapPoint,
  updateMapPoint,
  deleteMapPoint,
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getFunFacts
};

export default api;