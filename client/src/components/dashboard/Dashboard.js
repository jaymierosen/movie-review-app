import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile()
  }, []);
  // if the profile is null and still loading, show spinner
  // else, show x, y, z
  return loading && profile === null ?
  <Spinner /> :
  <Fragment>
    <h1 className="large text-primary">
      Dashboard
    </h1>
    <p>Welcome {user && user.name}!</p>
    {profile !== null ? <Fragment>
      <p>has profile</p>
    </Fragment> : <Fragment>
      <p>has no profile</p>
    </Fragment>}
  </Fragment>
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(
  Dashboard
);