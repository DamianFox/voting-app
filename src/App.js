import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartBar, faExternalLinkAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import Homepage from './Pages/Homepage';
import Polls from './Pages/Polls';
import SinglePoll from './Pages/SinglePoll';
import NewPoll from './Pages/NewPoll';
import EditPoll from './Pages/EditPoll';
import NoMatch from './Pages/NoMatch';
import Header from './Header';
import Footer from './Footer';

import './App.css';
import 'bulma/css/bulma.css'

library.add(faChartBar);
library.add(faExternalLinkAlt);
library.add(faPen);

class App extends Component {

  render() {

    return (
      <Router component={Homepage} >
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/polls" component={Polls} />
            <Route exact path="/polls/:id" component={SinglePoll} />
            <ProtectedRoute path="/new-poll" component={NewPoll} props={this.props} />
            <ProtectedRoute path="/polls/:id/edit" component={EditPoll} props={this.props} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.users.token,
    user: state.users.user,
    isAuthenticated: state.users.isAuthenticated
  }
};

export default connect(mapStateToProps)(App);

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.props.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }} />
  )} />
);