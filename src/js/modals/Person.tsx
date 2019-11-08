import * as React from "react";

import ModalForm from "../components/ModalForm";
import { Input } from "semantic-ui-react";
import { inject, observer } from "mobx-react";
import { action, observable } from "mobx";
import { PersonStore, Person } from "../stores";

interface PersonModalProps {
  personId: number;
  personStore: PersonStore;
  updateProperty: any;
}

@inject("personStore")
@observer
class PersonModal extends React.Component<PersonModalProps, undefined> {
  @observable person;

  @action updateProperty = event => {
    this.person[event.target.name] = event.target.value;
  };

  onSubmit = model => {
    this.props.personStore.create(model);
  };

  componentWillMount() {
    this.person = this.props.personStore.people.find(p => p.personId === this.props.personId) || new Person();
  }

  render() {
    // const values = this.props.personStore.people.find(p => p.personId === this.props.personId) || new Person();
    return (
      <div>
        <div className="field">
          <label>Name</label>
          <div className="three fields required">
            <Input name="firstName" placeholder="First" value={this.person.firstName} onChange={this.updateProperty} />
            <Input
              name="middleName"
              placeholder="Middle"
              value={this.person.middleName}
              onChange={this.updateProperty}
            />
            <Input name="lastName" placeholder="Last" value={this.person.lastName} onChange={this.updateProperty} />
          </div>
        </div>
        <Input name="email" label="Email" />
        {/* <AutocompleteFor.ProfileTypes label="Types" name="types" required/> */}
      </div>
      // </ModalForm>
    );
  }
}

export default PersonModal;
