import path from "path"
import { defineConfig } from 'vite'
import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [ mdx(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/url': 'http://localhost:8080/api/v1',
      '/auth': 'http://localhost:8080/api/v1',
      '/check': 'http://localhost:8080/api/v1',
    }
  }
})
