import axios from 'axios';

// Determine the base URL based on the environment
const isDevelopment = import.meta.env.MODE === 'development';
const baseURL = isDevelopment 
  ? '' // Empty string for relative URLs in development
  : 'https://your-actual-backend-url.vercel.app'; // Replace with your actual backend URL

// Create an axios instance with the base URL
const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api; 