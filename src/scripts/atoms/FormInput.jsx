"use strict";

var React = require('react');

var FormInputMixin = require('../mixins/FormInputMixin');

var FormInput = React.createClass({
  mixins: [FormInputMixin],
  propTypes: {
    component: React.PropTypes.any,
  },
  getDefaultProps() {
    return {
      component: "input"
    };
  },
  render() {
    var {component: Component, ...props} = this.props;

    var value = props.formLink.value || '';

    // Empty string value prevents browser autofill
    if (props.autofill && value === '') {
      value = undefined;
    }

    return (
      <Component {...props}
        ref='input'
        value={value}
        extraLineCount={0}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
      />
    );
  }
});

module.exports = FormInput;
