import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        // '/api/pg/dbInfo': {
        //   target: 'http://localhost:3000' ,
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, '')
        //   // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});
