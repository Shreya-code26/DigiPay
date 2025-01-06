import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';  // Import the necessary routing components
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TransferMoney from './components/TransferMoney';
import './App.css';  // Importing CSS

const App = () => {
  return (
    <div className="app-container">
      <header>
        <h1>DigiPay</h1>
      </header>

      {/* Navigation */}
      <nav>
        <ul>
          <li><Link to="/">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/transfer">Transfer Money</Link></li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transfer" element={<TransferMoney />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
