

import React from 'react';
import cx from 'react/lib/cx';

import Formsy from 'formsy-react';
import Select from 'react-select';

import LabeledField from './LabeledField';

import api from '../api/api';

// import {Autocomplete, Option} from '../components/autocomplete';

var ProfileTypes = React.createClass({
  mixins: [Formsy.Mixin],
  getInitialState() {
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
  getVal() {
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
  getInitialState() {
    return {
      types: []
    };
  },
  componentWillMount() {
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
  getVal() {
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
