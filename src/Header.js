import React, { Component } from 'react';
import 'bulma/css/bulma.css'

class Header extends Component {
  render() {
    return (
      <header className="navbar has-shadow is-spaced">
        <div className="container">
          <div className="navbar-brand">
            <h1 className="title is-4">
              <a className="navbar-item" href="#">
                <strong>Voting App</strong>
              </a>
            </h1>
          </div>
          <div className="navbar-end">
            <div className="buttons">
              <a className="button is-primary" href="#">
                <strong>Sign in with Twitter</strong>
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
