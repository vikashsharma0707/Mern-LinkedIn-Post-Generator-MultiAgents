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

// Function जो सही URL बनाएगा
function getApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_URL;
  
  console.log('Raw VITE_API_URL:', envUrl);
  
  // अगर environment variable है तो /api suffix add करो
  if (envUrl) {
    const url = envUrl.endsWith('/api') 
      ? envUrl 
      : `${envUrl}/api`;
    console.log('Final API Base URL:', url);
    return url;
  }
  
  // Fallback - अगर env variable नहीं है
  return 'https://mern-linkedin-post-generator-multiagents.onrender.com/api';
}

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

console.log('Axios instance baseURL:', api.defaults.baseURL);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Request URL:', config.baseURL + config.url);
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;