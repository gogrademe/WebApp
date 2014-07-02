{div}= require 'react'






"use strict"

Panel = require("../../components/Panel.jsx")
RoutingContextMixin = require("rrouter").RoutingContextMixin
Fluxxor = require("fluxxor")
FluxChildMixin = Fluxxor.FluxChildMixin(React)
ReactForms = require("react-forms")
Schema = ReactForms.schema.Schema
Property = ReactForms.schema.Property
Form = ReactForms.Form
FormFor = ReactForms.FormFor
SpecialFieldset = React.createClass(
  displayName: "SpecialFieldset"
  mixins: [ReactForms.FieldsetMixin]
  render: ->
    div null, FormFor(name: "name"), FormFor(name: "lastName"), FormFor(name: "age")
)
PersonSchema = (Schema(
  component: SpecialFieldset
, Property(
  name: "name"
  label: "First name"
), Property(
  name: "lastName"
  label: "Last name"
), Property(
  name: "age"
  type: "number"
  label: "Age"
)))
ClassSettings = React.createClass(
  displayName: "ClassSettings"
  mixins: [
    RoutingContextMixin
    FluxChildMixin
  ]
  render: ->
    Panel
      hasBody: true
      title: "Settings"
      className: "content-area"
    , Form(
      className: "form-horizontal"
      schema: PersonSchema
    )
)
module.exports = ClassSettings