import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPoll } from '../redux/actions/actions';
// import {Redirect} from 'react-router-dom';

import 'bulma/css/bulma.css';

class NewPoll extends Component {
	constructor(props) {
    super(props);

    this.state = {
			question: '',
			items: [],
			counter: 2,
      notification: '',
      redirect: false
		};

  	this.setField = this.setField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addItem = this.addItem.bind(this);
    this.hideMessage = this.hideMessage.bind(this);
    this.hasDuplicates = this.hasDuplicates.bind(this);
    this.notificationHandler = this.notificationHandler.bind(this);
  }

  notificationHandler(array){
    if(this.hasDuplicates(array)) {
      let message = (<div className="notification is-danger">
                      <button className="delete" onClick={this.hideMessage}></button>
                      Remove the duplicates!
                    </div>);
      this.setState((prevState) => {
        return {
          notification: message
        };
      });
      return false;
    } else if(array.length < 2) {
        let message = (<div className="notification is-danger">
                        <button className="delete" onClick={this.hideMessage}></button>
                        Insert at least 2 items
                      </div>);
        this.setState((prevState) => {
          return {
            notification: message
          };
        });
        return false;
    }
    return true;
  }

  handleSubmit(e) {
    e.preventDefault();

    if(e.target.question.value || e.target.question.value !== ""){
      const question = e.target.question.value;

      let answers = [];
      const data = this.state;
      Object.keys(data).map((key, index) => {
        if(key.startsWith("item-")){
          answers.push(data[key]);  
        }

        return answers;
      });

      if(this.notificationHandler(answers)){
        let newPoll = {
          question: question,
          answers: answers
        };

        if(this.state.notification !== ''){
          this.hideMessage();  
        }
        
        // Add new Poll
        this.props.addPoll(newPoll);
      }
    } else {
      let message = (<div className="notification is-danger">
                      <button className="delete" onClick={this.hideMessage}></button>
                      The question is empty
                    </div>);
      this.setState((prevState) => {
        return {
          notification: message
        };
      });
    }
  }

  hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
  }

  hideMessage() {
    this.setState((prevState) => {
      return {
        notification: ''
      };
    });
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
              {this.state.notification}
              <div className="box">
                <form onSubmit={this.handleSubmit}>
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

const mapStateToProps = (state) => {
  return {
    token: state.users.token,
    user: state.users.user,
    isAuthenticated: state.users.isAuthenticated,
    error: state.polls.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
      addPoll: (newPoll) => dispatch(addPoll(newPoll))
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewPoll);
