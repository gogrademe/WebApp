import * as React from "react";

import api from "../api/api";

import ModalForm from "../components/ModalForm";

import { Field, reduxForm } from "redux-form";

import { Form } from "semantic-ui-react";

class TermModal extends React.Component<any, any> {
  onSubmit = model => {
    model.schoolYear = Number(model.schoolYear);
    return api.term.create(model);
  };

  render() {
    return (
      <ModalForm {...this.props} title="School Year" onSubmitAsync={this.onSubmit}>
        <div>
          <Field label="Name" name="name" required placeholder="Term 1" component={Form.Input} />
          <Field label="School Year" name="schoolYear" placeholder="End" component={Form.Input} />
        </div>
      </ModalForm>
    );
  }
}
// export default TermModal;
export default reduxForm({
  form: "termModal"
})(TermModal);
