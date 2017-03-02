
import * as React from 'react';

import * as api from '../api/api';
import asForm from '../components/AsForm';

// import * as AutocompleteFor from '../molecules/AutoCompleteFor';
import ModalForm from '../molecules/ModalForm';
import { Input } from 'semantic-ui-react';
import { inject,observer } from 'mobx-react';
import { action, observable } from 'mobx';
import {PersonStore, Person} from '../stores';

interface PersonModalProps {
  person_id: number;
  personStore: PersonStore;
  updateProperty: any;
}

@inject('personStore') @observer
class PersonModal extends React.Component<PersonModalProps, undefined> {
  @observable person;

  @action updateProperty = (event) => {
    this.person[event.target.name] = event.target.value;
  }

  onSubmit = (model) => {
    this.props.personStore.create(model);
    // return api.person.create(model);
  }

  componentWillMount() {
    this.person = this.props.personStore.people.find(p => p.person_id === this.props.person_id) || new Person();
  }

  render() {
    // const values = this.props.personStore.people.find(p => p.person_id === this.props.person_id) || new Person();
    return (
      // <ModalForm {... this.props} title="Person" onSubmitAsync={this.onSubmit}>
      <div>
        <div className="field">
          <label>Name</label>
          <div className="three fields required">
            <Input name="first_name" placeholder="First" value={this.person.first_name} onChange={this.updateProperty} />
            <Input name="middle_name" placeholder="Middle" value={this.person.middle_name} onChange={this.updateProperty}/>
            <Input name="last_name" placeholder="Last" value={this.person.last_name} onChange={this.updateProperty} />
          </div>
        </div>
        <Input name="email" label="Email"/>
        {/* <AutocompleteFor.ProfileTypes label="Types" name="types" required/> */}
        </div>
      // </ModalForm>
    );
  }
}

export default PersonModal;
