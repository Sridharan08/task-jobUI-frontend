import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://task-jobui-backend-2.onrender.com', 
});
