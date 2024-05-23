import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = "https://meetfitapp.pl/api";
const api = axios.create({
  baseURL: API_BASE_URL,
});

//token z AsyncStorage
const getToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};

// nagłówek 'Authorization' z tokenem przed wysłaniem żądania
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    //console.log("Token: ", token);  // Linia do debugowania
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
const createEvent = (data) => api.post("/event", data);
const updateEvent = (id, data) => api.put(`/event/${id}`, data);
const deleteEvent = (id) => api.delete(`/event/${id}`);
const getEventsByMapPointId = (id) => api.get(`/event/ByMapPointId/${id}`);
const getEventsByMapPointGoogleId = (id) =>
  api.get(`/event/ByMapPointGoogleId/${id}`);
const getEventsByUserId = (id) => api.get(`/event/ByUserId/${id}`);
const GetCountPeople = (id) => api.get(`/event/GetCountPeople/${id}`);

// Funkcje dla UserEvent
const getUserEvent = () => api.get(`/userEvent`);
const getUserEventById = (id) => api.get(`/userEvent/${id}`);
const createUserEvent = (data) => api.post("/userEvent", data);
const updateUserEvent = (id, data) => api.put(`/userEvent/${id}`, data);
const deleteUserEvent = (userId, eventId) => api.delete(`/userEvent/${userId}/${eventId}`);
const GetUserEventByUserId = (id) => api.get(`/userEvent/GetByUserId/${id}`);

// Funkcje dla MapPoint
const getMapPoint = () => api.get(`/mapPoint`);
const getMapPointId = (id) => api.get(`/mapPoint/${id}`);
const createMapPoint = (data) => api.post("/mapPoint", data);
const updateMapPoint = (id, data) => api.put(`/mapPoint/${id}`, data);
const deleteMapPoint = (id) => api.delete(`/mapPoint/${id}`);

// Funkcje dla User
const user = () => api.get(`/user`);
const registerUser = (data) => api.post("/user/Register", data);
const loginUser = (data) => api.post("/user/Login", data);
const changePassword = (data) => api.post("/user/ChangePassword", data);
const forgotPassword = (data) => api.post("/user/ForgotPassword", data);
const resetPassword = (data) => api.post("/user/resetPassword", data);
const confirmEmail = (id) => api.get(`/user/ConfirmEmail/${id}`);
const getUser = (id) => api.get(`/user/${id}`);
const updateStepsCount = (id, data) => {
  return api.put(`/user/UpdateStepsCount/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const changeStepsGoal = (id, data) => {
  return api.put(`/user/ChangeStepsGoal/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Funkcje dodatkowe dla User
const changeAvatar = (id, data) =>
  api.post(`/user/ChangeAvatar/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "*/*",
    },
  });

const getAllStepsCount = () => api.get("/user/GetAllStepsCount");

// Funkcje dla FunFact
const getFunFacts = () => api.get(`/funFact`);
const createFunFact = (data) => api.post("/funFact", data);
const getFunFactById = (id) => api.get(`/funFact/${id}`);
const deleteFunFact = (id) => api.delete(`/funFact/${id}`);
const updateFunFact = (id, data) => api.put(`/funFact/${id}`, data);


const getChatMessages = async (eventId) => {
  return await api.get(`/chat/${eventId}`);
};
const sendChatMessage = async ({ eventId, message }) => {
  const userId = await AsyncStorage.getItem('userId'); // Pobierz userId z AsyncStorage lub innego źródła
  return await api.post('/chat', { eventId, userId, message });
};
export {
    api,
    getEvent,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventsByMapPointId,
    getEventsByMapPointGoogleId,
    GetUserEventByUserId,
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
    changePassword,
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
    updateFunFact,
    getChatMessages,
    sendChatMessage,
  };

export default api;
