import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth: { user, isAuthenticated, _id  },
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? <Spinner /> : 
      <Fragment>
        <img src={profile.user.avatar} alt='' className='round-img' />
        <h2>{profile.user.name}</h2>
        <h3>Bio:</h3>
        <p>{profile.bio}</p>
        <h3>Location:</h3>
        <p>{profile.location}</p>
        <h3>Favourite movies:</h3>
        <ul>
        {profile.favMovies.map((movie, i) => {
          return (
            <li key={`${i}`}>{movie}</li>
          )
        })}
        </ul>
        <h3>Favourite TV shows:</h3>
        <ul>
        {profile.favTvShows.map((tvShow, i) => {
          return (
            <li key={`${i}`}>{tvShow}</li>
          )
        })}
        </ul>
        <h3>Latest Movies Seen:</h3>
        <ul>
        {profile.latestMoviesSeen.map((latestMovieSeen, i) => {
          return (
            <Fragment key={`${i}`}>
              <li key={`title-${i}`}><strong>Title:</strong> {latestMovieSeen.title}</li>
              <ul key={`sub-list-${i}`}>
                <li key={`director-${i}`}><strong>Director:</strong> {latestMovieSeen.director}</li>
                <li key={`plot-${i}`}><strong>Plot:</strong> {latestMovieSeen.plot}</li>
              </ul>
            </Fragment>
          )
        })}
        </ul>
        <p>{profile.location}</p>
        <h3>Favourite actor:</h3>
        <p>{profile.favActor}</p>
        <h3>Favourite actress:</h3>
        <p>{profile.favActress}</p>
        <h3>Social:</h3>
        <ul>
          {profile.social.facebook === null ? null : <li><a href={profile.social.facebook}>Facebook</a></li>}
          <li><a href={profile.social.linkedin}>LinkedIn</a></li>
          <li><a href={profile.social.instagram}>Instagram</a></li>
          <li><a href={profile.social.twitter}>Twitter</a></li>
          <li><a href={profile.social.youtube}>YouTube</a></li>
        </ul>
      </Fragment>
      }
      <Link to='/profiles' className='btn btn-light'>
        Back To Profiles
      </Link>
      {isAuthenticated && loading === false && user._id === profile.user._id && (
        <Link to='/edit-profile' className='btn btn-dark'>
          Edit Profile
        </Link>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
