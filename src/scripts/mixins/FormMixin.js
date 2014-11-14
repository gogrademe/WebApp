var _ = require('lodash'),
    FormLink = require('../utils/FormLink'),
    noop = require('../utils/noop'),
    mapValues = require('../utils/mapValues'),
    FormStates = require('../constants/FormStates');

var FormStore = require('../stores/FormStore');
var FormActionCreators = require('../actions/FormActionCreators');

var isRequired = require('../utils/isRequired');

var FormMixin = {
  getInitialState: function () {
    return {
      formMessages: {},
      firstErrorKey: null,
      formState: FormStates.EDITABLE_STATE
    };
  },

  handleFormStoreChanged: function () {
    if (this.isMounted()) {
      this.setState({
        formMessages: FormStore.getActiveMessages(),
        firstErrorKey: FormStore.getFirstErrorKey(),
        formState: FormStore.getFormState()
      });
    }
  },

  componentWillMount: function () {
    this._linkedValidators = {};
    this._pendingMessages = {};

    FormStore.addChangeListener(this.handleFormStoreChanged);
  },

  componentWillUnmount: function () {
    this._linkedValidators = null;
    this._pendingMessages = null;

    FormStore.removeChangeListener(this.handleFormStoreChanged);
  },

  isFormEditable: function () {
    return FormStore.getFormState() === FormStates.EDITABLE_STATE;
  },

  isFormSubmitting: function () {
    return FormStore.getFormState() === FormStates.SUBMITTING_STATE;
  },

  isFormSubmitted: function () {
    return FormStore.getFormState() === FormStates.SUBMITTED_STATE;
  },

  isFormValid: function (options) {
    var allKeys = _.keys(this._linkedValidators);
    this.validateFields(allKeys, options);

    return !FormStore.getFirstErrorKey();
  },

  submitForm: function (sendRequest) {
    if (!this.isFormEditable()) {
      throw new Error('Form can only be submitted when in editable state.');
    }

    var isFormValid = this.isFormValid({
      showError: true,
      event: 'submit'
    });

    if (!isFormValid) {
      console.log('form is invalid');
      return;
    }

   FormActionCreators.submitForm();

    sendRequest();
  },

  linkState: function (key) {
    return this.linkValidatedState(key, noop);
  },

  linkReqState: function(key) {
    return this.linkValidatedState(key, isRequired);
  },

  linkValidatedState: function (key, validator) {
    this._linkedValidators[key] = validator;

    var newState = {},
        requestChange,
        validateField;

    requestChange = function (value, callback) {
      newState[key] = value;
      this.setState(newState, callback);

      FormActionCreators.valueChanged(key, value);
    }.bind(this);

    validateField = function (options) {
      this.validateFields([key], options);
    }.bind(this);

    return new FormLink({
      value: this.state[key],
      fieldMessage: this.state.formMessages[key],
      isFirstError: key === this.state.firstErrorKey,
      hasFormError: !!this.state.formError,
      requestChange: requestChange,
      validateField: validateField
    });
  },

  validateFields: function (keys, options) {
    var newMessages = this._getClientFieldMessages(keys, options);
    FormActionCreators.showMessages(newMessages);
  },

  isEnterKey: function (e) {
    var ENTER_KEY = 13;
    return e.keyCode === ENTER_KEY;
  },

  _getClientFieldMessages: function (keys, options) {
    console.log(keys, options);
    var fieldResults = this._runClientValidators(keys, options);

    return mapValues(fieldResults, function (result) {
      if (!result) {
        return;
      }

      if (options.showError && result.error) {
        return {
          message: result.error,
          isError: true
        };
      }

      if (options.showHelp && result.help) {
        return {
          message: result.help,
          isError: false
        };
      }

      if (result.permanentHelp) {
        return {
          message: result.permanentHelp,
          isError: false
        };
      }
    });
  },

  _runClientValidators: function (keys, options) {
    var validators = this._linkedValidators,
        state = this.state;

    return _.object(keys.map(function (key) {
      var validator = validators[key],
          value = state[key],
          result = validator(value, options);

      return [key, result];
    }));
  }
};

module.exports = FormMixin;
