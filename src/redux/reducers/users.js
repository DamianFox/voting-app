const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  error: false
};

export default (state=initialState, action) => {
  switch (action.type) {
    case 'LOGOUT':
      return initialState;
    case 'LOGIN_ERROR':
      return {
        ...state,
        error: true
      }
    case 'LOGIN_SUCCESS':
      return {
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        error: false
      }
    default:
      return state;
  }
}