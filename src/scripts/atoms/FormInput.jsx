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
    }
  },
  render() {
    var {component: Component, ...props} = this.props;
    return (
      <Component {...props} onChange={this.handleChange}/>
    );
  }
});

module.exports = FormInput;
