import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App'; // ✅ Pointing to the correct folder
import './styles/globals.css'; // ✅ Pointing to the correct CSS

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);