
"use strict";
var React = require('react');

var {div, i, label, input, p} = React.DOM;

var FormMessages = React.createClass({
  propTypes: {
    messages: React.PropTypes.array
  },
  render: function(){
    console.warn('WARN: FormMessages has been deprecated.');
    if (this.props.messages !== null) {
      return div({
        className: "ui visible error message"
      }, div({
        className: "header"
      }, "Error: ", this.props.messages.error[0].code), p(null, this.props.messages.error[0].message), p(null, this.props.messages.error[0].fields));
    } else {
      return null;
    }
  }
});

module.exports = FormMessages;
