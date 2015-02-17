"use strict";

var React = require('react');

var Reflux = require('reflux');

var ModalActions = require('../actions/ModalActions');
var modalStore = require('../stores/ModalStore');
var ModalTypes = require('../constants/ModalTypes');


// Modals
var TermModal = require('../modals/Term');
var AssignmentModal = require('../modals/Assignment');
var AssignmentTypeModal = require('../modals/AssignmentType');
var AccountModal = require('../modals/Account');
var PersonModal = require('../modals/Person');

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
        return <TermModal {...props} {...modal.options} />
      case ModalTypes.ASSIGNMENT_TYPE:
        return <AssignmentTypeModal {...props}{...modal.options} />
      case ModalTypes.ACCOUNT:
        return <AccountModal {...props}{...modal.options} />
      case ModalTypes.PERSON:
        return <PersonModal {...props} {...modal.options}/>
      case ModalTypes.ASSIGNMENT:
        return <AssignmentModal {...props}{...modal.options} />
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
