{div, div}= require 'react'
 


Modal = require("react-bootstrap/modal")
Alert = require("react-bootstrap/alert")
Button = require("react-bootstrap/button")
ReactForms = require("react-forms")
Schema = ReactForms.schema.Schema
Property = ReactForms.schema.Property
Form = ReactForms.Form
FormFor = ReactForms.FormFor
ModalMixin = require("../../components/ModalMixin")

# var LaddaButton = require('react-ladda');
PersonSchema = (Schema(null, Property(
  name: "firstName"
  label: "First Name"
), Property(
  name: "middleName"
  label: "Middle Name"
), Property(
  name: "lastName"
  label: "Last Name"
)))
CreatePersonModal = React.createClass(
  displayName: "CreatePersonModal"
  mixins: [ModalMixin("PeopleStore")]
  saveChanges: ->
    formVals = @refs.form.valueLens().val()
    if formVals
      @props.flux.actions.addPerson formVals
      @modalSaving()
    return

  render: ->
    @transferPropsTo Modal(
      title: "Create Person"
      animation: true
    , div(
      className: "modal-body"
    , @errorAlerts(), Form(
      ref: "form"
      className: "form-horizontal"
      schema: PersonSchema
      onSubmit: @saveChanges
    )), div(
      className: "modal-footer"
    , Button(
      bsStyle: "danger"
      onClick: @props.onRequestHide
    , "Cancel"), Button(
      bsStyle: "primary"
      onClick: @saveChanges
      disabled: @state.isSaving
    , "Save")))
)
module.exports = CreatePersonModal