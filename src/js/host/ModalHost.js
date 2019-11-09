import React from "react";

import { observer, inject } from "mobx-react";
import ModalTypes from "../constants/ModalTypes";

// Modals
import TermModal from "../modals/Term";
import AssignmentModal from "../modals/Assignment";
import AssignmentGroupModal from "../modals/AssignmentGroup";
import AccountModal from "../modals/Account";
import PersonModal from "../modals/Person";
import CourseModal from "../modals/Course";

const ModalContainer = observer(["modalStore"], ({ modalStore }) => {
  switch (modalStore.currentModal) {
    case ModalTypes.TERM:
      return (
        <TermModal
          {...modalStore.currentOpts.toJS()}
          onClose={modalStore.hideModal}
          requestClose={modalStore.hideModal}
        />
      );
    case ModalTypes.ASSIGNMENT_TYPE:
      return (
        <AssignmentGroupModal
          {...modalStore.currentOpts.toJS()}
          onClose={modalStore.hideModal}
          requestClose={modalStore.hideModal}
        />
      );
    case ModalTypes.ACCOUNT:
      return (
        <AccountModal
          {...modalStore.currentOpts.toJS()}
          onClose={modalStore.hideModal}
          requestClose={modalStore.hideModal}
        />
      );
    case ModalTypes.PERSON:
      return (
        <PersonModal
          {...modalStore.currentOpts.toJS()}
          onClose={modalStore.hideModal}
          requestClose={modalStore.hideModal}
        />
      );
    case ModalTypes.ASSIGNMENT:
      return (
        <AssignmentModal
          {...modalStore.currentOpts.toJS()}
          onClose={modalStore.hideModal}
          requestClose={modalStore.hideModal}
        />
      );
    case ModalTypes.COURSE:
      return (
        <CourseModal
          {...modalStore.currentOpts.toJS()}
          onClose={modalStore.hideModal}
          requestClose={modalStore.hideModal}
        />
      );
    case null:
      return null;
    default:
      console.warn("UNHANDLED MODAL TYPE: ", modalStore.currentModal);
      return null;
  }
});
export default ModalContainer;
