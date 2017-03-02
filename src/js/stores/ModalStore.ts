
import { observable, computed, action, asMap } from 'mobx'

class ModalStore {
  @observable currentModal;
  @observable currentOpts;
  constructor() {
    this.currentModal = null;
    this.currentOpts = asMap();
  }
  @action showModal(id, options={}) {
    this.currentModal = id;
    this.currentOpts.clear()
    options['open'] = true;
    this.currentOpts.merge(options);
  }

  @action hideModal = () => {
    this.currentOpts.set('open', false);
    this.currentModal = null;
  }
}
const modalStore = new ModalStore();

export default modalStore;
export { ModalStore };

// import Reflux from 'reflux';
//
// import invariant from 'invariant';
//
// import actions from '../actions/ModalActions';
// import ModalTypes from '../constants/ModalTypes';
//
// var ModalStore = Reflux.createStore({
//   listenables: actions,
//   resetModalStore() {
//     this.modal = null;
//   },
//   init() {
//     this.resetModalStore();
//   },
//   onShowModal: function(id, options){
//     invariant(
//       ModalTypes.hasOwnProperty(id),
//       'showModal() accepts a constant from ModalTypes. You passed %s',
//       id
//     );
//     this.modal = {
//       id: id,
//       shouldHide: false,
//       options: options
//     };
//     console.log('show modal', id)
//
//     this.trigger(this.modal);
//   },
//   onHideModal(){
//     // this.resetModalStore();
//     this.modal.id = null;
//     this.modal.shouldHide = true;
//
//     this.trigger(this.modal);
//   }
// });
//
// module.exports = ModalStore;
