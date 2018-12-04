const initialState = {
  polls: [],
  poll: {},
  error: false
}

export default (state=initialState, action) => {
  switch (action.type) {
    case 'LOAD_POLLS' :
      return {
        ...state,
        polls: action.polls
      }
    case 'VIEW_POLL':
      return {
        ...state,
        poll: action.poll
      }
    case 'ADD_POLL':
      let polls = state.polls;
      polls.push(action.poll);
      return {
        ...state,
        polls: polls,
        error: false
      }
    case 'ADD_POLL_ERROR':
      return {
        ...state,
        error: true
      }
    case 'ADD_VOTE':
      const updateVotesList = state.map((poll, index) => {
        if (index === action.questionId) {
          return {
            ...poll,
            answers: poll.answers.map((ans, index) => {
              if (index === action.answerIndex) {
                return { ...ans, votes: ans.votes + action.votes };
              }
              return ans;
            }),
          };
        }
        return poll;
      });
      return updateVotesList;
    default:
      return state
  }
}