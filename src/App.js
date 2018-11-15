import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Homepage from './Pages/Homepage'
import Polls from './Pages/Polls'
import SinglePoll from './Pages/SinglePoll'
import NewPoll from './Pages/NewPoll'
import NoMatch from './Pages/NoMatch'
import Header from './Header'
import Footer from './Footer'
import { library } from '@fortawesome/fontawesome-svg-core' 
import { faChartBar, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

import './App.css';
import 'bulma/css/bulma.css'

library.add(faChartBar);  
library.add(faExternalLinkAlt);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isAuthenticated: false };

    this.handleData = this.handleData.bind(this);
  }

  handleData(data) {
    this.setState({
      isAuthenticated: data.isAuthenticated
    });
  }

  render() {
    const cachedUser = localStorage.getItem('user');
    var childProps = {}

    if (cachedUser !== null) {
      childProps = {
        isAuthenticated: JSON.parse(cachedUser).isAuthenticated
      };
    } else {
      childProps = {
        isAuthenticated: false
      };
    }

    return (
      <Router component={Homepage} >
        <div>
          <Header handlerFromParent={this.handleData} />
          <Switch>
            <Route user={this.state} exact path="/" component={Homepage} />
            <Route exact path="/polls" component={Polls} />
            <Route exact path="/polls/:id" component={SinglePoll} />
            <ProtectedRoute path="/new-poll" component={NewPoll} props={childProps} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

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



