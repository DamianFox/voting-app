import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TwitterLogin from 'react-twitter-auth';
import { connect } from 'react-redux';
import { loginSuccess, logout } from './redux/actions/actions';

import 'bulma/css/bulma.css';

class Header extends Component {

  constructor(props) {
    super(props);

    // console.log("Props in Header", this.props);
    
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailed = this.onFailed.bind(this);
  }

  onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      // console.log("user", user);
      if (token) {
        this.props.loginSuccess(user, token);
      }
    });
  };

  onFailed = (error) => {
    alert(error);
  };

  logout = () => {
    this.props.logout();
  };

  render() {
    let content = !!this.props.isAuthenticated ?
      (
        <div>
          <div>
            <Link className="button is-primary" to="/new-poll">New Poll</Link>
            <button onClick={this.logout} className="button" >
              Log out
            </button>
          </div>
        </div>
      ) :
      (
        <TwitterLogin 
          loginUrl="http://localhost:5000/api/auth/twitter"
          onFailure={this.onFailed} onSuccess={this.onSuccess}
          requestTokenUrl="http://localhost:5000/api/auth/twitter/reverse"
          className="button" />
      );


    return (
      <header className="navbar has-shadow is-spaced">
        <div className="container">
          <div className="navbar-brand">
            <h1 className="title is-4">
              <Link to="/" className="navbar-item">
                <strong>Voting App</strong>
              </Link>
            </h1>
          </div>
          <div className="navbar-end">
            <div className="buttons">
              {content}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("state in mapStateToProps", state);
  return {
    token: state.users.token,
    user: state.users.user,
    isAuthenticated: state.users.isAuthenticated
  }
};

const mapDispatchToProps = dispatch => {
  return {
      loginSuccess: (user, token) => dispatch(loginSuccess(user, token)),
      logout: () => dispatch(logout())
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
