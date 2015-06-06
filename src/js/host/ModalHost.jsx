import React from 'react';

import Reflux from 'reflux';

import ModalActions from '../actions/ModalActions';
import modalStore from '../stores/ModalStore';
import ModalTypes from '../constants/ModalTypes';


// Modals
import TermModal from '../modals/Term';
import AssignmentModal from '../modals/Assignment';
import AssignmentGroupModal from '../modals/AssignmentGroup';
// import AssignmentGradesModal from '../modules/assignments/AssignmentGrades';
import AccountModal from '../modals/Account';
import PersonModal from '../modals/Person';

export default React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState() {
    return {
      modal: null
    };
  },
  onModalStoreChange(modal) {
    this.setState({
        modal: modal
    });
  },
  componentDidMount() {
      this.listenTo(modalStore, this.onModalStoreChange);
  },
  render() {
    var modal = this.getModal();
    return (
      <div>
        {modal}
      </div>
    );
  },
  getModal(){
    var modal = this.state.modal;

    var props = {
      ref: 'modal',
      onRequestHide: this._handleRequestHide
    };

    if (!modal) {
      return null;
    }
    switch (modal.id) {
      case ModalTypes.TERM:
        return <TermModal {...props} {...modal.options} />
      case ModalTypes.ASSIGNMENT_TYPE:
        return <AssignmentGroupModal {...props}{...modal.options} />
      case ModalTypes.ASSIGNMENT_GRADES:
        return <AssignmentGradesModal {...props}{...modal.options} />
      case ModalTypes.ACCOUNT:
        return <AccountModal {...props}{...modal.options} />
      case ModalTypes.PERSON:
        return <PersonModal {...props} {...modal.options}/>
      case ModalTypes.ASSIGNMENT:
        return <AssignmentModal {...props}{...modal.options} />
      case null:
        return null;
      default:
        console.warn('UNHANDLED MODAL TYPE: ', modal);
        return null;
    }
  },
  _handleRequestHide() {
    ModalActions.hideModal();
  }
});
