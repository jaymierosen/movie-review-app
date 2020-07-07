import React from 'react';

export const Navbar = () => {
  return (
    <nav className="nav px-lg-5">
      <a className="nav-link" href="#"><img src="" alt="logo" /></a>
      <a className="nav-link active" href="#">Reviewers</a>
      <a className="nav-link" href="#">Register</a>
      <a className="nav-link" href="#">Login</a>
  </nav>
  )
}

export default Navbar;