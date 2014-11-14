var React = require('react');
var joinClasses = require('react/lib/joinClasses');

// Atoms
var FormInput = require('../atoms/FormInput');

// Utils
var FormLink = require('../utils/FormLink');

var FormInputRow = React.createClass({

  propTypes: {
    component: React.PropTypes.func,
    formLink: React.PropTypes.instanceOf(FormLink).isRequired,
    valueLink: function (props, propName) {
      if (props[propName]) {
        console.warn('Cannot use valueLink with FormInputRow. Use formLink instead.');
      }
    },
    placeholder: React.PropTypes.string,
    label: React.PropTypes.string,
    blended: React.PropTypes.bool,
    borderless: React.PropTypes.bool,
    type: React.PropTypes.string,
    name: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    bold: React.PropTypes.bool,
    autofill: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      required: true
    };
  },

  getInitialState: function () {
    return {
      focus: false
    };
  },

  handleBlur: function (e) {
    this.setState({
      focus: false
    });

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  },

  handleFocus: function (e) {
    this.setState({
      focus: true
    });

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  },

  handleKeyUp: function (e) {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(e);
    }
  },

  isEmpty: function () {
    var value = this.props.formLink.value;
    if (!value) {
      return true;
    }

    if (typeof value.isEmpty === 'function') {
      return value.isEmpty();
    }

    return false;
  },

  render: function() {
    var {component: Component, ...props} = this.props;

    var formLink = props.formLink;
    var fieldMessage = this.props.formLink.fieldMessage;

    var error = fieldMessage && fieldMessage.isError ? 'error' : '';

    var required = props.required ? (
        <div className="ui corner label">
            <i className="asterisk icon" />
        </div>) : '';

    var label = props.label ? (
        <label>
          {props.label}
        </label>) : '';

    return (
        <div className={joinClasses('ui field', error)}
             data-empty={this.isEmpty()}
             data-focus={this.state.focus}
             onMouseDown={this.handleInputBoxClick}>

          {label}
          <div className="ui corner labeled input">
              <FormInput {...props}
                  ref="input"
                  placeholder={props.placeholder || props.label}
                  onBlur={this.handleBlur}
                  onFocus={this.handleFocus}
                  onKeyUp={this.handleKeyUp} />
              {required}
          </div>
          {this.renderMessage()}
        </div>
    )
  },

  handleInputBoxClick: function (e) {
    var inputEl = this.refs.input.getDOMNode();

    if (inputEl !== e.target && !inputEl.contains(e.target)) {
      e.preventDefault();
      this.refs.input.focus();
    }
  },

  renderMessage: function () {
    var formLink = this.props.formLink,
        fieldMessage = formLink.fieldMessage;

    if (!fieldMessage) {
      return;
    }

    if (!fieldMessage.isError) {
      return (
        <div className='FormInputRow-help'>
          {fieldMessage.message}
        </div>
      );
    }

    // hasFormError will get reset on next tick,
    // so we use it to trigger the animation

    var animateShake = !formLink.hasFormError;
    return (
      <div className="ui red pointing prompt label transition visible">
        {fieldMessage.message}
      </div>
    );
  },

  focus: function () {
    this.refs.input.focus();
  }
});

module.exports = FormInputRow;
