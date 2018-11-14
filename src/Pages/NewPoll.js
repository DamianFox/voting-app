import React, { Component } from 'react';
import 'bulma/css/bulma.css'

class NewPoll extends Component {
	constructor(props) {
    super(props);

    console.log("props", props);
  }

  render() {
    return (
      <div>
        <h1 className="title has-text-centered">New Poll</h1>
      </div>
    );
  }
}

export default NewPoll;
