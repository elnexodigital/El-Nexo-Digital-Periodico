import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        // FIX: __dirname is not available in an ES module context.
        // Using import.meta.url is the modern and correct way to get the current file's directory.
        '~': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src'),
      },
    },
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
