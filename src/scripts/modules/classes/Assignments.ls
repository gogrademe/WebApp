{}= require 'react'



Panel = require("../../components/Panel.ls")
RoutingContextMixin = require("rrouter").RoutingContextMixin
Fluxxor = require("fluxxor")
FluxChildMixin = Fluxxor.FluxChildMixin(React)
ClassAssignments = React.createClass(
  displayName: "ClassAssignments"
  mixins: [
    RoutingContextMixin
    FluxChildMixin
  ]
  render: ->
    Panel hasBody: true title: "Assignments" className: "content-area",
      "Detail page!"
)
module.exports = ClassAssignments
