import React from 'react';

import Header from '../../components/PageHeader';

import {AccountBtn, PersonBtn} from '../../molecules/ModalButtons';
import {observer, inject} from 'mobx-react';

import {Menu, Button, Icon, Table}  from 'semantic-ui-react';
import DeleteBtn from '../../atoms/DeleteButton';

// const Item: React.StatelessComponent<{}> = observer(({store,person}) => (
const Item = (store,person) => (
  <Table.Row>
    <Table.Cell>{person.first_name}</Table.Cell>
    <Table.Cell>{person.middle_name}</Table.Cell>
    <Table.Cell>{person.last_name}</Table.Cell>
    <Table.Cell textAlign='right'>
      <DeleteBtn onClick={(e) => store.delete(person.person_id)}/>
      <PersonBtn label="Edit"
        values={{person_id: person.person_id}}/>
      <AccountBtn icon
        values={{person_id: person.person_id}}>
        <Icon  name="settings"/>
      </AccountBtn>
    </Table.Cell>
  </Table.Row>
);

@inject('personStore') @observer
class PeopleList extends React.Component<any,any> {
  static onEnter({ personStore, params }) {
      // Make sure to ALWAYS returns something (preferably a promise), even if its nothing!
      // Otherwise we won't know when the method finished it's work
      return personStore.loadPeople();
  }

  state = {
    currentFilter: 'All'
  }


  renderFilterButton = (name) => {
    var isActive, btnClassName, setActive, this$ = this;
    isActive = this.state.currentFilter === name;
    setActive = function(){
      return this$.setState({
        currentFilter: name
      });
    };
    return (
      <Menu.Item active={isActive} onClick={setActive}>
        {name}
      </Menu.Item>
    );
  }
  render(){
    const {personStore} = this.props;
    return (
      <div>
        <Header primary="All People"/>
        <Menu text attached>
          <Menu.Item header>Filter</Menu.Item>
            {this.renderFilterButton('All')}
            {this.renderFilterButton('Students')}
            {this.renderFilterButton('Teachers')}
            {this.renderFilterButton('Parents')}
            {this.renderFilterButton('Admins')}
          <Menu.Item position='right' as={PersonBtn}> Add Person</Menu.Item>
        </Menu>
        <Table attached>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Middle Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell textAlign='right'/>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {personStore.people.map((item) => (<Item key={item.person_id} person={item} store={personStore}/>))}
          </Table.Body>
        </Table>
      </div>
    )
  }
}
export default PeopleList;
