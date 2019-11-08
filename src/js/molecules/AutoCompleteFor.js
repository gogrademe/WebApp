import React, { PropTypes } from "react";
import { Dropdown, Form } from "semantic-ui-react";

import api from "../api/api";

class ProfileTypes extends React.Component {
  state = {
    types: [
      { text: "Student", value: "student" },
      { text: "Teacher", value: "teacher" },
      { text: "Parent", value: "parent" },
      { text: "Other", value: "other" },
      { text: "Admin", value: "admin" }
    ]
  };

  changeValue = (newVal) => {
    this.setValue(newVal.map(v => v.value));
  };

  getVal = () => {
    var val = this.getValue();

    if (val === "") {
      return null;
    } else {
      return val;
    }
  };

  render() {
    return (
      <div className="field">
        <label>Types</label>
        <Dropdown
          {...this.props}
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
}

function thenPromise(promise, callback) {
  if (!promise || typeof promise.then !== "function") return;
  return promise.then(
    data => {
      callback(null, data);
    },
    err => {
      callback(err);
    }
  );
}

class DropdownAsync extends React.Component {
  static propTypes = {
    loadOptions: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func
  };

  state = {
    isLoading: false,
    options: []
  };

  componentDidMount() {
    this.loadOptions("");
  }

  handleResponse = (err, data) => {
    if (err) throw err;
    this.setState({
      isLoading: false,
      options: data || []
    });
  };

  loadOptions = input => {
    this.setState({
      isLoading: true
    });
    const inputPromise = thenPromise(this.props.loadOptions(input, this.handleResponse), this.handleResponse);
    return inputPromise
      ? inputPromise.then(() => {
          return input;
        })
      : input;
  };

  render() {
    const { options, isLoading } = this.state;

    const {
      loadOptions,
      name,
      input, // injected by redux-form
      ...rest
    } = this.props;
    return (
      <Form.Select
        name={name}
        options={options}
        disabled={isLoading}
        loading={isLoading}
        onBlur={(event, data) => input.onBlur && input.onBlur(data.value)}
        onFocus={(event, data) => input.onFocus && input.onFocus(data.value)}
        onChange={(event, data) => input.onChange(data.value)}
        defaultValue={input.value}
        {...rest}
      />
    );
  }
}

const loadGradeLevels = () =>
  api.level.find().then(data => data.map(level => ({ value: level.levelId, text: level.name })));
const loadTerms = () => api.term.find().then(data => data.map(term => ({ value: term.termId, text: term.name })));
const loadStudents = () => api.person.find().then(data => data.map(s => ({ value: s.personId, text: s.displayName })));
const loadAssignmentGroups = (courseId, termId) =>
  api.group.find({ courseId, termId }).then(data => data.map(s => ({ value: s.groupId, text: s.name })));

export const AssignmentGroup = ({ courseId, termId, ...rest }) => (
  <DropdownAsync {...rest} loadOptions={() => loadAssignmentGroups(courseId, termId)} />
);

module.exports = {
  ProfileTypes: ProfileTypes,
  DropdownAsync: DropdownAsync,
  GradeLevel: props => <DropdownAsync {...props} loadOptions={loadGradeLevels} />,
  Term: props => <DropdownAsync {...props} loadOptions={loadTerms} />,
  Students: props => <DropdownAsync {...props} loadOptions={loadStudents} />
};
