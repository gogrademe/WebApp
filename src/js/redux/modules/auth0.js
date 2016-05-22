
import merge from 'lodash/merge';

import * as api from '../api'

export const SHOW_LOCK = 'auth/SHOW_LOCK'
export const LOCK_SUCCESS = 'auth/LOCK_SUCCESS'
export const LOCK_ERROR = 'auth/LOCK_ERROR'

const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';

const initialState = {
  token: localStorage.getItem('id_token'),
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
  profile: JSON.parse(localStorage.getItem('profile'))
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return Object.assign({}, state, {
        loading: true
      });
    case LOAD_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        isAuthenticated: true,
        profile: action.result.data
      });
    case LOAD_FAIL:
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        isAuthenticated: false,
        profile: null,
        error: action.error
      });
    case LOCK_SUCCESS:
      return Object.assign({}, state, {
        loggingIn: false,
        isAuthenticated: true,
        token: action.token,
        profile: action.profile
      });
    case LOCK_ERROR:
      return Object.assign({}, state, {
        profile: null,
        isAuthenticated: false,
        loginError: action.error
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        loggingOut: false,
        token: null,
        profile: null,
        isAuthenticated: false
      });
    default:
      return state;
  }
}




function showLock() {
  return {
    type: SHOW_LOCK
  }
}

function lockSuccess(profile, token) {
  return {
    type: LOCK_SUCCESS,
    profile,
    token
  }
}

function lockError(err) {
  return {
    type: LOCK_ERROR,
    err
  }
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  }
}

export function load() {
  const token = localStorage.getItem('id_token');
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: () => api.tokenInfo(token).catch(err => {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      return Promise.reject(err);
    })
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    dispatch(logoutSuccess());
  }
}

export function login() {
  const lock = new Auth0Lock('KKoWyimC679JIx36NlF5mGBkydZquya8', 'gogrademe.auth0.com');
  return dispatch => {
    lock.show((err, profile, id_token) => {
      if(err) {
        dispatch(lockError(err))
        return
      }
      localStorage.setItem('profile', JSON.stringify(profile))
      localStorage.setItem('id_token', id_token)
      dispatch(lockSuccess(profile, id_token))
    })
  }
}
