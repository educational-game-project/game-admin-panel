import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { SidebarProvider } from './context/SidebarContext.tsx';
import { ResponsiveProvider } from './context/ResponsiveContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ResponsiveProvider>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </ResponsiveProvider>
    </BrowserRouter>
  </React.StrictMode>
);
