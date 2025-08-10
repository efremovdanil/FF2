import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './ui/App';
import './styles.css';
import { configureOpenApiAuth } from './lib/api';
import { getFirebaseIdToken, onAuthChange } from './lib/auth';

// Configure OpenAPI auth with Firebase ID token when available
configureOpenApiAuth(getFirebaseIdToken);
onAuthChange(() => configureOpenApiAuth(getFirebaseIdToken));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


