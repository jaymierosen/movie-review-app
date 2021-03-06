import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile]);
  // if the profile is null and still loading, show spinner
  // else, show x, y, z
  return loading && profile === null ?
  <Spinner /> :
  <Fragment>
    <h1 className="large text-primary">
      Dashboard
    </h1>
    <p>Welcome {user && user.name}!</p>
    { profile !== null ? <Fragment>
      <p>You have a profile!</p>
      <DashboardActions />
      <div>
        <button className='btn btn-danger' onClick={() => deleteAccount()}>Delete Account</button>
      </div>
    </Fragment> : <Fragment>
      <p>You have not set up a profile yet!</p>
      <Link to='/create-profile' className="btn btn-primary my-1">Create Profile</Link>
    </Fragment> }
  </Fragment>
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);