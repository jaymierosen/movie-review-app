import React, { Fragment, useState, useEffect } from 'react'; 
import { Link, withRouter } from 'react-router-dom'; //widhRouter helps us with the history method that redirects the user once Created Profile.
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {
    // We use useState hook to set up our state
    // useState always returns an array with two values, so we can destructure it.
    // The first value will be the state (formData)
    // The second value is a function that is going to allow us to update our state (setFormData)
  const [formData, setFormData] = useState({
    favActress: '',
    favActor: '',
    favTvShows: [],
    favMovies: [],
    youtube: ''
  });

  const [displayYoutube, toggleYoutube] = useState(false);

  //useEffect will run getCurrentProfile, fetch the data and send it to the state
  useEffect(() => {
    getCurrentProfile();

    setFormData({
      favActress: loading || !profile.favActress ? '' : profile.favActress,
      favActor: loading || !profile.favActor ? '' : profile.favActor,
      favTvShows: loading || !profile.favTvShows ? '' : profile.favTvShows.join(','),
      favMovies: loading || !profile.favMovies ? '' : profile.favMovies.join(','),
      youtube: loading || !profile.youtube ? '' : profile.youtube
    });
    
  }, [loading, getCurrentProfile]); //the prop we want to depend on its loading. So when it loads, I want the conditional code above to run and fill the state.

  const { favActress, favActor, favTvShows, favMovies, youtube} = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Share your taste!!!
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Favourite Actress" name="favActress" value={favActress} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Favourite Actor" name="favActor" value={favActor} onChange={e => onChange(e)}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Favourite Movies" name="favMovies" value={favMovies} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Favourite TV shows" name="favTvShows" value={favTvShows} onChange={e => onChange(e)}/>
        </div>

        <div className="my-2">
          <button onClick={() => toggleYoutube(!displayYoutube)} type='button' className="btn btn-light">
            YouTube Fan?
          </button>
          <span>Optional</span>
        </div>

        {
          displayYoutube && <Fragment>
          <div className="form-group">
            <input type="text" placeholder="Youtube Channel" name="youtube" value={youtube} onChange={e => onChange(e)}/>
          </div>
          </Fragment>
        }

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));