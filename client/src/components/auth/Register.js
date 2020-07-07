import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Login } from './Login';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    password2: ''
  });

  const {name, email, password1, password2} = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
    if(password1 !== password2) {
      console.log('does not match! try again');
    } else {
      const newUser = {
        name,
        email,
        password1
      }
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const body = JSON.stringify(newUser);
        const res = await axios.post('/api/users', body, config);
        console.log(res.data); // token returned
      } catch(err) {
        console.error(err.response.data);
      }
    }
  }

  return (
    <Fragment>
      <form htmlFor="" onSubmit={e => onSubmit(e)}>
        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="inputName">Name</label>
            <input
              required
              type="text" 
              className="form-control"
              id="inputName"
              name="name"
              value={name}
              onChange={e => onChange(e)} />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="inputEmail4">Email</label>
            <input
              required
              type="email"
              className="form-control"
              id="inputEmail4"
              name="email"
              value={email} 
              onChange={e => onChange(e)}
              />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="inputPassword4">Password</label>
            <input
              required
              type="password"
              className="form-control"
              id="inputPassword4"
              name="password1"
              value={password1}
              onChange={e => onChange(e)} />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="inputPassword4Confirm">Confirm Password</label>
            <input
              required
              type="password"
              className="form-control"
              id="inputPassword4Confirm"
              value={password2}
              name="password2"
              onChange={e => onChange(e)} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <p>Already have an account? <Link to="/login" component={Login}>Sign in</Link></p>
      </form>
    </Fragment>
  )
}

export default Register;