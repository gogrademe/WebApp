import * as React from "react";

import api from "../api/api";

import * as _ from "lodash";
//Molecules
import ModalForm from "../components/ModalForm";
import { Form } from "semantic-ui-react";
// import {Input} from 'formsy-react-components';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

interface AssignmentGroupProps {
  courseId: number;
  termId: number;
  groupId: number;
}
export class AssignmentGroup extends React.Component<any, any> {
  onSubmit = model => {
    model.weight = Number(model.weight / 100);
    model.courseId = Number(this.props.courseId);
    model.termId = Number(this.props.termId);

    if (this.props.groupId) {
      model.groupId = this.props.groupId;
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
          validationError="must be between .5% and 100%"
          validations="isWeight"
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
