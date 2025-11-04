import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno del directorio raíz
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Expone la variable de entorno API_KEY de Vercel al código del cliente
      // como process.env.API_KEY durante el proceso de construcción.
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    // Mueve los archivos de TypeScript/JavaScript a la carpeta src
    root: '.',
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: './index.html',
        },
      },
    },
    resolve: {
      alias: {
        '~/': `${__dirname}/src/`,
      },
    },
  };
});
