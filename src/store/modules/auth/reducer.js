const inicialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  loading: false,
  error: null,
  isLoggedIn: !!localStorage.getItem('token'),
};

export default function auth(state = inicialState, action) {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "LOGIN_SUCCESS":
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
        error: null,
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "LOGOUT":
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        loading: false,
        error: null,
        isLoggedIn: false,
      };

    default:
      return state;
  }
}
