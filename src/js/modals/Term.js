import React from 'react';

import api from '../api/api';

//Molecules
import ModalForm from '../molecules/ModalForm';
import LabeledField from '../molecules/LabeledField';
import connect from '../api-connector';

const TermModal = React.createClass({
  onSubmit(model) {
    model.school_year = Number(model.school_year);
    return api.term.create(model);
  },
  render() {
    return (
      <ModalForm {... this.props} title="School Year" onSubmitAsync={this.props.postTerm}>
        <LabeledField label="Name" name="name" required placeholder="Term 1" />
        <LabeledField label="School Year" name="school_year" validations="isNumeric" placeholder="End" />
      </ModalForm>
    );
  }
});

// connect(props => ({
//   postLike: subject => ({
//     postLikeResponse: {
//       url: `/users/${props.userId}/likes`
//       method: 'POST'
//       body: JSON.stringify({ subject })
//     }
//   })
// }))(Profile)

export default connect(props => ({
  postTerm: model => ({
    postTermResponse: {
     url: `/term`,
     method: 'POST',
     body: JSON.stringify({ model })
   }
  })
}))(TermModal)
