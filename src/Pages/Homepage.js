import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Homepage extends Component {
  render() {
    return (
      <div>
        <section className="hero is-medium is-primary is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Welcome to the Voting App
              </h1>
            </div>
          </div>
        </section>
        <div className="container">
        <hr/>
          <div className="columns">
            <div className="column">
              <div className="card large">
                <div className="card-content has-text-centered">
                  <figure>
                    <FontAwesomeIcon 
                      icon="chart-bar" 
                      size="4x"
                    />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="content">
                    <h4 className="subtitle is-4 has-text-centered">
                      <Link to="/polls">View charts</Link>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
