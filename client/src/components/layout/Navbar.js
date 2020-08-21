import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';
 
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Profiles</Link>
      </li>

      <li>
        <Link to="/dashboard">
          <span className="hide-sm">
            Dashboard
          </span>
        </Link>
      </li> 
      
      <li>
        <Link onClick={logout} to="/">
          <span className="hide-sm">
          Logout
          </span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li><Link to="/profiles">Profiles</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">Forge Movie Rank</Link>
      </h1>
      {/* If loading is false, and the user is authenticated let's return the proper layout */}
      { !loading && (<Fragment> { isAuthenticated ? authLinks : guestLinks } </Fragment>) }
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);