import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@api': path.resolve(__dirname, './mock_api'),
      '@utils': path.resolve(__dirname, './mock_utils'),
    },
  },
  server: {
    port: 3000,
    open: true
  }
});
