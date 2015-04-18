

var React = require('react');

var ModalActions = require('../actions/ModalActions');

var ModalButton = React.createClass({
  propTypes: {
    modal: React.PropTypes.string.isRequired
  },
  handleOnClick: function() {
    var {modal, ...other} = this.props;

    ModalActions.showModal(modal, ...other);
  },
  render: function(){
    return (
      <FloatingActionButton {...this.props} onClick={this.handleOnClick}/>
    );
  }
});


module.exports = ModalButton;
