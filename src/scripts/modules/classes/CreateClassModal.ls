require! {
  React
  Header: "../components/Header.ls"

  Link: "./HighlightedLink.ls"

  Bootstrap: "react-bootstrap"
}

{Modal, Button, Nav} = Bootstrap

{div, div}= require 'react'
 
Fluxxor = require("fluxxor")
FluxChildMixin = Fluxxor.FluxChildMixin(React)
ReactForms = require("react-forms")
Schema = ReactForms.schema.Schema
Property = ReactForms.schema.Property
Form = ReactForms.Form
FormFor = ReactForms.FormFor
PersonSchema = (Schema(null, Property(
  name: "className"
  label: "Class Name"
), Property(
  name: "gradeLevel"
  label: "Grade Level"
), Property(
  name: "teacher"
  label: "Teacher"
)))
ClassAssignments = React.createClass(
  displayName: "ClassAssignments"
  saveChanges: ->
    @props.flux.actions.addClass()
    return

  render: ->
    @transferPropsTo Modal(
      title: "Create Class"
      animation: true
    , div(
      className: "modal-body"
    , Form(
      className: "form-horizontal"
      schema: PersonSchema
    )), div(
      className: "modal-footer"
    , Button(
      bsStyle: "danger"
      onClick: @props.onRequestHide
    , "Cancel"), Button(
      bsStyle: "primary"
      onClick: @saveChanges
    , "Save changes")))
)
module.exports = ClassAssignments
