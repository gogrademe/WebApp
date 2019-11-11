import PropTypes from "prop-types";
import React from "react";
import { Grid } from "../../components/NewTable";

import { Students } from "../../molecules/AutoCompleteFor";
import { Segment } from "semantic-ui-react";

import api from "../../api/api";

class StudentActions extends React.Component {
  unEnroll = e => {
    e.preventDefault();
    api.enrollment.del(this.props.row.enrollmentId);
  };

  render() {
    return (
      <button className="btn btn-danger" onClick={this.unEnroll}>
        Un-Enroll
      </button>
    );
  }
}

const cols = [
  {
    key: "person.firstName",
    display: "First Name"
  },
  {
    key: "person.middleName",
    display: "Middle Name"
  },
  {
    key: "person.lastName",
    display: "Last Name"
  },
  {
    key: "person.gradeLevel",
    display: "Grade Level"
  },
  {
    display: "Actions",
    renderer: StudentActions,
    linkTo: "class",
    tdClassName: "text-right col-md-2"
  }
];

class CourseStudents extends React.Component {
  static propTypes = {
    courseId: PropTypes.string,
    termId: PropTypes.string
  };

  state = {
    students: [],
    people: [],
    selected: {}
  };

  getEnrollments = () => {
    const { termId, resourceID } = this.props.match.params;
    api.enrollment
      .find({
        courseId: resourceID,
        termId: termId
      })
      .then(xs => this.setState({ students: xs }));
  };

  UNSAFE_componentWillMount() {
    api.enrollment.events.addListener("change", this.getEnrollments);
    this.getEnrollments();

    api.person.find().then(xs => this.setState({ people: xs }));
  }

  componentWillUnmount() {
    return api.enrollment.events.removeListener("change", this.getEnrollments);
  }

  enrollStudent = () => {
    const { termId, resourceID } = this.props.match.params;
    api.enrollment.create({
      personId: Number(this.state.selected),
      courseId: Number(resourceID),
      termId: Number(termId)
    });
  };

  render() {
    return (
      <div>
        <Segment attached>
          <Students
            input={{
              onChange: selected => {
                console.log(selected);
                this.setState({ selected: selected });
              },
              selection: true,
              inline: true
            }}
            // value={this.state.selected}
            // onChange={selected => this.setState({ selected: selected.value })}
          />
          <div className="input-group-btn">
            <button className="ui button" onClick={this.enrollStudent}>
              Enroll
            </button>
          </div>
        </Segment>
        <Grid attached columns={cols} data={this.state.students} />
      </div>
    );
  }
}

module.exports = CourseStudents;
