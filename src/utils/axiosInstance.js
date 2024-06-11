// src/utils/axiosInstance.js
import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://tiny-crm-backend.onrender.com/api',
  withCredentials: true,
});

// // Add a response interceptor
// axiosInstance.interceptors.response.use(
//   response => {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     return response;
//   },
//   error => {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     const { status } = error.response;
//     if (status === 401 || status === 403) {
//       // Redirect to login or logout user
//       // Assuming you have a function to handle logout
//       logoutUser();
//     }
//     return Promise.reject(error);
//   }
// );

function logoutUser() {

  // Logic to logout user
  // Clear user token from local storage
  localStorage.removeItem('user');
window.location.href = '/';
}
export default axiosInstance;