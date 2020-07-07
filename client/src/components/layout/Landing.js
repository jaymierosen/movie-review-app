import React from 'react';
import { Link } from 'react-router-dom';

export const Landing = () => {
  return (
    <section className="container-fluid px-lg-5">
      <h1 className="text-center">Movie App</h1>
      <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col">
            <Link className="nav-link" to="/register">
              <button className="btn btn-primary btn-block">Sign Up</button>
            </Link>
          </div>
          <div className="col">
            <Link className="nav-link" to="/login">
              <button className="btn btn-primary btn-block">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing;
