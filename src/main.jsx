import React from 'react';
import { createRoot } from 'react-dom/client';
import DeliveryZoneChecker from "./components/DeliveryZoneChecker.jsx";
import Resume from './components/Resume.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Resume />
  </React.StrictMode>
);
