import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './Pages/Homepage'
import Polls from './Pages/Polls'
import SinglePoll from './Pages/SinglePoll'
import NoMatch from './Pages/NoMatch'
import Header from './Header'
import Footer from './Footer'

import './App.css';
import 'bulma/css/bulma.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/polls" component={Polls} />
            <Route exact path="/polls/:id" component={SinglePoll} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;