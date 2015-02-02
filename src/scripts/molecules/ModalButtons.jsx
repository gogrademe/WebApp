"use strict";

var React = require('react');

// var Button = require('react-semantic-ui').Button;

var ModalActions = require('../actions/ModalActions');
var ModalTypes = require('../constants/ModalTypes');

var ModalButton = React.createClass({
  propTypes: {
    modal: React.PropTypes.string.isRequired
  },
  handleOnClick: function() {
    var {modal, ...other} = this.props;

    ModalActions.showModal(modal, other);
  },
  render: function(){
    return (
      <button className="ui primary tiny button" onClick={this.handleOnClick}>
        {this.props.label}
      </button>
    );
  }
});

var TermBtn = React.createClass({
  render: function(){
    return (
      <ModalButton modal={ModalTypes.TERM} {...this.props}/>
    );
  }
});

var AssignmentTypeBtn = React.createClass({
  render: function(){
    return (
      <ModalButton modal={ModalTypes.ASSIGNMENT_TYPE} {...this.props}/>
    );
  }
});
var AccountBtn = React.createClass({
  render: function(){
    return (
      <ModalButton modal={ModalTypes.ACCOUNT} {...this.props}/>
    );
  }
});


module.exports = {
  TermBtn: TermBtn,
  AssignmentTypeBtn: AssignmentTypeBtn,
  AccountBtn: AccountBtn
};
