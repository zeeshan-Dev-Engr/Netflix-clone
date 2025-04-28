import axios from 'axios';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: 'https://your-backend-url.vercel.app',
  withCredentials: true,
});

export default api; 