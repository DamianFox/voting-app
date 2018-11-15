import React, { Component } from 'react';
import 'bulma/css/bulma.css'

class NewPoll extends Component {
	constructor(props) {
    super(props);

    this.state = {
  						question: '',
  						items: [],
  						counter: 2
  					};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  handleChange(e) {
    this.setState({question: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  addItem() {
  	let newItem = (<div key={this.state.counter} className="field">
                    <div className="control">
                    	<input className="input" type="text" placeholder="Item" />
                    </div>
                  </div>);
  	this.setState((prevState) => {
  	  return {
  	    items: prevState.items.concat(newItem),
  	    counter: prevState.counter + 1
  	  };
  	});
  }

  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container has-text-centered">
          	<div className="column is-6 is-offset-3">
              <h3 className="title has-text-grey">New poll</h3>
              <div className="box">
                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <div className="control">
                      <input 
                      	value={this.state.question} 
                      	onChange={this.handleChange}
                      	className="input is-large" 
                      	type="text" 
                      	placeholder="Your question" 
                      	autoFocus="" />
                    </div>
                  </div>
                  	<div key={0} className="field">
                  	  <div className="control">
                  	  	<input className="input" type="text" placeholder="Item" />
                  	  </div>
                  	</div>
                  	<div key={1} className="field">
                  	  <div className="control">
                  	  	<input className="input" type="text" placeholder="Item" />
                  	  </div>
                  	</div>
                  	{this.state.items}
                  <div className="field is-grouped is-grouped-right">
                  	<p className="control">
                  	  <input type="submit" className="button is-primary" value="Add Poll"/>
                	  </p>
                	  <p className="control">
                    	<button className="button" onClick={this.addItem}>Add Item</button>
                  	</p>
                	</div>
                </form>
            	</div>
            </div>
          </div>
        </div>
    	</section>
    );
  }
}

export default NewPoll;
