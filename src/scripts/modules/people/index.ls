require! {
  React
  RRouter

  "../../components/Panel.ls"

  "../../api/api.ls"
}


{div}= require 'react'

Routes = RRouter.Routes
Route = RRouter.Route
RoutingContextMixin = RRouter.RoutingContextMixin
/*Fluxxor = require("fluxxor")*/
/*FluxMixin = Fluxxor.FluxMixin(React)*/
Split = React.createClass(
  displayName: "Split"
  componentWillMount: !->
    #unless @props.detailView
    #  @navigate @props.currentClass + "/home",
    #    replace: true

  render: ->
    div className: "two-col",
      @props.detailView
)
DetailModule = require("./detail.ls")
ListModule = require("./list.ls")
module.exports = (props) ->
  Route path: "/" view: ListModule,
    #Route name: "home" path: ":person" view: DetailModule
