"use strict";

var React = require('react');

var Formsy = require('formsy-react');

var FormGroup = React.createClass({
    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    // Add a map to store the inputs of the form, a model to store
    // the values of the form and register child inputs
    componentWillMount: function () {
      this.inputs = {};
      this.model = {};
      this.registerInputs(this.props.children);
    },
    // Traverse the children and children of children to find
    // all inputs by checking the name prop. Maybe do a better
    // check here
    registerInputs: function (children) {
      React.Children.forEach(children, function (child) {

        if (child.props && child.props.name) {
          child.props._attachToForm = this.attachToForm;
          child.props._detachFromForm = this.detachFromForm;
          // child.props._validate = this.validate;
        }

        if (child.props && child.props.children) {
          this.registerInputs(child.props.children);
        }

      }.bind(this));
    },
    getCurrentValues: function () {
      return Object.keys(this.inputs).reduce(function (data, name) {
        var component = this.inputs[name];
        data[name] = component.state._value;
        return data;
      }.bind(this), {});
    },

    // Goes through all registered components and
    // updates the model values
    updateModel: function () {
      Object.keys(this.inputs).forEach(function (name) {
        var component = this.inputs[name];

        if (!!component.updateModel) {
          component.updateModel();
        }
        console.log(component);
        this.model[name] = component.state._value;
      }.bind(this));

      this.setValue(this.model);
    },
    // Method put on each input component to register
    // itself to the form
    attachToForm: function (component) {
      this.inputs[component.props.name] = component;
      this.model[component.props.name] = component.state._value;
    },

    // Method put on each input component to unregister
    // itself from the form
    detachFromForm: function (component) {
      delete this.inputs[component.props.name];
      delete this.model[component.props.name];
    },
    render: function () {

      var {children, ...props} = this.props;
      return (
        <div {...props}>
          {children}
        </div>
      );
    }
  });

module.exports = FormGroup;
