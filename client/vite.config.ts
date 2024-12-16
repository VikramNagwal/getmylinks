import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/d:/ADMIN/Coding/auth-server/client/src',
    },
  },
  server: {
    proxy: {
      "/api": "http:localhost:8080"
    }
  }
});