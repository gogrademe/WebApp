var React = require('react');
var joinClasses = require('react/lib/joinClasses');

// Atoms
var FormInput = require('../atoms/FormInput');

// Utils
var FormLink = require('../utils/FormLink');


var FormInputRow = React.createClass({
    propTypes: {
      component: React.PropTypes.element,
      formLink: React.PropTypes.instanceOf(FormLink).isRequired,
      valueLink: function (props, propName) {
        if (props[propName]) {
            console.warn('Cannot use valueLink with FormInputRow. Use formLink instead.');
        }
      },
      placeholder: React.PropTypes.string,
      label: React.PropTypes.string,
      type: React.PropTypes.string,
      name: React.PropTypes.string,
      readOnly: React.PropTypes.bool,
      validate: React.PropTypes.any
    },
    getDefaultProps() {
      return {
        component: FormInput,
        type: "text",
        isValid: false,
        required: true,
        validate: null
      }
    },
    getInitialState() {
        return {
            hasError: false,
            focussed: false
        }
    },
    handleBlur() {
        this.setState({
            focused: false
        });
    },
    handleFocus() {
        this.setState({
            focused: true
        });
    },
    render() {
      var {component: Component, ...props} = this.props;

      var formLink = props.formLink;

      var error = this.state.hasError ? 'error' : '';

      var required = props.required ? (
          <div className="ui corner label">
              <i className="asterisk icon" />
          </div>) : '';

      var label = props.label ? (
          <label>
            {props.label}
          </label>) : '';

      return (
          <div className={joinClasses('ui field', error)}>
            {label}
            <div className="ui corner labeled input">
                <Component {...props}
                    placeholder={props.placeholder || props.label}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus} />
                {required}
            </div>
          </div>
      )
    }
});

module.exports = FormInputRow;
