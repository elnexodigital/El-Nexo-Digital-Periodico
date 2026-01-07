
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log('El Nexo Digital: Iniciando sistema de renderizado...');

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('El Nexo Digital: Aplicación montada correctamente.');
  } catch (error) {
    console.error('Error crítico al montar la aplicación:', error);
    container.innerHTML = `
      <div style="padding: 40px; font-family: sans-serif; text-align: center; background: #fdfaf4; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h1 style="color: #dc2626; font-size: 2rem; margin-bottom: 1rem;">Error de Conexión al Nexo</h1>
        <p style="color: #444; max-width: 400px;">No se pudo iniciar la interfaz digital. Esto puede deberse a un error de carga de módulos.</p>
        <pre style="margin-top: 20px; padding: 10px; background: #eee; border-radius: 5px; font-size: 0.8rem; color: #666;">${error instanceof Error ? error.message : 'Error desconocido'}</pre>
        <button onclick="window.location.reload()" style="margin-top: 20px; padding: 12px 24px; background: #292524; color: white; border: none; border-radius: 99px; cursor: pointer; font-weight: bold;">Reintentar carga</button>
      </div>
    `;
  }
} else {
  console.error("Error crítico: No se encontró el contenedor #root.");
}
