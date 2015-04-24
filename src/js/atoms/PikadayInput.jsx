import React from 'react';
import utils from '../utils';
import moment from 'moment';
import Pikaday from 'react-pikaday';


var {div, i, label, input} = React.DOM;

var PikadayInput = React.createClass({
  getDefaultProps() {
    return {
      label: "",
      placeholder: ""
    };
  },
  getInitialState() {
    return {
      value: null
    };
  },
  handleChange(it) {
    this.setState({
      value: it
    });
    return this.props.onChange(this.state.value);
  },
  render() {
    var placeholder = this.props.placeholder || this.props.label;
console.warn('WARN: PikadayInput has been deprecated.');
    return (
      <div className="field">
        <Pikaday
        placeholder={placeholder}
        value={this.state.value}
        onChange={this.handleChange} />
      </div>
    );

  }
});


module.exports = PikadayInput;
