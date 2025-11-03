import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- BU SATIRI EKLE
import App from './App';
import './index.css'; // Veya diğer stiller

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- BU SARMALAYICI ŞART */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);