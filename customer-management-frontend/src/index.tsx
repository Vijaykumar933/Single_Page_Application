import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/App.css'; // Import the global CSS file

// Create a root element for React to render into
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element.');
}

// Create the React root
const root = ReactDOM.createRoot(rootElement);

// Render the App component into the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
