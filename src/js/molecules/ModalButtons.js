import PropTypes from "prop-types";
import React from "react";
import { Button } from "semantic-ui-react";
import ModalTypes from "../constants/ModalTypes";
import { inject } from "mobx-react";

// var ModalButton = inject("modalStore")(

@inject("modalStore")
class ModalButton extends React.Component {
  // propTypes: {
  //   modal: React.PropTypes.string.isRequired
  // },
  handleOnClick = () => {
    const { modalStore, modal, values } = this.props;

    modalStore.showModal(modal, values);
  };
  render() {
    var { label, children } = this.props;
    return <Button onClick={this.handleOnClick}>{label || children}</Button>;
  }
}

export const TermBtn = props => <ModalButton modal={ModalTypes.TERM} {...props} />;
export const AssignmentGroupBtn = props => <ModalButton modal={ModalTypes.ASSIGNMENT_TYPE} {...props} />;
export const AssignmentBtn = props => <ModalButton modal={ModalTypes.ASSIGNMENT} {...props} />;
export const AssignmentGradesBtn = props => <ModalButton modal={ModalTypes.ASSIGNMENT_GRADES} {...props} />;
export const AccountBtn = props => <ModalButton modal={ModalTypes.ACCOUNT} {...props} />;
export const PersonBtn = props => <ModalButton modal={ModalTypes.PERSON} {...props} />;
export const CourseBtn = props => <ModalButton modal={ModalTypes.COURSE} {...props} />;
