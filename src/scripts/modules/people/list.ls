{div, div, div, div, div, div, h3, div, div}= require 'react'






"use strict"

Panel = require("../../components/Panel.ls")
RoutingContextMixin = require("rrouter").RoutingContextMixin
Link = require("rrouter").Link
Fluxxor = require("fluxxor")
FluxChildMixin = Fluxxor.FluxChildMixin(React)
StoreWatchMixin = Fluxxor.StoreWatchMixin
Grid = require("react-grid")
CreatePersonModal = require("./CreatePersonModal.ls")
Button = require("react-bootstrap/button")
ModalTrigger = require("react-bootstrap/modaltrigger")
LinkCell = React.createClass(
  displayName: "LinkCell"
  render: ->
    div null, Link(
      to: "home"
      person: @props.value
    , @props.value, " ")
)
ActionsCell = React.createClass(
  displayName: "ActionsCell"
  render: ->
    div null, Button(
      bsStyle: "link"
    , "Detail"), Button(
      bsStyle: "link"
    , "Edit"), Button(
      bsStyle: "link"
    , "Delete")
)
columns = [
  {
    name: "Id"
    key: "id"
    width: 30
    renderer: LinkCell
  }
  {
    name: "First Name"
    key: "firstName"
  }
  {
    name: "Middle Name"
    key: "middleName"
  }
  {
    name: "Last Name"
    key: "lastName"
  }
  {
    name: "Type"
    key: "teacher"
  }
  {
    name: "Actions"
    renderer: ActionsCell
  }
]
PeopleList = React.createClass(
  displayName: "PeopleList"
  mixins: [
    RoutingContextMixin
    FluxChildMixin
    StoreWatchMixin("PeopleStore")
  ]
  componentWillMount: ->
    flux = @getFlux!
    flux.actions.getAllPeople!
    return

  getStateFromFlux: ->
    flux = @getFlux!
    People: flux.store("PeopleStore").getState()

  render: ->
    flux = @getFlux!
    div title: "All Classes" className: "content-area panel panel-default",
     div className: "panel-heading clearfix",
      div className: "row",
        div className: "col-sm-4",
          h3 className: "panel-title",
            "All People"
        div className: "col-sm-8 text-align-right",
          div className: "btn-group pull-right",
            ModalTrigger modal: CreatePersonModal(flux: flux),
              Button bsStyle: "primary" bsSite: "small",
                "Add"
        Grid length: @state.People.length columns: columns rows: @state.People rowHeight: 40
)
module.exports = PeopleList
