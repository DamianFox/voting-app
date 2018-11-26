const initialState = {
  token: null,
  user: null,
  isAuthenticated: false
};

export default (state=initialState, action) => {
  switch (action.type) {
    case 'LOGOUT':
      localStorage.removeItem('user');
      return Object.assign({}, state, {token: null, isAuthenticated: false, user: null});
    case 'LOGIN_ERROR':
      return Object.assign({}, state, {token: null, isAuthenticated: false, user: null});
    case 'LOGIN_SUCCESS':
      console.log('LOGIN_SUCCESS in reducers');
      console.log('Action in LOGIN_SUCCESS', action);
      // localStorage.setItem('user', action.payload.user);
      localStorage.setItem('token', action.payload.token);
      // localStorage.setItem('todos', JSON.stringify(this.state.items));
      return Object.assign({}, state, {token: action.payload.token, isAuthenticated: true, user: action.payload.user });
    default:
      return state;
  }
}