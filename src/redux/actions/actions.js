import axios from 'axios'

const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/";

export function loadPolls () {
  return (dispatch) => {
    axios.get(`${url}polls`)
    .then((res) => {
        let polls = res.data
        dispatch({type:'LOAD_POLLS', polls})
    }).catch((err) => {
        console.log(err)
    })
  }
}

export function addPoll (newPoll) {
  return (dispatch) => {
    axios.post(`${url}poll/new`, { newPoll })
    .then((res) => {
        let poll = res.data
        dispatch({type:'ADD_POLL', poll})
    }).catch((err) => {
    		let error = err.response.status;
        dispatch({type:'ADD_POLL_ERROR', error});
    })
  }
}

export function getOnePoll (pollID) {
  return (dispatch) => {
    axios.get(`${url}polls/${pollID}`)
    .then((res) => {
        let poll = res.data
        dispatch({type: 'VIEW_POLL', poll})
    }).catch((err) => console.log(err))
	}
}

export function addVote (pollID, answerID) {
  return (dispatch) => {
    axios.post(`${url}polls/${pollID}/vote/${answerID}`)
    .then((res) => {
        dispatch({type: 'ADD_VOTE', res})
    }).catch((err) => console.log(err))
	}

}

export const loginSuccess = (user, token) => ({
    type: 'LOGIN_SUCCESS',
    payload: {user, token}
})

export function logout () {
  return (dispatch) => {
  	dispatch({type:'LOGOUT'})
  }
}