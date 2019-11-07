import React from "react";

import api from "../api/api";

//Molecules
import ModalForm from "../components/ModalForm";

import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from "semantic-ui-react";
export default React.createClass({
  propTypes: {
    personId: React.PropTypes.number.isRequired
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
    api.person.get(this.props.personId).then(person => {
      this.setState({ person: person });
    });
  },
  componentWillMount() {
    this.fetchPerson();
  },
  render() {
    const { firstName, lastName, email } = this.state.person;
    return (
      <ModalForm {...this.props} title="User Account" onSubmitAsync={this.onSubmit}>
        <div className="field">
          <label>Name</label>
          <span>
            {firstName} {lastName}
          </span>
        </div>
        <Input name="email" label="Email" value={email} />
      </ModalForm>
    );
  }
});
