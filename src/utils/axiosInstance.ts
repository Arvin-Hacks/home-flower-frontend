import axios from 'axios';
// import 'dotenv/config'

// console.log('process.env.BACKEND_URL',process.env.BACKEND_URL)

const axiosInstance = axios.create({
  // baseURL:/*  process.env.BACKEND_URL ||  */'http://localhost:8080', // Replace with your base URL
  baseURL:"https://backend-nh0hzvl76-flower-backend.vercel.app ",
});

export default axiosInstance;
