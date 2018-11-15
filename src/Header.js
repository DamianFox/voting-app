import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import { Link } from 'react-router-dom';
import TwitterLogin from 'react-twitter-auth';

class Header extends Component {
  constructor(props) {
      super(props);

      this.state = { isAuthenticated: false, user: null, token: '' };
  }

  componentDidMount() {
    const cachedUser = localStorage.getItem('user');

    if (cachedUser !== null) {
      this.setState({ 
        user: JSON.parse(cachedUser).user,
        isAuthenticated: JSON.parse(cachedUser).isAuthenticated,
        token: JSON.parse(cachedUser).token
      });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('user', JSON.stringify(this.state));
  }

  onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        this.setState({isAuthenticated: true, user: user, token: token});
        this.props.handlerFromParent(this.state);
      }
    });
  };

  onFailed = (error) => {
    alert(error);
  };

  logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null});
    localStorage.removeItem('user');
    this.props.handlerFromParent(this.state);
  };

  render() {
    let content = !!this.state.isAuthenticated ?
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

export default Header;
