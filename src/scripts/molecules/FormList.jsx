"use strict";
var React = require('react');

var Formsy = require('formsy-react');

var LabeledField = require('./LabeledField');

var FormList = React.createClass({
    mixins: [Formsy.Mixin],
    getInitialState: function() {
      return {
        value: [{
          startDate: "12/12/2014",
          endDate: "12/12/2014"
        }]
      };
    },
    getDefaultProps: function() {
      return {

      };
    },
    render: function () {
      console.log('failed');
      // this.registerInputs(this.props.children);
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
  });

module.exports = FormList;
