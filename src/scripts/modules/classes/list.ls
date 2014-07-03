
require! {
  React
}

{div, div, div, div, div, h3, div, div}= require 'react'






rows = (start, end) ->
  rows = []
  i = start

  while i < end
    rows.push id: i className: "Class Name " + i gradeLevel: "Grade Level " + i teacherName: "Teacher Name " + i

    i++
  rows

Panel = require("../../components/Panel.ls")
RoutingContextMixin = require("rrouter").RoutingContextMixin
Link = require("rrouter").Link
Fluxxor = require("fluxxor")
FluxChildMixin = Fluxxor.FluxChildMixin(React)
StoreWatchMixin = Fluxxor.StoreWatchMixin
Grid = require("react-grid")
CreateClassModal = require("./CreateClassModal.ls")
Button = require("react-bootstrap/button")
ModalTrigger = require("react-bootstrap/modaltrigger")
LinkCell = React.createClass(
  displayName: "LinkCell"
  render: ->
    div null, Link(
      to: "detail/home"
      currentClass: @props.value
    , @props.value, " ")
)
columns = [
  {
    name: "Id"
    width: "20%"
    key: "id"
  }
  {
    name: "Class Name"
    width: "20%"
    key: "className"
    renderer: LinkCell
  }
  {
    name: "Grade Level"
    width: "20%"
    key: "gradeLevel"
  }
  {
    name: "Teacher"
    width: "40%"
    key: "teacherName"
  }
]
ClassList = React.createClass(
  displayName: "ClassList"
  mixins: [
    RoutingContextMixin
    FluxChildMixin
    StoreWatchMixin "ClassesStore"
  ]
  componentWillMount: ->
    flux = @getFlux!
    flux.actions.getAllClasses()
    return

  getStateFromFlux: ->
    flux = @getFlux!
    Classes: flux.store("ClassesStore").getState()

  render: ->
    div className: "content-area panel panel-default",
      div className: "panel-heading clearfix",
        div className: "row",
          div className: "col-sm-4",
            h3 className: "panel-title",
              "All Classes"
          div className: "col-sm-8 text-align-right"
            div className: "btn-group pull-right"
              ModalTrigger modal: CreateClassModal flux: @getFlux!,
                  Button bsStyle: "primary" bsSite: "small",
                    "Add"
        Grid length: 10000 columns: columns rows: rows rowHeight: 40

)
module.exports = ClassList
