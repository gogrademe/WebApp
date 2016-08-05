import React, {PropTypes} from 'react';

import Formsy from 'formsy-react';

import {Multiselect} from 'react-widgets';
import {Select} from 'formsy-react-components';
import { Dropdown } from 'stardust'

import api from '../api/api';

const GradeLevel = () => {

}

var ProfileTypes = React.createClass({
  mixins: [Formsy.Mixin],
  getInitialState() {
    return {
      types: [
        {text: 'Student', value: 'student'},
        {text: 'Teacher', value: 'teacher'},
        {text: 'Parent', value: 'parent'},
        {text: 'Other', value: 'other'},
        {text: 'Admin', value: 'admin'}
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
        <div className="field">
          <label>
            Types
          </label>
          <Dropdown
              {... this.props}
              placeholder="Types"
              value={this.getVal()}
              options={this.state.types}
              onChange={this.changeValue}
              fluid
              selection
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
    api.group
      .find({course_id: this.props.course_id, term_id: this.props.term_id})
      .then(xs => {
        let types = xs.map(function(type){
          return {
            value: type.group_id,
            text: type.name
          };
        });
        types.unshift({value: '', text: 'Please select…'});
        this.setState({
          types: types
        });
      });
  },
  render() {
    return (
      <Dropdown
          {...this.props}
          placeholder="Group"
          options={this.state.types}
          fluid
          selection
      />
    );
  }
});








function thenPromise (promise, callback) {
	if (!promise || typeof promise.then !== 'function') return;
	return promise.then((data) => {
		callback(null, data);
	}, (err) => {
		callback(err);
	});
}


class DropdownAsync extends React.Component {
  static propTypes = {
    loadOptions: React.PropTypes.func.isRequired
  }

  state = {
    isLoading: false,
    options: []
  }

  componentDidMount() {
    this.loadOptions('');
  }

  handleResponse = (err, data) => {
    if (err) throw err;
    this.setState({
			isLoading: false,
			options: data || []
		});
  }

  loadOptions = (input) => {
    this.setState({
      isLoading: true,
    });
    const inputPromise = thenPromise(this.props.loadOptions(input, this.handleResponse), this.handleResponse);
    return inputPromise ? inputPromise.then(() => {
      return input;
    }) : input;
  }

  render() {
    const {options, isLoading} = this.state

    return (
        <Dropdown
          options={options}
          disabled={isLoading}
          loading={isLoading}
          {...this.props}
        />
    )
  }
}


const loadGradeLevels = () => api.level.find().then(data => data.map(level => ({value: level.level_id, text: level.name})));

module.exports = {
  ProfileTypes: ProfileTypes,
  AssignmentGroup: AssignmentGroup,
  DropdownAsync: DropdownAsync,
  GradeLevel: (props) => <DropdownAsync loadOptions={loadGradeLevels} {...props} />
};
