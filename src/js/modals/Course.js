import React from "react";
import { Field, reduxForm } from "redux-form";
import { Combobox as Select } from "react-widgets";
import ModalForm from "../components/ModalForm";
import { Term, GradeLevel } from "../molecules/AutoCompleteFor";
import { connect } from "react-redux";
import { createCourse } from "../redux/modules/course";

class CourseModal extends React.Component {
  handleSubmit = data => {
    data.terms = [data.termId];
    return this.props.create(data);
  };
  render() {
    return (
      <ModalForm {...this.props} title="Course" onSubmitAsync={this.handleSubmit}>
        <div className="field">
          <label>Name</label>
          <Field name="name" component="input" type="text" />
        </div>
        <div className="field">
          <label>Grade Level</label>
          <Field name="levelId" component={GradeLevel} />
        </div>
        <div className="field">
          <label>Terms</label>
          <Field name="termId" className="inline" component={Term} />
        </div>
      </ModalForm>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    terms: Object.values(state.entities.terms),
    initialValues: {
      ...ownProps.initialValues,
      ...ownProps.termId,
      ..._.get(state.entities.courses, ownProps.courseId, {})
    }
  };
};

export default connect(
  mapStateToProps,
  dispatch => {
    return {
      create: course => {
        course.terms = [{ termId: course.termId }];
        dispatch(createCourse(course));
      }
    };
  }
)(
  reduxForm({
    form: "course" // a unique identifier for this form
  })(CourseModal)
);
