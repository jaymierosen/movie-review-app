import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';

// Profiles
import CreateProfile from './components/profile_form/CreateProfile';
import EditProfile from './components/profile_form/EditProfile';
import Profile from './components/profile/Profile';
import Profiles from './components/profiles/Profiles';

import AddLatestMovies from './components/profile_form/AddLatestMovies';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';

// utils
import setAuthToken from './utils/setAuthToken';

// Redux - Provider
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {

  // Hook useEffect (like a lifecycle)
  useEffect(() => {
    // dispatch loadUser action (dispatch is a method of the store)
    store.dispatch(loadUser());
  }, []); //empty array to make it run only once
  return(
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path='/' component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              {/* Force user to log in to see dashboard. Redirect to login if the user's not logged in */}
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/create-profile' component={CreateProfile} />
              <PrivateRoute exact path='/edit-profile' component={EditProfile} />
              <PrivateRoute exact path='/latestMoviesSeen' component={AddLatestMovies} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

  export default App;
