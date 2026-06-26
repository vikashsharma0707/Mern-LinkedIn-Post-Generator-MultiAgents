// // // // // // // import { defineConfig } from 'vite'
// // // // // // // import react from '@vitejs/plugin-react'

// // // // // // // export default defineConfig({
// // // // // // //   plugins: [react()],
// // // // // // //   server: {
// // // // // // //     port: 5173,
// // // // // // //   },
// // // // // // // })


// // // // // // import { defineConfig } from 'vite'
// // // // // // import react from '@vitejs/plugin-react'

// // // // // // export default defineConfig({
// // // // // //   plugins: [react()],
// // // // // //   server: {
// // // // // //     proxy: {
// // // // // //       '/api': {
// // // // // //         target: 'https://mern-linkedin-post-generator-multiagents.onrender.com',
// // // // // //         changeOrigin: true,
// // // // // //       }
// // // // // //     }
// // // // // //   }
// // // // // // })



// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // export default defineConfig({
// //   plugins: [react()],
  
// //   // Development ke liye proxy (local testing ke liye)
// //   server: {
// //     port: 5173,
// //     proxy: {
// //       '/api': {
// //         target: 'https://mern-linkedin-post-generator-multiagents.onrender.com',
// //         changeOrigin: true,
// //         secure: true,
// //       }
// //     }
// //   },

// //   // Production build ke liye (Vercel ke liye important)
// //   define: {
// //     'process.env': {}
// //   }
// // })











// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
  
//   server: {
//     port: 5173,
//     proxy: {
//       '/api': {
//         target: 'https://mern-linkedin-post-generator-multiagents.onrender.com',
//         changeOrigin: true,
//         secure: true,
//       }
//     }
//   }
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://mern-linkedin-post-generator-multiagents-viyi.onrender.com/',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/api') // clean handling
      }
    }
  }
})