import axios from 'axios';
// import 'dotenv/config'

// console.log('process.env.BACKEND_URL',process.env.BACKEND_URL)

const axiosInstance = axios.create({
  // baseURL:/*  process.env.BACKEND_URL ||  */'http://localhost:8080', // Replace with your base URL
  baseURL:"https://backend-nh0hzvl76-flower-backend.vercel.app",
});

export default axiosInstance;

// //https://backend-nh0hzvl76-flower-backend.vercel.app%20/api/v1/product/?page=1&limit=20undefined
// https://backend-nh0hzvl76-flower-backend.vercel.app/api/v1/product/