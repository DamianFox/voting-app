import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import Header from '../Header'
import Footer from '../Footer'

class Homepage extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container is-fluid">
          <section className="hero is-large is-primary is-bold">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">
                  Welcome to the Voting App
                </h1>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Homepage;
