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

FluxChildMixin = Fluxxor.FluxChildMixin(React)

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
