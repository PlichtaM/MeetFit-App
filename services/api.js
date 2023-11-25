// services/api.js

import axios from 'axios';

// Ustaw bazowy URL API
const API_BASE_URL = 'localhost:7244'; // Zastąp tym twoim lokalnym adresem IP i portem

const api = axios.create({
  baseURL: API_BASE_URL,
  // Możesz dodać inne globalne ustawienia, jak nagłówki
});

export default api;