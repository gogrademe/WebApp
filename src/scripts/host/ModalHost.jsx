"use strict";

var React = require('react');

var Reflux = require('reflux');
var RaisedButton = require('material-ui').RaisedButton;
var Dialog = require('material-ui').Dialog;

var ModalActions = require('../actions/ModalActions');
var modalStore = require('../stores/ModalStore');
var ModalTypes = require('../constants/ModalTypes');


// Modals
var TermModal = require('../modals/Term');
var AssignmentTypeModal = require('../modals/AssignmentType');
var AccountModal = require('../modals/Account');

var ModalHost = React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState: function() {
    return {
      modal: null
    };
  },
  onModalStoreChange: function(modal) {
    this.setState({
        modal: modal
    });
  },
  componentDidMount: function() {
      this.listenTo(modalStore, this.onModalStoreChange);
  },
  render: function() {
    var modal = this.getModal();
    return (
      <div>
        {modal}
      </div>
    );
  },

  getModal: function() {
    var modal = this.state.modal;

    var props = {
      ref: "modal",
      onRequestHide: this._handleRequestHide
    };

    if (!modal) {
      return null;
    }
    switch (modal.id) {
      case ModalTypes.TERM:
        return <TermModal {...props} />
      case ModalTypes.ASSIGNMENT_TYPE:
        return <AssignmentTypeModal {...props} />
      case ModalTypes.ACCOUNT:
        return <AccountModal {...props} />
      case null:
        return null;
      default:
        console.warn("UNHANDLED MODAL TYPE: ", modal);
        return null;
    }
  },
  _handleRequestHide: function() {
    ModalActions.hideModal();
  }
});

module.exports = ModalHost;
