// Code from Stampsy

var React = require('react'),
    _ = require('lodash'),
    ClassNameMixin = require('../mixins/ClassNameMixin'),
    FormLink = require('../utils/FormLink'),
    SyntheticEvent = require('react/lib/SyntheticEvent');

var FormInput = React.createClass({
    displayName: 'FormInput',
    mixins: [ClassNameMixin],

    propTypes: {
        component: React.PropTypes.func,
        formLink: React.PropTypes.instanceOf(FormLink).isRequired,
        valueLink: function(props, propName) {
            if (props[propName]) {
                console.warn('Cannot use valueLink with FormInput. Use formLink instead.');
            }
        },
        size: React.PropTypes.oneOf(['small', 'normal']),
        hasMinHeight: React.PropTypes.bool,
        color: React.PropTypes.oneOf(['light', 'dark']).isRequired,
        placeholder: React.PropTypes.string,
        type: React.PropTypes.string,
        name: React.PropTypes.string,
        autofill: React.PropTypes.bool
    },

    getInitialState: function() {
        return {
            hasEdited: false
        };
    },

    className: 'FormInput',

    getCSSModifiers: function() {
        var fieldMessage = this.props.formLink.fieldMessage,
            isError = fieldMessage && fieldMessage.isError;

        return {
            'error': isError,
            'light': this.props.color === 'light',
            'minHeight': this.props.hasMinHeight
        };
    },

    getDefaultProps: function() {
        return {
            component: React.DOM.input,
            color: 'dark',
            size: 'normal'
        };
    },

    componentDidUpdate: function() {
        var formLink = this.props.formLink;
        if (formLink.hasFormError && formLink.isFirstError) {
            this.scrollIntoViewIfNeeded();
        }
    },

    componentDidMount: function() {
        this.props.formLink.requestInit();

        if (this.props.autofill) {
            this._syncWithAutofillInterval = window.setInterval(this.syncWithAutofill, 20);
        }
    },

    componentWillUnmount: function() {
        if (this.props.autofill) {
            window.clearInterval(this._syncWithAutofillInterval);
        }
    },

    syncWithAutofill: function() {
        if (!this.isMounted() || !this.props.autofill) {
            return;
        }

        var formLink = this.props.formLink,
            value = this.refs.input.getDOMNode().value;

        if (formLink.value !== value) {
            this.handleChange(value);
            return true;
        }
    },

    render: function() {
        var Component = this.props.component,
            value = this.props.formLink.value || '';

        // Empty string value prevents browser autofill
        if (this.props.autofill && value === '') {
            value = undefined;
        }

        return (
            Component({
                className: this.getClassName(),
                ref: "input",
                name: this.props.name,
                extraLineCount: 0,
                readOnly: this.props.readOnly,
                type: this.props.type,
                onFocus: this.handleFocus,
                onBlur: this.handleBlur,
                onKeyUp: this.props.onKeyUp,
                onChange: this.handleChange,
                value: value,
                placeholder: this.props.placeholder
            })
        );
    },

    handleChange: function(e) {
        this.setState({
            hasEdited: true
        });

        var value;
        if (e instanceof SyntheticEvent) {
            value = e.target.value;
        } else {
            value = e;
        }

        this.props.formLink.requestChange(value);
    },

    handleFocus: function(e) {
        this.setState({
            focus: true
        });

        this.props.formLink.requestFocus({
            hasEdited: this.state.hasEdited
        });

        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    },

    handleBlur: function(e) {
        if (this.props.autofill) {
            this.syncWithAutofill();
        }

        this.setState({
            focus: false
        });

        this.props.formLink.requestBlur();

        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    },

    scrollIntoViewIfNeeded: function() {
        var inputEl = this.refs.input.getDOMNode();

        if (_.isFunction(inputEl.scrollIntoViewIfNeeded)) {
            inputEl.scrollIntoViewIfNeeded();
        }
    },

    focus: function() {
        if (_.isFunction(this.refs.input.focus)) {
            this.refs.input.focus();
        } else {
            this.refs.input.getDOMNode().focus();
        }
    }
});

module.exports = FormInput;
