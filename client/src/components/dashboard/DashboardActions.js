import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">Edit Profile</Link>
      {/* todo: make this link work */}
      <Link to="/profile/:id" className="btn btn-light">View Profile (todo)</Link>
      <Link to="/latestMoviesSeen" className="btn btn-light">Add Movie</Link>
      {/* todo: make this link work */}
      <Link to="/add-show" className="btn btn-light">Add Show (todo)</Link>
    </div>
  )
}

export default DashboardActions;