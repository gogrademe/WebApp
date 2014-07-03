require! {
  React
  Fluxxor

  Bootstrap: "react-bootstrap"
  ReactForms: "react-forms"

  Header: "../../components/Header.ls"
  Link: "../../components/HighlightedLink.ls"
  ModalMixin: "../../components/ModalMixin.ls"

}

{Modal, Alert,Button, Nav} = Bootstrap

Dom = React.DOM
{div} = Dom


Schema = ReactForms.schema.Schema
Property = ReactForms.schema.Property
Form = ReactForms.Form
FormFor = ReactForms.FormFor

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
