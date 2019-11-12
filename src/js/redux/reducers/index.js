/* @flow */

import * as ActionTypes from "../modules/error";
import merge from "lodash/merge";

import { combineReducers } from "redux";

import { reducer as formReducer } from "redux-form";

// import auth0 from './../modules/auth0';
import person from "./../modules/person";
import gradebook from "./../modules/gradebook";

// const initialState
// Updates an entity cache in response to any action with response.entities.
function entities(
  state = {
    attempts: {},
    courses: {},
    terms: {},
    people: {},
    users: {},
    repos: {},
    assignments: {},
    groups: {},
    session: {}
  },
  action
) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
}

export default combineReducers({
  person,
  gradebook,
  entities,
  errorMessage,
  form: formReducer
});
