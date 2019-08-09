import React from 'react';
// import shortid from 'shortid';
import { Link } from 'react-router-dom';

const PollsList = (props) => {
  const pollComp = props.polls.polls.map((poll, index) =>
        (<div className="card" key={poll._id}>
          <div className="card-content">
            <h4 className="title is-4"><Link to={`/polls/${poll._id}`}>{poll.question}</Link></h4>
          </div>
        </div>));

  return (
    <div>
      {pollComp}
    </div>
  );
};

export default PollsList;