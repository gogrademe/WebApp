

var React = require('react');
var cx = require('react/lib/cx');

var Formsy = require('formsy-react');
var Select = require('react-select');

var LabeledField = require('./LabeledField');

var api = require('../api/api');

// var {Autocomplete, Option} = require('../components/autocomplete');

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

var AssignmentType = React.createClass({
  mixins: [Formsy.Mixin],
  getInitialState: function() {
    return {
      types: []
    };
  },
  componentWillMount: function() {
    api.type.find()
      .then((xs)=> {
        var types = xs.map(function(type){
          return {
            value: type.id,
            label: type.name
          };
        });
        this.setState({
          types: types
        });
      });
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
          placeholder="Type"
          value={this.getValue()}
          options={this.state.types}
          onChange={this.changeValue}
      />
    );
  }
});

module.exports = {
  ProfileTypes: ProfileTypes,
  AssignmentType: AssignmentType
};
