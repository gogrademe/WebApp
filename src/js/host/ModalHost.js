import React from 'react';

import { observer, inject } from 'mobx-react';
import ModalTypes from '../constants/ModalTypes';

// Modals
import TermModal from '../modals/Term';
import AssignmentModal from '../modals/Assignment';
import AssignmentGroupModal from '../modals/AssignmentGroup';
import AccountModal from '../modals/Account';
import PersonModal from '../modals/Person';
import CourseModal from '../modals/Course';

const ModalContainer = observer(['modalStore'],({modalStore}) => {
  switch (modalStore.currentModal) {
    case ModalTypes.TERM:
      return <TermModal {...modalStore.currentOpts.toJS()} onClose={modalStore.hideModal} requestClose={modalStore.hideModal}/>
    case ModalTypes.ASSIGNMENT_TYPE:
      return <AssignmentGroupModal {...modalStore.currentOpts.toJS()} onClose={modalStore.hideModal} requestClose={modalStore.hideModal}/>
    case ModalTypes.ACCOUNT:
      return <AccountModal {...modalStore.currentOpts.toJS()} onClose={modalStore.hideModal} requestClose={modalStore.hideModal}/>
    case ModalTypes.PERSON:
      return <PersonModal {...modalStore.currentOpts.toJS()} onClose={modalStore.hideModal} requestClose={modalStore.hideModal}/>
    case ModalTypes.ASSIGNMENT:
      return <AssignmentModal {...modalStore.currentOpts.toJS()} onClose={modalStore.hideModal} requestClose={modalStore.hideModal}/>
    case ModalTypes.COURSE:
      return <CourseModal {...modalStore.currentOpts.toJS()} onClose={modalStore.hideModal} requestClose={modalStore.hideModal}/>
    case null:
      return null;
    default:
      console.warn('UNHANDLED MODAL TYPE: ', modalStore.currentModal);
      return null;
  }
})
export default ModalContainer;
//
// export default React.createClass({
//   mixins: [Reflux.ListenerMixin],
//   getInitialState() {
//     return {
//       modal: null
//     };
//   },
//   onModalStoreChange(modal) {
//     this.setState({
//         modal: modal
//     });
//   },
//   componentDidMount() {
//       this.listenTo(modalStore, this.onModalStoreChange);
//   },
//   render() {
//     const modal = this.getModal();
//     console.log('render modal', modal)
//     return (
//       <div>
//         {modal}
//       </div>
//     );
//   },
//   getModal(){
//     const {modal} = this.state;
//
//     var props = {
//       ref: 'modal',
//       onHide: this._handleRequestHide,
//       show: true
//     };
//
//     if (!modal) {
//       return null;
//     }
//     switch (modal.id) {
//       case ModalTypes.TERM:
//         return <TermModal {...props} {...modal.options} />
//       case ModalTypes.ASSIGNMENT_TYPE:
//         return <AssignmentGroupModal {...props}{...modal.options} />
//       case ModalTypes.ACCOUNT:
//         return <AccountModal {...props}{...modal.options} />
//       case ModalTypes.PERSON:
//         return <PersonModal {...props} {...modal.options}/>
//       case ModalTypes.ASSIGNMENT:
//         return <AssignmentModal {...props}{...modal.options} />
//       case ModalTypes.COURSE:
//         return <CourseModal {...props}{...modal.options} />
//       case null:
//         return null;
//       default:
//         console.warn('UNHANDLED MODAL TYPE: ', modal);
//         return null;
//     }
//   },
//   _handleRequestHide() {
//     ModalActions.hideModal();
//   }
// });
