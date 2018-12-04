const initialState = {
  token: null,
  user: null,
  isAuthenticated: false
};

export default (state=initialState, action) => {
  switch (action.type) {
    case 'LOGOUT':
      localStorage.removeItem('user');
      return initialState;
    case 'LOGIN_ERROR':
      return Object.assign({}, state, {token: null, isAuthenticated: false, user: null});
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return Object.assign({}, state, {token: action.payload.token, isAuthenticated: true, user: action.payload.user });
    default:
      return state;
  }
}