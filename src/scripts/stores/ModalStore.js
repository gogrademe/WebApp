"use strict";

var Reflux = require('reflux');

var invariant = require('react/lib/invariant');

var actions = require('../actions/ModalActions');
var ModalTypes = require('../constants/ModalTypes');

var ModalStore = Reflux.createStore({
  listenables: actions,
  resetModalStore: function() {
    this.modal = null;
  },
  init: function() {
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
  onHideModal: function(){
    // this.resetModalStore();
    this.modal.id = null;
    this.modal.shouldHide = true;

    this.trigger(this.modal);
  }
});

module.exports = ModalStore;
