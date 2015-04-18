import React from 'react';

var {div, i, label, input} = React.DOM;


var TextInput = React.createClass({
  propTypes: {
    type: React.PropTypes.string.isRequired
  },
  getDefaultProps(){
    return {
      label: "",
      type: "text",
      placeholder: ""
    };
  },
  render(){
    var lab = this.props.label;
    var placeholder = this.props.placeholder || lab;
    console.warn('WARN: TextInput has been deprecated.');
    return div({
      className: "field"
    }, this.props.label ? label(null, lab) : void 8, this.transferPropsTo(input({
      ref: "input",
      placeholder: placeholder,
      type: this.props.type,
      onChange: this.props.onChange,
      value: this.props.value,
      onBlur: this.props.onBlur
    })));
  }
});


module.exports = TextInput;
