import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PlanetsProvider } from './contexts/PlanetsContext';
import './index.css';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>,
  );
