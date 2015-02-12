var React = require('react');

var {div, i, label, input} = React.DOM;


var TextInput = React.createClass({
  displayName: "TextInput",
  propTypes: {
    type: React.PropTypes.string.isRequired
  },
  getDefaultProps: function(){
    return {
      label: "",
      type: "text",
      placeholder: ""
    };
  },
  render: function(){
    var lab = this.props.label;
    var placeholder = this.props.placeholder || lab;
    console.warn('WARN: TextInput has been depreciated.');
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
