import React from 'react';
import ModalActions from '../actions/ModalActions';
import ModalTypes from '../constants/ModalTypes';

var ModalButton = React.createClass({
  propTypes: {
    modal: React.PropTypes.string.isRequired
  },
  handleOnClick() {
    var {modal, className, ...otherProps} = this.props;

    ModalActions.showModal(modal, otherProps);
  },
  render(){
    var {modal, className, icon, ...otherProps} = this.props;
    return (
      <a onClick={this.handleOnClick} {...this.props}>
        {this.props.label || this.props.children}
      </a>
    );
  }
});

const TermBtn = (props) => <ModalButton modal={ModalTypes.TERM} {...props}/>
const AssignmentGroupBtn = (props) => <ModalButton modal={ModalTypes.ASSIGNMENT_TYPE} {...props}/>
const AssignmentBtn = (props) => <ModalButton modal={ModalTypes.ASSIGNMENT} {...props}/>
const AssignmentGradesBtn = (props) => <ModalButton modal={ModalTypes.ASSIGNMENT_GRADES} {...props}/>
const AccountBtn = (props) => <ModalButton modal={ModalTypes.ACCOUNT} {...props}/>
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
