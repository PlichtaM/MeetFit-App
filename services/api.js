// services.js

import axios from 'axios';

// Ustaw bazowy URL API
const API_BASE_URL = 'http://130.162.208.87:8094/api'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  // Możesz dodać inne globalne ustawienia, jak nagłówki
});
// Funkcje dla Event
const getEvent = () => api.get(`/event`);
const getEventById = (id) => api.get(`/event/${id}`);
const createEvent = (data) => api.post('/event', data);
const updateEvent = (id, data) => api.put(`/event/${id}`, data);
const deleteEvent = (id) => api.delete(`/event/${id}`);
const getEventsByMapPointId = (id) => api.get(`/event/ByMapPointId/${id}`);
const getEventsByUserId = (id) => api.get(`/event/ByUserId/${id}`);

// Funkcje dla UserEvent
const getUserEvent = () => api.get(`/userEvent`);
const getUserEventById = (id) => api.get(`/userEvent/${id}`);
const createUserEvent = (data) => api.post('/userEvent', data);
const updateUserEvent = (id, data) => api.put(`/userEvent/${id}`, data);
const deleteUserEvent = (id) => api.delete(`/userEvent/${id}`);

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

//FunFacts
const getFunFacts = () => api.get(`/funFact`);

export {
  api,
  getEvent,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByMapPointId,
  getEventsByUserId,
  getUserEvent,
  getUserEventById,
  createUserEvent,
  updateUserEvent,
  deleteUserEvent,
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