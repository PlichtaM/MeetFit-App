import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'https://meetfitapp.pl/api';
const api = axios.create({
  baseURL: API_BASE_URL,
});

//token z AsyncStorage
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error getting token from AsyncStorage:', error);
    return null;
  }
};
// nagłówek 'Authorization' z tokenem przed wysłaniem żądania
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Funkcje dla Event
const getEvent = () => api.get(`/event`);
const getEventById = (id) => api.get(`/event/${id}`);
const createEvent = (data) => api.post('/event', data);
const updateEvent = (id, data) => api.put(`/event/${id}`, data);
const deleteEvent = (id) => api.delete(`/event/${id}`);
const getEventsByMapPointId = (id) => api.get(`/event/ByMapPointId/${id}`);
const getEventsByUserId = (id) => api.get(`/event/ByUserId/${id}`);
const GetCountPeople = (id) => api.get(`/event/GetCountPeople/${id}`);

// Funkcje dla UserEvent
const getUserEvent = () => api.get(`/userEvent`);
const getUserEventById = (id) => api.get(`/userEvent/${id}`);
const createUserEvent = (data) => api.post('/userEvent', data);
const updateUserEvent = (id, data) => api.put(`/userEvent/${id}`, data);
const deleteUserEvent = (id) => api.delete(`/userEvent/${id}`);
const GetByUserId = (id) => api.delete(`/userEvent/GetByUserId/${id}`);

// Funkcje dla MapPoint
const getMapPoint = () => api.get(`/mapPoint`);
const getMapPointId = (id) => api.get(`/mapPoint/${id}`);
const createMapPoint = (data) => api.post('/mapPoint', data);
const updateMapPoint = (id, data) => api.put(`/mapPoint/${id}`, data);
const deleteMapPoint = (id) => api.delete(`/mapPoint/${id}`);

// Funkcje dla User
const user = () => api.get(`/user`);
const registerUser = (data) => api.post('/user/Register', data);
const loginUser = (data) => api.post('/user/Login', data);
const forgotPassword = (data) => api.post('/user/ForgotPassword', data);
const resetPassword = (data) => api.post('/user/resetPassword', data);
const confirmEmail = (id) => api.get(`/user/ConfirmEmail/${id}`);
const getUser = (id) => api.get(`/user/${id}`);
const updateStepsCount = (id, data) => api.put(`/user/${id}/UpdateStepsCount`, data);
const changeStepsGoal = (id, data) => api.put(`/user/${id}/ChangeStepsGoal`, data);

// Funkcje dodatkowe dla User
const changeAvatar = (id, data) => api.put(`/user/ChangeAvatar/${id}`, data);
const getAllStepsCount = () => api.get('/user/GetAllStepsCount');

// Funkcje dla FunFact
const getFunFacts = () => api.get(`/funFact`);
const createFunFact = (data) => api.post('/funFact', data);
const getFunFactById = (id) => api.get(`/funFact/${id}`);
const deleteFunFact = (id) => api.delete(`/funFact/${id}`);
const updateFunFact = (id, data) => api.put(`/funFact/${id}`, data);

export {
  api,
  getEvent,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByMapPointId,
  getEventsByUserId,
  GetCountPeople,
  getUserEvent,
  getUserEventById,
  createUserEvent,
  updateUserEvent,
  deleteUserEvent,
  getMapPoint,
  getMapPointId,
  createMapPoint,
  updateMapPoint,
  user,
  deleteMapPoint,
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  confirmEmail,
  getUser,
  updateStepsCount,
  changeStepsGoal,
  changeAvatar,
  getAllStepsCount,
  getFunFacts,
  createFunFact,
  getFunFactById,
  deleteFunFact,
  updateFunFact
};

export default api;
