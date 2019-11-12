import PropTypes from "prop-types";
import React from "react";
import { Dropdown, Form } from "semantic-ui-react";

import api from "../api/api";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

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

  changeValue = newVal => {
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
    loadOptions: PropTypes.func.isRequired,
    onChange: PropTypes.func
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
  api.group
    .find({ courseId: courseId, termId: termId })
    .then(data => data.map(s => ({ value: s.groupId, text: s.name })));

const ASSIGNMENT_GROUPS = gql`
  query AssignmentGroups($courseId: ID!, $termId: ID!) {
    assignmentGroups(courseId: $courseId, termId: $termId) {
      groupId
      name
    }
  }
`;

// export default function ClassAssignments({ match }) {
//   const { termId, resourceID } = match.params;
// const GqlSelect = () => {
//   return (
//     <Form.Select
//       name={name}
//       options={options}
//       disabled={isLoading}
//       loading={isLoading}
//       onBlur={(event, data) => input.onBlur && input.onBlur(data.value)}
//       onFocus={(event, data) => input.onFocus && input.onFocus(data.value)}
//       onChange={(event, data) => input.onChange(data.value)}
//       defaultValue={input.value}
//       {...rest}
//     />
//   );
// };
// export const AssignmentGroup = ({ courseId, termId, ...rest }) => {
//   console.log(courseId, termId, rest);
//   const {
//     loading,
//     error,
//     data: { assignmentGroups = [] }
//   } = useQuery(ASSIGNMENT_GROUPS, {
//     variables: { courseId, termId }
//   });

//   return <Form.Select {...rest} lazyLoad disabled={loading} loading={loading} options={assignmentGroups} />;
// };

export const AssignmentGroup = ({ courseId, termId, ...rest }) => (
  <DropdownAsync {...rest} loadOptions={() => loadAssignmentGroups(courseId, termId)} />
);
export const GradeLevel = props => <DropdownAsync {...props} loadOptions={loadGradeLevels} />;
export const Term = props => <DropdownAsync {...props} loadOptions={loadTerms} />;
export const Students = props => <DropdownAsync {...props} loadOptions={loadStudents} />;
export { ProfileTypes, DropdownAsync };
