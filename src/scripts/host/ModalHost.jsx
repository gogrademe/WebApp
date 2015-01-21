var React = require('react');

var Reflux = require('reflux');
var RaisedButton = require('material-ui').RaisedButton;
var Dialog = require('material-ui').Dialog;

var ModalActions = require('../actions/ModalActions');
var modalStore = require('../stores/ModalStore');
var ModalTypes = require('../constants/ModalTypes');


// Modals
var TermModal = require('../modals/Term');

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

    // TODO: Check if modal was previously shown.
    if (!modal && modal.shouldHide === true) {
      this.refs.modal.dismiss();
    }
    // this.refs.standardDialog.show();
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
  closeModal: function() {
    ModalActions.hideModal();
  },
  getModal: function() {
    var modal = this.state.modal;

    if (!modal) {
      return null;
    }
    switch (modal.id) {
      case ModalTypes.TERM:
        return <TermModal ref="modal" onCloseClick={this.closeModal} />
        break;
      default:
        return null;
    }
  }
});

module.exports = ModalHost;
