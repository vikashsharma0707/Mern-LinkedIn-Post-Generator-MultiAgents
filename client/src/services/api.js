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






import axios from 'axios';

// Debug log करो - production में क्या value आ रही है
console.log('API URL:', import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 
           'https://mern-linkedin-post-generator-multiagents.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  console.log('Request to:', config.baseURL + config.url); // Debug
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;