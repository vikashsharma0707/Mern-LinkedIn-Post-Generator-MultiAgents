// // // // // import { defineConfig } from 'vite'
// // // // // import react from '@vitejs/plugin-react'

// // // // // export default defineConfig({
// // // // //   plugins: [react()],
// // // // //   server: {
// // // // //     port: 5173,
// // // // //   },
// // // // // })


// // // // import { defineConfig } from 'vite'
// // // // import react from '@vitejs/plugin-react'

// // // // export default defineConfig({
// // // //   plugins: [react()],
// // // //   server: {
// // // //     proxy: {
// // // //       '/api': {
// // // //         target: 'https://mern-linkedin-post-generator-multiagents.onrender.com',
// // // //         changeOrigin: true,
// // // //       }
// // // //     }
// // // //   }
// // // // })



// // // import { defineConfig } from 'vite'
// // // import react from '@vitejs/plugin-react'

// // // export default defineConfig({
// // //   plugins: [react()],
  
// // //   // Development ke liye proxy (local testing ke liye)
// // //   server: {
// // //     port: 5173,
// // //     proxy: {
// // //       '/api': {
// // //         target: 'https://mern-linkedin-post-generator-multiagents.onrender.com',
// // //         changeOrigin: true,
// // //         secure: true,
// // //       }
// // //     }
// // //   },

// // //   // Production build ke liye (Vercel ke liye important)
// // //   define: {
// // //     'process.env': {}
// // //   }
// // // })



// // import { defineConfig } from 'vite';
// // import react from '@vitejs/plugin-react';

// // export default defineConfig({
// //   plugins: [react()],
// // });


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
  
//   define: {
//     // यह production build time पर काम करेगा
//     'import.meta.env.VITE_API_URL': JSON.stringify(
//       process.env.VITE_API_URL || 'https://mern-linkedin-post-generator-multiagents.onrender.com'
//     )
//   }
// })




import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
});
