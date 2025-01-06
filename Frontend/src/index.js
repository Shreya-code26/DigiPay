import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import your main App component
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

// Create a root element and render the App component inside it
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    {/* Wrap the entire app in BrowserRouter */}
    <App />
  </BrowserRouter>
);
