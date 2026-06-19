// // // // import axios from 'axios'

// // // // const api = axios.create({
// // // //   baseURL: `${import.meta.env.VITE_API_URL}/api`,
// // // //   headers: {
// // // //     'Content-Type': 'application/json',
// // // //   },
// // // // })


// // // // api.interceptors.request.use((config) => {
// // // //   const token = localStorage.getItem('token')
// // // //   if (token) {
// // // //     config.headers.Authorization = `Bearer ${token}`
// // // //   }
// // // //   return config
// // // // })

// // // // api.interceptors.response.use(
// // // //   (response) => response,
// // // //   (error) => {
// // // //     if (error.response?.status === 401) {
// // // //       localStorage.removeItem('token')
// // // //       window.location.href = '/login'
// // // //     }
// // // //     return Promise.reject(error)
// // // //   }
// // // // )

// // // // export default api




// // // import axios from 'axios'

// // // const api = axios.create({
// // //   baseURL: `${import.meta.env.VITE_API_URL}/api`,   // Yeh line important hai
// // //   headers: {
// // //     'Content-Type': 'application/json',
// // //   },
// // // })

// // // api.interceptors.request.use((config) => {
// // //   const token = localStorage.getItem('token')
// // //   if (token) {
// // //     config.headers.Authorization = `Bearer ${token}`
// // //   }
// // //   return config
// // // })

// // // api.interceptors.response.use(
// // //   (response) => response,
// // //   (error) => {
// // //     if (error.response?.status === 401) {
// // //       localStorage.removeItem('token')
// // //       window.location.href = '/login'
// // //     }
// // //     return Promise.reject(error)
// // //   }
// // // )

// // // export default api




// // import axios from 'axios'

// // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173'

// // const api = axios.create({
// //   baseURL: `${API_URL}/api`,
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // })

// // api.interceptors.request.use((config) => {
// //   const token = localStorage.getItem('token')
// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`
// //   }
// //   return config
// // })

// // api.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     if (error.response?.status === 401) {
// //       localStorage.removeItem('token')
// //       window.location.href = '/login'
// //     }
// //     return Promise.reject(error)
// //   }
// // )

// // export default api


// import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;






// api.js
import axios from 'axios';

// Production vs Development को handle करो
const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Fallback for production if env var is not set
  return 'https://mern-linkedin-post-generator-multiagents.onrender.com/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // redirect करो
    }
    return Promise.reject(error);
  }
);

export default api;