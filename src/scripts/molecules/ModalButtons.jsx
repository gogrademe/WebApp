

var React = require('react');
var cx = require('react/lib/cx');

// var Button = require('react-semantic-ui').Button;

var ModalActions = require('../actions/ModalActions');
var ModalTypes = require('../constants/ModalTypes');

var ModalButton = React.createClass({
  propTypes: {
    modal: React.PropTypes.string.isRequired
  },
  handleOnClick: function() {
    var {modal, className, ...otherProps} = this.props;

    ModalActions.showModal(modal, otherProps);
  },
  render: function(){
    var {modal, className, icon, ...otherProps} = this.props;
    return (
      <a className={cx({
          'ui tiny button': true,
          'primary': true,
          'icon': icon
        })} onClick={this.handleOnClick} {...this.props}>
        {this.props.label || this.props.children}
      </a>
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
var AssignmentBtn = React.createClass({
  render: function(){
    return (
      <ModalButton modal={ModalTypes.ASSIGNMENT} {...this.props}/>
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
var PersonBtn = React.createClass({
  render: function(){
    return (
      <ModalButton modal={ModalTypes.PERSON} {...this.props}/>
    );
  }
});


module.exports = {
  TermBtn: TermBtn,
  PersonBtn: PersonBtn,
  AssignmentTypeBtn: AssignmentTypeBtn,
  AssignmentBtn: AssignmentBtn,
  AccountBtn: AccountBtn
};
