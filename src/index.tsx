import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('El Nexo Digital: Iniciando sistema...');

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('El Nexo Digital: App montada.');
  } catch (error) {
    console.error('Error al montar:', error);
    container.innerHTML = `<div style="padding: 20px; color: red;">Error: ${error instanceof Error ? error.message : 'Desconocido'}</div>`;
  }
} else {
  console.error("No se encontró #root");
}