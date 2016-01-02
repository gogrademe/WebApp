import jwtDecode from 'jwt-decode';

const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';
const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';

const initialState = {
  loaded: false,
  token: null,
  user: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
     const t = localStorage.getItem('token');
      return {
        ...state,
        loading: false,
        loaded: true,
        token: t,
        user: jwtDecode(t)
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      const {token} = action.result.data;
      localStorage.setItem('token', token);
      return {
        ...state,
        loggingIn: false,
        token: token,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        token: null,
        user: null
      };
    default:
      return state;
  }
}


// Actions
export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/me')
  };
}

export function login(email,password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/session', {
      email: email,
      password: password
    })
  };
}

export function loginSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token: token
    }
  }
}


export function logout() {
  localStorage.removeItem('token');
  return {
    type:[LOGOUT_SUCCESS]
  };
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logout());
        // dispatch(pushState(null, '/login'));
    }
}
