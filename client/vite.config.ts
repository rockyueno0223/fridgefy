import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tailwindcss from "tailwindcss";
import { defineConfig } from 'vite';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
