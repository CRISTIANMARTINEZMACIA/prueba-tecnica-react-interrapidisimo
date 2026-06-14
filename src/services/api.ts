// src/utils/api.js  
import axios from 'axios';  
  
const api = axios.create({  
  baseURL: 'https://dummyjson.com/', // URL base de tu backend
  headers: {  
    'Content-Type': 'application/json',  
  },  
}); 
  
export default api;  