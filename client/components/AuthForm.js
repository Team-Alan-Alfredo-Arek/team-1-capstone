import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { authenticate } from '../store';

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-header text-center">{displayName}</div>
            <div className="card-body">
              <form onSubmit={handleSubmit} name={name}>
                <div className="form-group">
                  <label htmlFor="username">
                    <small>Username</small>
                  </label>
                  <input name="username" type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <small>Password</small>
                  </label>
                  <input name="password" type="password" className="form-control" />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary mr-2">{displayName}</button>
                  {name === 'login' && <Link to="/signup" className="btn btn-secondary">Sign Up</Link>}
                </div>
                {error && error.response && <div className="text-danger mt-3"> {error.response.data} </div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)