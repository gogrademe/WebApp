

import React from 'react';

// var Button = require('react-semantic-ui').Button;

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

var TermBtn = React.createClass({
  render(){
    return (
      <ModalButton modal={ModalTypes.TERM} {...this.props}/>
    );
  }
});

var AssignmentGroupBtn = React.createClass({
  render(){
    return (
      <ModalButton modal={ModalTypes.ASSIGNMENT_TYPE} {...this.props}/>
    );
  }
});

const AssignmentBtn = (props) => (
  <ModalButton modal={ModalTypes.ASSIGNMENT} {... props}/>
);

var AssignmentGradesBtn = React.createClass({
  render(){
    return (
      <ModalButton modal={ModalTypes.ASSIGNMENT_GRADES} {...this.props}/>
    );
  }
});
var AccountBtn = React.createClass({
  render(){
    return (
      <ModalButton modal={ModalTypes.ACCOUNT} {...this.props}/>
    );
  }
});
var PersonBtn = React.createClass({
  render(){
    return (
      <ModalButton modal={ModalTypes.PERSON} {...this.props}/>
    );
  }
});


module.exports = {
  TermBtn: TermBtn,
  PersonBtn: PersonBtn,
  AssignmentGroupBtn: AssignmentGroupBtn,
  AssignmentBtn: AssignmentBtn,
  AssignmentGradesBtn: AssignmentGradesBtn,
  AccountBtn: AccountBtn
};