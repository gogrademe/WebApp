var React = require('react');
var _ = require('lodash');
var FormLink = require('../utils/FormLink');
var SyntheticEvent = require('react/lib/SyntheticEvent');

module.exports = {
  propTypes: {
    formLink: React.PropTypes.instanceOf(FormLink).isRequired,
    valueLink: function (props, propName) {
      if (props[propName]) {
        console.warn('Cannot use valueLink with FormInput. Use formLink instead.');
      }
    },
    placeholder: React.PropTypes.string,
    type: React.PropTypes.string,
    name: React.PropTypes.string,
    autofill: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      type: "text"
    }
  },
  getInitialState: function () {
    return {
      hasEdited: false
    };
  },

  getCSSModifiers: function () {
    var fieldMessage = this.props.formLink.fieldMessage,
        isError = fieldMessage && fieldMessage.isError;

    if (isError) {
      return 'error';
    }
  },

  componentDidUpdate: function () {
    var formLink = this.props.formLink;
    if (formLink.hasFormError && formLink.isFirstError) {
      this.scrollIntoViewIfNeeded();
    }
  },

  componentDidMount: function () {
    this.props.formLink.requestInit();

    if (this.props.autofill) {
      this._syncWithAutofillInterval = window.setInterval(this.syncWithAutofill, 20);
    }
  },

  componentWillUnmount: function () {
    if (this.props.autofill) {
      window.clearInterval(this._syncWithAutofillInterval);
    }
  },

  syncWithAutofill: function () {
    if (!this.isMounted() || !this.props.autofill) {
      return;
    }

    var formLink = this.props.formLink,
        value = this.refs.input.getDOMNode().value;

    if (formLink.value !== value) {
      this.handleChange(value);
      return true;
    }
  },

  handleChange: function (e) {
    console.log('change');
    this.setState({
      hasEdited: true
    });

    var value;
    if (e instanceof SyntheticEvent) {
      value = e.target.value;
    } else {
      value = e;
    }

    this.props.formLink.requestChange(value);
  },

  handleFocus: function (e) {
    this.setState({
      focus: true
    });

    this.props.formLink.requestFocus({
      hasEdited: this.state.hasEdited
    });

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  },

  handleBlur: function (e) {
    if (this.props.autofill) {
      this.syncWithAutofill();
    }

    this.setState({
      focus: false
    });

    this.props.formLink.requestBlur();

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  },

  scrollIntoViewIfNeeded: function () {
    var inputEl = this.refs.input.getDOMNode();

    if (_.isFunction(inputEl.scrollIntoViewIfNeeded)) {
      inputEl.scrollIntoViewIfNeeded();
    }
  },

  focus: function () {
    if (_.isFunction(this.refs.input.focus)) {
      this.refs.input.focus();
    } else {
      this.refs.input.getDOMNode().focus();
    }
  }
};
