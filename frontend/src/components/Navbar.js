import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Digital Wallet</Link>
        <div>
          <Link className="btn btn-primary me-2" to="/login">Login</Link>
          <Link className="btn btn-secondary" to="/register">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
