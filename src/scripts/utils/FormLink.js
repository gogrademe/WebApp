// From Stampsy
var _ = require('lodash');

function FormLink(options) {
  this.value = options.value;
  this.fieldMessage = options.fieldMessage;
  this.isFirstError = options.isFirstError;
  this.hasFormError = options.hasFormError;

  this._requestChange = options.requestChange;
  this._validateField = options.validateField;
}

_.extend(FormLink.prototype, {
  requestInit: function () {
    this._validateField({
      event: 'init'
    });
  },

  requestFocus: function (options) {
    this._validateField({
      showHelp: true,
      showError: options.hasEdited,
      event: 'focus'
    });
  },

  requestBlur: function (options) {
    this._validateField({
      showHelp: false,
      showError: options.hasEdited,
      event: 'blur'
    });
  },

  requestChange: function (value) {
    var callback = this._validateField.bind(this, {
      showHelp: true,
      showError: false,
      event: 'change'
    });

    this._requestChange(value, callback);
  }
});

module.exports = FormLink;
