"use strict";
var React = require('react');
var cx = require('react/lib/cx');

var Formsy = require('formsy-react');

var LabeledField = require('./LabeledField');

var TermInput = React.createClass({
    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    getDefaultProps: function() {
        return {
          value: {}
        };
    },

    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue: function (event) {
      console.log(event);
      var value = this.getValue();
      value[event.currentTarget.name] = event.currentTarget.value;
      this.setValue(value);
    },
    getVal: function(name) {
      return this.getValue()[name];
    },
    render: function () {
      var error = this.showError() && this.getErrorMessage() !== undefined ? (
        <div className="ui red pointing above label">
          {this.getErrorMessage()}
        </div>
      ) : null;

      return (
        <div className={cx({
          'field': true,
          'required': this.showRequired(),
          'error':  this.showError()
          })}>
          <label>
            {this.props.label}
          </label>
          <div className="two fields">
            <input name="startDate" onChange={this.changeValue} value={this.getVal("startDate")} validations="isDate" placeholder="Start Date" required/>
            <input name="endDate" onChange={this.changeValue} validations="isDate" placeholder="End Date" required/>
            {error}
          </div>
        </div>
      );
    }
  });

module.exports = TermInput;