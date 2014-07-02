{div}= require 'react'







RRouter = require("rrouter")
Panel = require("../../components/Panel")
Routes = RRouter.Routes
Route = RRouter.Route
RoutingContextMixin = RRouter.RoutingContextMixin
Fluxxor = require("fluxxor")
FluxMixin = Fluxxor.FluxMixin(React)
Split = React.createClass(
  displayName: "Split"
  mixins: [
    RoutingContextMixin
    FluxMixin
  ]
  componentWillMount: ->
    unless @props.detailView
      @navigate @props.currentClass + "/home",
        replace: true

    return

  render: ->
    div
      className: "two-col"
    , @props.detailView
)
DetailModule = require("./detail")
ListModule = require("./list")
module.exports = (props) ->
  2
  props = props or null
  Routes
    path: "/"
    view: ListModule
  , Route(
    name: "home"
    path: ":person"
    view: DetailModule
  )