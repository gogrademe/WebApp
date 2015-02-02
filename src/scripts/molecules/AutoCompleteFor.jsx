"use strict";

var React = require('react');
var cx = require('react/lib/cx');

var Formsy = require('formsy-react');
var Select = require('react-select');

// var {Autocomplete, Option} = require('../components/autocomplete.ls');

var ProfileTypes = React.createClass({
  mixins: [Formsy.Mixin],
  getInitialState: function() {
    return {
      types: [
        {label: "Student", value:"student"},
        {label: "Teacher", value:"teacher"},
        {label: "Parent", value:"parent"},
        {label: "Other", value:"other"},
        {label: "Admin", value:"admin"}
      ]
    };
  },

  changeValue: function (newVal, options) {
      this.setValue(newVal);
  },
  getVal: function() {
    var val = this.getValue();

    if (val === "")
      return null;
    else
      return val;
  },
  render:function() {
    return (
      <Select
          {...this.props}
          multi={true}
          placeholder="Types"
          value={this.getVal()}
          options={this.state.types}
          onChange={this.changeValue}
      />

    );
  }
});

      // <Autocomplete placeholder="Type" dropdown={true} onChange={this.changeValue} {...this.props}>
      //   {this.state.types.map(function(item,rId) {
      //     return (<Option key={rId} value={item} label={item} />);
      //   })}
      // </Autocomplete>

module.exports = {
  ProfileTypes: ProfileTypes
};
