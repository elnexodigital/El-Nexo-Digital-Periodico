import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    define: {
      // Expone las variables de entorno de Vercel al código del cliente.
      // Esto reemplaza `process.env.API_KEY` con el valor real de la clave durante el build.
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
    },
    root: '.',
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: './index.html',
        },
      },
    },
  };
});