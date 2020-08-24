import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    favMovies,
    favTvShows
  }
}) => {
  return (
    <Fragment>
      <div className='profile bg-light'>
        <img src={avatar} alt='' className='round-img' />
        <div>
          <h2>{name}</h2>
          {/* *****/ /* todo: causes an error: Uncaught TypeError: Cannot read property 'user' of null *****/ /* */}
          {/* { if you refresh, the error goes away 🤔} */}
          <Link to={`/profile/${_id}`} className='btn btn-primary'>
            View Profile
          </Link>
        </div>
        <h3>Favourite Movies:</h3>
        <ul>
          {favMovies.slice(0, 4).map((movie, index) => (
            <li key={index} className='text-primary'>{movie}</li>
          ))}
        </ul>
        <h3>Favourite TV Shows:</h3>
        <ul>
          {favTvShows.slice(0, 4).map((tvShow, index) => (
            <li key={index} className='text-primary'>{tvShow}</li>
          ))}
        </ul>
      </div>
      <hr />
    </Fragment>
    
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;