import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.tsx';
import './index.css';
import OrchestraLayer from './OrchestraLayer/OrchestraLayer.tsx';
import AppRouterLayer from './RouterLayer/AppRouterLayer.tsx';
import LocalDataLayer from './DataLayer/LocalDataLayer/LocalDataLayer.tsx';
import SecurityLayer from './SecurityLayer/SecurityLayer.tsx';

createRoot(document.getElementById('root')!).render(  
  <StrictMode>
    <App/>
  </StrictMode>,
)