import React from 'react';

import api from '../api/api';

//Molecules
import ModalForm from '../molecules/ModalForm';
import LabeledField from '../molecules/LabeledField';

export default React.createClass({
  propTypes: {
    person_id: React.PropTypes.number.isRequired
  },
  getInitialState() {
    return {
      person: {}
    };
  },
  onSubmit(model) {
    return api.user.create(model);
  },
  fetchPerson() {
    api.person.get(this.props.person_id)
      .then((person)=>{
        this.setState({person: person});
      });
  },
  componentWillMount() {
    this.fetchPerson();
  },
  render() {
    const {first_name, last_name, email} = this.state.person;
    return (
      <ModalForm {... this.props} title="User Account" onSubmitAsync={this.onSubmit}>
        <div className="field">
          <label>
            Name
          </label>
          <span>
            {first_name} {last_name}
          </span>
        </div>
        <LabeledField name="email" label="Email" value={email}/>
      </ModalForm>

    );
  }
});
