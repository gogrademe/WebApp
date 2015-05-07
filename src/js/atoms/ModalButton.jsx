

import React from 'react';

import ModalActions from '../actions/ModalActions';

var ModalButton = React.createClass({
  propTypes: {
    modal: React.PropTypes.string.isRequired
  },
  handleOnClick() {
    var {modal, ...other} = this.props;

    ModalActions.showModal(modal, ...other);
  },
  render(){
    console.warn('WARN: deprecated.');
    return (
      <FloatingActionButton {...this.props} onClick={this.handleOnClick}/>
    );
  }
});


module.exports = ModalButton;
