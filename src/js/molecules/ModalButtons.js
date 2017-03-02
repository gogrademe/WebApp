import React from 'react';
import {Button} from 'semantic-ui-react';
// import ModalActions from '../actions/ModalActions';
import ModalTypes from '../constants/ModalTypes';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router';

var ModalButton = inject('modalStore')(React.createClass({
  propTypes: {
    modal: React.PropTypes.string.isRequired
  },
  handleOnClick() {
    var {modalStore, modal, className, values} = this.props;

    modalStore.showModal(modal,values);
    // ModalActions.showModal(modal, otherProps);
  },
  render(){
    var {label, children} = this.props;
    return (
      <Button onClick={this.handleOnClick}>
        {label || children}
      </Button>
    );
  }
}));

// const TermBtn = (props) => <ModalButton modal={ModalTypes.TERM} {...props}/>
const TermBtn = (props) => <Button as={Link} to="/app/setup/terms/new" {...props}>Add Term</Button>
const AssignmentGroupBtn = (props) => <ModalButton modal={ModalTypes.ASSIGNMENT_TYPE} {...props}/>
const AssignmentBtn = (props) => <ModalButton modal={ModalTypes.ASSIGNMENT} {...props}/>
const AssignmentGradesBtn = (props) => <ModalButton modal={ModalTypes.ASSIGNMENT_GRADES} {...props}/>
const AccountBtn = (props) => <ModalButton modal={ModalTypes.ACCOUNT} {...props}/>
// const PersonBtn = (props) => <Button as={Link} to="/app/people/new" {...props}>Add Person</Button>
const PersonBtn = (props) => <ModalButton modal={ModalTypes.PERSON} {...props}/>
const CourseBtn = (props) => <ModalButton modal={ModalTypes.COURSE} {...props}/>

module.exports = {
  TermBtn: TermBtn,
  PersonBtn: PersonBtn,
  AssignmentGroupBtn: AssignmentGroupBtn,
  AssignmentBtn: AssignmentBtn,
  AssignmentGradesBtn: AssignmentGradesBtn,
  AccountBtn: AccountBtn,
  CourseBtn: CourseBtn
};
