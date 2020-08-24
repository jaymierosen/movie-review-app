import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLatestMovies } from '../../actions/profile';

const AddLatestMovies = ({ addLatestMovies, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    plot: ''
  });

  const {title, director, plot} = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className="large text-primary">
       Add Latest Movies
      </h1>
      <small>* = required field</small>
      <form className="form" onSubmit={e => {
        e.preventDefault();
        //call the action
        addLatestMovies(formData, history )
      }}>
        <div className="form-group">
          <input type="text" placeholder="* Title" name="title" value={title} onChange={(e) => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Director" name="director" value={director} onChange={(e) => onChange(e)} />
        </div>
        <div className="form-group">
          <textarea type="text" placeholder="Plot" name="plot" value={plot} onChange={(e) => onChange(e)}></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>      
    </Fragment>
  )
}

AddLatestMovies.propTypes = {
  addLatestMovies: PropTypes.func.isRequired
}

export default connect(null, { addLatestMovies })(withRouter(AddLatestMovies))