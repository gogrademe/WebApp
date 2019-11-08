import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Form } from "semantic-ui-react";
import api from "../api/api";
import ModalForm from "../components/ModalForm";

interface AssignmentGroupProps {
  courseId: number;
  termId: number;
  groupId: number;
}

export class AssignmentGroup extends React.Component<AssignmentGroupProps, any> {
  onSubmit = model => {
    const { courseId, termId, groupId } = this.props;
    model = { ...model, courseId: Number(courseId), termId: Number(termId), weight: Number(model.weight) };
    // model.weight = Number(model.weight / 100);

    if (groupId) {
      model.groupId = groupId;
      return api.group.update(model.groupId, model);
    } else {
      return api.group.create(model);
    }
  };
  render() {
    // const weight = Number(this.state.group.weight * 100) || '';
    return (
      <ModalForm {...this.props} title="Assignment Group" onSubmitAsync={this.onSubmit}>
        <Field label="Name" name="name" placeholder="Name" component={Form.Input} />
        <Field
          label="Weight"
          name="weight"
          validations="isWeight"
          validationError="must be between .5% and 100%"
          component={Form.Input}
        />
      </ModalForm>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: {
      ...ownProps.initialValues,
      ..._.get(state.entities.groups, ownProps.groupId, {})
    }
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "assignmentGroup" // a unique identifier for this form
  })(AssignmentGroup)
);
