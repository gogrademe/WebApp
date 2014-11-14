var mcFly = require('../flux/mcFly');

var ActionTypes = require('../constants/ActionTypes');

var FormActionCreators = mcFly.createActions({
  submitForm() {
    return {
      actionType: ActionTypes.SUBMIT_FORM
    };
  },

  resetForm() {
    return {
      actionType: ActionTypes.RESET_FORM
    };
  },

  showMessages(messages) {
    return {
      actionType: ActionTypes.SHOW_FORM_MESSAGES,
      messages: messages
    };
  },

  valueChanged(key, value) {
    return {
      actionType: ActionTypes.FORM_VALUE_CHANGED,
      key: key,
      value: value
    };
  }
});

module.exports = FormActionCreators;
