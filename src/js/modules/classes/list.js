import _ from "lodash";

import React from "react";
import { loadCourses } from "../../redux/modules/course";
import { loadTerms } from "../../redux/modules/term";
import { connect } from "react-redux";

import { Grid, CrudActions } from "../../components/NewTable";

import { Link } from "react-router-dom";
import Header from "../../components/PageHeader";

import { Combobox as Select } from "react-widgets";
import { CourseBtn } from "../../molecules/ModalButtons";

const CourseLink = ({ column, row, value }) => (
  <div>
    <Link to={`/course/${column.currentTerm}/${row.courseId}/grades`}>{value}</Link>
  </div>
);

const Actions = props => (
  <div className="btn-group">
    <CrudActions {...props} />
    <CourseBtn label="Edit" values={{ courseId: props.row.courseId }} />
  </div>
);

const TermSelect = ({ currentTerm, terms = [] }) => (
  <Select
    className="inline"
    onChange={val => this.setState({ term: val.termId })}
    value={currentTerm}
    data={terms}
    valueField="termId"
    textField={item => `${item.schoolYear} - ${item.name}`}
  />
);

class CourseList extends React.Component {
  componentDidMount() {
    const { loadCourses, loadTerms } = this.props;
    loadCourses();
    loadTerms();
  }
  cols = () => {
    return [
      {
        key: "name",
        display: "Class Name",
        renderer: CourseLink,
        currentTerm: this.props.currentTerm
      },
      {
        key: "gradeLevel",
        display: "Grade Level"
      },
      {
        display: "",
        resourceType: "course",
        renderer: Actions,
        tdClassName: "collapsing right aligned",
        linkTo: "class"
      }
    ];
  };
  render() {
    return (
      <div>
        <Header
          primary="All Courses"
          // secondary='Test'
          right={
            <Select
              className="inline"
              onChange={val => this.setState({ term: val.termId })}
              value={this.props.currentTerm}
              data={this.props.terms}
              valueField="termId"
              textField={item => `${item.schoolYear} - ${item.name}`}
            />
          }
        />
        <div>
          <CourseBtn label="New" values={{ initialValues: { termId: this.props.currentTerm } }} />
        </div>
        <div>
          <Grid attached columns={this.cols()} data={this.props.courses} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const terms = _.values(state.entities.terms);
  return {
    courses: _.values(state.entities.courses),
    terms: terms,
    currentTerm: terms[0] ? terms[0].termId : 0
  };
};

export default connect(
  mapStateToProps,
  { loadCourses, loadTerms }
)(CourseList);
