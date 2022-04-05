import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  build: {
    sourcemap: true,
  },
  plugins: [vanillaExtractPlugin(), react()],
});
