/** @jsx React.DOM */

'use strict';
var React = require('react');
var Panel = require('../../components/Panel.jsx');
var RoutingContextMixin = require('rrouter').RoutingContextMixin;

var Fluxxor = require('fluxxor');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var ReactForms = require('react-forms');
var Schema    = ReactForms.schema.Schema;
var Property  = ReactForms.schema.Property;
var Form      = ReactForms.Form;
var FormFor = ReactForms.FormFor;

var SpecialFieldset = React.createClass({
  mixins: [ReactForms.FieldsetMixin],

  render: function() {
    return (
      <div>
        <FormFor name="name" />
        <FormFor name="lastName" />
        <FormFor name="age" />
      </div>
    );
  }
});

var PersonSchema = (
    <Schema component={SpecialFieldset}>
      <Property name="name"
        label="First name" />
      <Property name="lastName"
        label="Last name" />
      <Property name="age" type="number"
        label="Age" />
    </Schema>
  );


var ClassSettings = React.createClass({
  mixins: [RoutingContextMixin, FluxChildMixin],
  render: function() {
    return (
        <Panel hasBody title="Settings" className="content-area">
          <Form className="form-horizontal" schema={PersonSchema} />
        </Panel>
    );
  }
});

module.exports = ClassSettings;
