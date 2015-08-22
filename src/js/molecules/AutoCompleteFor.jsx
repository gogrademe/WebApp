import React, {PropTypes} from 'react';

import Formsy from 'formsy-react';

import {Multiselect} from 'react-widgets';
import {Select} from 'formsy-react-components';

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
    course_id: PropTypes.number.isRequired,
    term_id: PropTypes.number.isRequired
  },
  getInitialState() {
    return {
      types: []
    };
  },
  componentWillMount() {
    api.assignmentGroup
      .find({course_id: this.props.course_id, term_id: this.props.term_id})
      .then(xs => {
        let types = xs.map(function(type){
          return {
            value: type.id,
            label: type.name
          };
        });
        types.unshift({value: '', label: 'Please select…'});
        this.setState({
          types: types
        });
      });
  },
  render() {
    return (
      <Select
          {...this.props}
          placeholder="Group"
          options={this.state.types}
      />
    );
  }
});

module.exports = {
  ProfileTypes: ProfileTypes,
  AssignmentGroup: AssignmentGroup
};
