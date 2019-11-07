import * as React from "react";

import api from "../api/api";

import ModalForm from "../components/ModalForm";
import { AssignmentGroup } from "../molecules/AutoCompleteFor";

import { DateTimePicker } from "react-widgets";
import "react-widgets/lib/less/react-widgets.less";

import { Field, reduxForm } from "redux-form";

import { Form } from "semantic-ui-react";
import { connect } from "react-redux";

var Moment = require("moment");
var momentLocalizer = require("react-widgets/lib/localizers/moment");

momentLocalizer(Moment);
interface AssignmentModalProps {
  courseId: number;
  termId: number;
}

export class AssignmentModal extends React.Component<AssignmentModalProps, any> {
  handleSubmit = data => {
    const { courseId, termId } = this.props;
    data = { ...data, termId, courseId, maxScore: Number(data.maxScore) };

    api.assignment.create(data);
  };
  render() {
    const { courseId, termId, ...rest } = this.props;
    return (
      <ModalForm {...rest} title="Assignment" onSubmitAsync={this.handleSubmit}>
        <Field label="Name" name="name" placeholder="Name" component={Form.Input} />
        <Field name="groupId" label="Type" courseId={courseId} termId={termId} component={AssignmentGroup} />
        <Form.Group widths="2">
          <Field label="Due Date" name="dueDate" placeholder="Date" component={DateTimePicker} time={false} />
          <Field label="Max Score" name="maxScore" placeholder="100" component={Form.Input} />
        </Form.Group>
      </ModalForm>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: {
      ...ownProps.initialValues,
      maxScore: 0,
      ...(state.entities.assignments[ownProps.assignmentId] || {})
    }
  };
};

export default connect(
  mapStateToProps
  // dispatch => {
  //   return {
  //     create: course => {
  //       course.terms = [{ termId: course.termId }];
  //       // dispatch(createCourse(course));
  //     }
  //   };
  // }
)(
  reduxForm({
    form: "assignment"
  })(AssignmentModal)
);
