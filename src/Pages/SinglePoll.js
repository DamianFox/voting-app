import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { getOnePoll, addVote } from '../redux/actions/actions';
import { VictoryPie, VictoryTooltip } from "victory";

import 'bulma/css/bulma.css'

class SinglePoll extends Component {

	titleStyle = {
		paddingTop: '40px',
	  paddingBottom: '60px'
	};

	constructor(props) {
    super(props);
    
    this.state = {
      radio: '',
      notification: ''
    };

    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.hideMessage = this.hideMessage.bind(this);
    this.addVote = this.addVote.bind(this);
  }

	componentDidMount(){
 		const pollId = this.props.match.params.id;
		this.props.getOnePoll(pollId);
	}

	hideMessage() {
    this.setState((prevState) => {
      return {
        notification: ''
      };
    });
  }

	handleRadioChange(event) {
	  this.setState({
	    radio: event.target.value
	  });
	}

	addVote(e) {
		if(this.state.radio !== ''){
			this.props.addVote(this.props.match.params.id, this.state.radio);
		} else {
				e.preventDefault();
	      let message = (<div className="notification is-danger">
	                      <button className="delete" onClick={this.hideMessage}></button>
	                      Select an answer!
	                    </div>);
	      this.setState((prevState) => {
	        return {
	          notification: message
	        };
	      });
	    }
	}

  render() {
  	const { question, answers } = this.props._poll;
  	let newAnswers = [];
  	let noData = true;
  	let chart = '';

  	const renderAnswers = () =>
  		answers.map((ans, index) =>(<p key={shortid.generate()}>
  			<label htmlFor={`label${index}`} className="radio">
			    <input
			      name="group1"
			      type="radio"
			      value={ans._id}
			      id={`label${index}`}
			      checked={this.state.radio === ans._id}
			      onChange={this.handleRadioChange}
			    />{`\t`}
        	{ans.answer}
		    </label>
		  </p>)
		);

  	Object.keys(answers).map((key, index) => {
  		if(parseInt(answers[index].votes) !== 0){
  			noData = false;
  		}
      let item = {
      	x: String(answers[index].answer),
      	y: parseInt(answers[index].votes),
      	label: `${answers[index].answer}: ${answers[index].votes} votes`
      }
      newAnswers.push(item);
      return true;
    });

    if(noData){
    	chart = <h4 className="title is-4">No data yet!</h4>;
    } else {
    	chart = <VictoryPie 
    						labelComponent={<VictoryTooltip/>}
    						padding={70}
    						colorScale="qualitative" 
    						data={newAnswers} />;
    }

    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="column is-8 is-offset-2">
        			<h2 className="title has-text-centered" style={this.titleStyle}>{question}</h2>
        			{this.state.notification}
        			<div className="level">
	        			<div className="level-left" style={{margin: '0 auto'}}>
					        <form 
					        	onSubmit={this.addVote}>
					        	{renderAnswers()}
					        	<br/>
					        	<p className="control">
					        	  <input type="submit" className="button is-primary" value="Vote"/>
					        	</p>
					        </form>
				        </div>
				        <div className="level-right" style={{margin: '0 auto'}}>
				        	{chart}
				        </div>
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
    _poll: state.polls.poll,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getOnePoll: (pollId) => dispatch(getOnePoll(pollId)),
    addVote: (pollId, answerID) => dispatch(addVote(pollId, answerID))
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SinglePoll);

