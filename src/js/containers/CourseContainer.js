import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "../../components/PageHeader";
import CourseNav from "../components/CourseNav";

import { load as loadAuth, login, logout } from "../redux/modules/course";

class CourseContainer extends Component {
  renderPrimary() {
    switch (false) {
      case !!this.state.course:
        return "Loading...";
      default:
        return this.state.course.name + " - Grade " + this.state.course.gradeLevel;
    }
  }
  renderSecondary() {
    if (!!!this.state.course.term) {
      return "";
    }
    const term = this.state.course.terms.find(t => t.termId == this.props.match.params.termId);
    return `Year ${term.school_year} - ${term.name}`;
  }
  render() {
    const { termId, resourceID } = this.props.match.params;
    return (
      <div>
        <Header primary={this.renderPrimary()} secondary={this.renderSecondary()} />
        <div>
          <div className="row">
            <div className="col-sm-12 col-md-2">
              <CourseNav courseId={resourceID} termId={termId} />
            </div>
            <div className="col-sm-12 col-md-10">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    course: state.entities.course
  }),
  { loadAuth, login, logout }
)(CourseContainer);
