import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="nav px-lg-5">
      <Link className="nav-link" to="#"><img src="" alt="logo" /></Link>
      <Link className="nav-link active" to="/reviewers">Reviewers</Link>
      <Link className="nav-link" to="/register">Register</Link>
      <Link className="nav-link" to="/login">Login</Link>
  </nav>
  )
}

export default Navbar;