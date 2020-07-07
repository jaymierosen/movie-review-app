import React from 'react'

export const Landing = () => {
  return (
    <section className="container-fluid px-lg-5">
      <h1 className="text-center">Movie App</h1>
      <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col">
            <button className="btn btn-primary btn-block">Sign Up</button>
          </div>
          <div className="col">
            <button className="btn btn-primary btn-block">Login</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing;
