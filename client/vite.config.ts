import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [viteReact()],
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