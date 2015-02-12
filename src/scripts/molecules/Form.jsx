"use strict";

var React = require('react');
var Formsy = require('formsy-react');


var MyAppForm = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return {
      canSubmit: false
    };
  },
  enableButton: function () {
    this.setState({
      canSubmit: true
    });
  },
  disableButton: function () {
    this.setState({
      canSubmit: false
    });
  },
  render: function () {
    return (
      <Formsy.Form onValid={this.enableButton} onInvalid={this.disableButton}>
        {this.props.children}
        <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
      </Formsy.Form>
    );
  }
});
module.exports = MyAppForm;
