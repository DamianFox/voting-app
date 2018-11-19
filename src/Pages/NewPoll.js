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

  	this.setField = this.setField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

  }

  setField(e) {
		this.setState({[e.target.name]: e.target.value});
  }

  addItem() {
  	let newItem = (<div key={this.state.counter} className="field">
                    <div className="control">
                    	<input 
                    		className="input" 
                    		name={"item-"+this.state.counter}
                    		onChange={this.setField}
                    		type="text" 
                    		placeholder="Item" />
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
                <form id="newPoll"
                	onSubmit={this.handleSubmit}>
                  <div className="field">
                    <div className="control">
                      <input 
                      	value={this.state.question}
                      	name="question" 
                      	className="input is-large" 
                      	onChange={this.setField}
                      	type="text" 
                      	placeholder="Your question" 
                      	autoFocus="" />
                    </div>
                  </div>
                  	<div key={0} className="field">
                  	  <div className="control">
                  	  	<input 
                  	  		className="input" 
                  	  		type="text" 
                  	  		name="item-0"
                  	  		onChange={this.setField}
                  	  		placeholder="Item" />
                  	  </div>
                  	</div>
                  	<div key={1} className="field">
                  	  <div className="control">
                  	  	<input 
                  	  		className="input" 
                  	  		type="text" 
                  	  		name="item-1"
                  	  		onChange={this.setField}
                  	  		placeholder="Item" />
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
