

import Reflux from 'reflux';

import invariant from 'react/lib/invariant';

import actions from '../actions/ModalActions';
import ModalTypes from '../constants/ModalTypes';

var ModalStore = Reflux.createStore({
  listenables: actions,
  resetModalStore() {
    this.modal = null;
  },
  init() {
    this.resetModalStore();
  },
  onShowModal: function(id, options){
    invariant(
      ModalTypes.hasOwnProperty(id),
      'showModal() accepts a constant from ModalTypes. You passed %s',
      id
    );
    this.modal = {
      id: id,
      shouldHide: false,
      options: options
    };

    this.trigger(this.modal);
  },
  onHideModal(){
    // this.resetModalStore();
    this.modal.id = null;
    this.modal.shouldHide = true;

    this.trigger(this.modal);
  }
});

module.exports = ModalStore;
