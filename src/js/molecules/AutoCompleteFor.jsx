import React, {PropTypes} from 'react';

import Formsy from 'formsy-react';
import Select from 'react-select';

import {Multiselect} from 'react-widgets';

import api from '../api/api';

var ProfileTypes = React.createClass({
  mixins: [Formsy.Mixin],
  getInitialState() {
    return {
      types: [
        {label: 'Student', value: 'student'},
        {label: 'Teacher', value: 'teacher'},
        {label: 'Parent', value: 'parent'},
        {label: 'Other', value: 'other'},
        {label: 'Admin', value: 'admin'}
      ]
    };
  },
  changeValue(newVal) {
      this.setValue(newVal.map(v => v.value));
  },
  getVal() {
    var val = this.getValue();

    if (val === '') {
      return null;
    } else {
      return val;
    }
  },
  render() {
    return (
        <div className="form-group">
          <label>
            Types
          </label>
          <Multiselect
              {... this.props}
              placeholder="Types"
              value={this.getVal()}
              valueField='value'
              textField='label'
              data={this.state.types}
              onChange={this.changeValue}
          />
        </div>
    );
  }
});

var AssignmentGroup = React.createClass({
  mixins: [Formsy.Mixin],
  propTypes: {
    classId: PropTypes.string.isRequired,
    termId: PropTypes.string.isRequired
  },
  getInitialState() {
    return {
      types: []
    };
  },
  componentWillMount() {
    api.assignmentGroup.find({classId: this.props.classId, termId: this.props.termId})
      .then((xs)=> {
        const types = xs.map(function(type){
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
  changeValue(newVal) {
      this.setValue(newVal);
  },
  getVal() {
    var val = this.getValue();

    if (val === '') {
      return null;
    } else {
      return val;
    }
  },
  render() {
    return (
      <Select
          placeholder="Group"
          value={this.getValue()}
          options={this.state.types}
          onChange={this.changeValue}
      />
    );
  }
});

module.exports = {
  ProfileTypes: ProfileTypes,
  AssignmentGroup: AssignmentGroup
};
