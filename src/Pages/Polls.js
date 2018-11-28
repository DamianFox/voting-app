import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPolls } from '../redux/actions/actions';

import 'bulma/css/bulma.css'
import PollsList from './PollsList';

class Polls extends Component {

  render() {
  	const polls = this.props.polls;
    
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-6 is-offset-3">
              <h3 className="title has-text-grey">Polls</h3>
            </div>
            <PollsList polls={polls} />
          </div>

        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.users.token,
    user: state.users.user,
    isAuthenticated: state.users.isAuthenticated,
    polls: state.polls.polls
  }
};

const mapDispatchToProps = dispatch => {
  return {
      loadPolls: () => dispatch(loadPolls())
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Polls);
