import * as ActionTypes from '../modules/error';
import merge from 'lodash/object/merge';

import {
  combineReducers
} from 'redux';

import {
  routeReducer as router
} from 'redux-simple-router'

import auth from './../modules/auth';

// const initialState 
// Updates an entity cache in response to any action with response.entities.
function entities(state = {
  attempts: {},
  users: {},
  repos: {},
  assignments: {},
  groups: {},
  session: {}
}, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const {
    type, error
  } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
}

export default combineReducers({
  router,
  auth,
  entities,
  errorMessage
});
