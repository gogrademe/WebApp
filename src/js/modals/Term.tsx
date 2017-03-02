import * as React from 'react';

import api from '../api/api';

//Molecules
import ModalForm from '../molecules/ModalForm';
import LabeledField from '../molecules/LabeledField';
// import connect from '../api-connector';

import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react'

 class TermModal extends React.Component<any,any> {
  onSubmit = (model) => {
    model.school_year = Number(model.school_year);
    return api.term.create(model);
  }

  render() {
    return (
      // <ModalForm {... this.props} title="School Year" onSubmitAsync={this.submit}>
      <div>
        <Form.Input label="Name" name="name" required placeholder="Term 1" />
        <Form.Input label="School Year" name="school_year" validations="isNumeric" placeholder="End" />
      </div>
      // </ModalForm>
    );
  }
}

export default TermModal;
// connect(props => ({
//   postLike: subject => ({
//     postLikeResponse: {
//       url: `/users/${props.userId}/likes`
//       method: 'POST'
//       body: JSON.stringify({ subject })
//     }
//   })
// }))(Profile)



// export default connect(props => ({
//   postTerm: model => ({
//     postTermResponse: {
//      url: '/term',
//      method: 'POST',
//      body: JSON.stringify({ model })
//    }
//   })
// }))(TermModal)
