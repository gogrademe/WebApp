/** @jsx React.DOM */
'use strict';

var React = require('react'),
    _ = require('underscore'),
    FormStates = require('../constants/FormStates'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    getServiceName = require('../utils/getServiceName'),
    StoreUtils = require('../utils/StoreUtils'),
    FormMessageTypes = require('../constants/FormMessageTypes'),
    mapValues = require('../utils/mapValues'),
    merge = require('react/lib/merge'),
    createStore = StoreUtils.createStore;

var _activeMessages = {},
    _formState = FormStates.EDITABLE_STATE,
    _defaultValues = {},
    DEFAULT_FIELDS = ['email', 'name', 'password'];

function renderMessage(message) {
  switch (message && message.id) {
  case FormMessageTypes.LOGIN_WRONG_CREDENTIALS:
    return React.DOM.span(null, "Wrong email or password");
  case FormMessageTypes.USER_WRONG_PASSWORD:
    return React.DOM.span(null, "Wrong password");
  case FormMessageTypes.USER_NAME_TOO_SHORT:
    return React.DOM.span(null, "Minimum 2 characters");
  case FormMessageTypes.USER_PASSWORD_TOO_SHORT:
    return React.DOM.span(null, "Minimum 8 characters");
  case FormMessageTypes.USER_INVALID_EMAIL:
    return React.DOM.span(null, "Invalid email");
  case FormMessageTypes.USER_EMAIL_EXISTS:
    return React.DOM.span(null, "This email is already used by another user");
  case FormMessageTypes.LOGIN_USER_NOT_FOUND:
    return React.DOM.span(null, "User with this email is not found");
  case FormMessageTypes.BAD_EMAIL:
    return React.DOM.span(null, "Invalid email");
  case FormMessageTypes.ACCOUNT_IS_USED:
    return React.DOM.span(null, "Sorry, this account is already connected to another user.");
  case FormMessageTypes.NOT_REGISTERED:
    return React.DOM.span(null, "Sorry, this ", getServiceName(message.serviceType), " account is not connected to any Stampsy profile.");
  case FormMessageTypes.HAS_ANOTHER_ACCOUNT:
    return React.DOM.span(null, "Sorry, you have already connected a different ", getServiceName(message.serviceType), " account to this Stampsy profile.");
  }

  return message;
}

var FormStore = createStore({
  get:function(key) {
    return FormStore.getActiveMessages()[key];
  },

  getFormState:function() {
    return _formState;
  },

  getActiveMessages:function() {
    return mapValues(_activeMessages, function(message)  {
      return message && {
        isError: message.isError,
        message: renderMessage(message.message)
      };
    });
  },

  getFirstErrorKey:function() {
    return _.find(_.keys(_activeMessages), function (key) {
      var message = _activeMessages[key];
      return message && message.isError;
    });
  },

  getDefaultValue:function(key) {
    return _defaultValues[key];
  }
});

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
  case ActionTypes.SHOW_MODAL:
  case ActionTypes.SHOW_SIDEBAR:
    _formState = FormStates.EDITABLE_STATE;
    _activeMessages = {};
    _defaultValues = merge(_defaultValues, _.pick(action.modal || {}, DEFAULT_FIELDS));
    FormStore.emitChange();
    break;

  case ActionTypes.FORM_VALUE_CHANGED:
    if (DEFAULT_FIELDS.indexOf(action.key) !== -1) {
      _defaultValues[action.key] = action.value;
      FormStore.emitChange();
    }
    break;

  case ActionTypes.SUBMIT_FORM:
    _formState = FormStates.SUBMITTING_STATE;
    _activeMessages = {};
    FormStore.emitChange();
    break;

  case ActionTypes.LOGIN_WITH_SERVICE_ACCOUNT:
  case ActionTypes.SIGNUP_WITH_SERVICE_ACCOUNT:
    _activeMessages = {};
    FormStore.emitChange();
    break;

  case ActionTypes.SHOW_FORM_MESSAGES:
  case ActionTypes.SUBMIT_FORM_ERROR:
    _formState = FormStates.EDITABLE_STATE;
    _activeMessages = merge(_activeMessages, action.messages);
    FormStore.emitChange();
    break;

  case ActionTypes.HIDE_FORM_MESSAGES:
    _formState = FormStates.EDITABLE_STATE;
    _activeMessages = {};
    FormStore.emitChange();
    break;

  case ActionTypes.SUBMIT_FORM_SUCCESS:
    _formState = FormStates.SUBMITTED_STATE;
    _activeMessages = {};
    FormStore.emitChange();
    break;

  case ActionTypes.RESET_FORM:
    _formState = FormStates.EDITABLE_STATE;
    FormStore.emitChange();
    break;
  }
});

module.exports = FormStore;
