import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TwitterLogin from 'react-twitter-auth';

class Header extends Component {
  constructor() {
      super();

      this.state = { isAuthenticated: false, user: null, token: '' };
  }

  onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        this.setState({isAuthenticated: true, user: user, token: token});
      }
    });
  };

  onFailed = (error) => {
    alert(error);
  };

  logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null})
  };

  render() {
    let content = !!this.state.isAuthenticated ?
      (
        <div>
          <p>Authenticated</p>
          <div>
            {this.state.user.email}
          </div>
          <div>
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
              <Link to="#" className="navbar-item">
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

export default Header;
