{div, div}= require 'react'

AppCfg = apiUrl: "http://localhost:5000/api"

cloneWithProps = require("react/lib/cloneWithProps")

# RRouter
RRouter = require("rrouter")
RoutingContextMixin = RRouter.RoutingContextMixin

#Fluxxor
Fluxxor = require("fluxxor")
FluxMixin = Fluxxor.FluxMixin(React)
FluxChildMixin = Fluxxor.FluxChildMixin(React)
StoreWatchMixin = Fluxxor.StoreWatchMixin

# Stores
require! {
  AuthStore: "./core/stores/AuthStore"
  actions: "./core/actions/AuthActions"
  ClassesStore: "./core/stores/ClassesStore"
  PeopleStore: "./core/stores/PeopleStore"
}

stores =
  AuthStore: new AuthStore()
  ClassesStore: new ClassesStore()
  PeopleStore: new PeopleStore()

AppRoutes = require("./routes")
flux = new Fluxxor.Flux(stores, actions)
Header = require("./components/Header")
App = React.createClass(
  displayName: "App"
  mixins: [
    FluxMixin
    StoreWatchMixin("AuthStore")
    RoutingContextMixin
  ]
  getStateFromFlux: ->
    flux = @getFlux()
    Auth: flux.store("AuthStore").getState()

  render: ->
    path = @getRouting().path

    # Handle login/logged out cases.
    unless @state.Auth.isLoggedIn
      @navigate "/login"
    else if path is "/login"
      @navigate "/dashboard"
    else @navigate "/dashboard"  if path is "/"

    # This is needed to pass the current context to the View.
    View = cloneWithProps(@props.view, {})
    div null, Header(
      currentUser: @state.Auth.currentUser
      isLoggedIn: @state.Auth.isLoggedIn
    ), div(
      className: "container"
    , View)
)
RRouter.start AppRoutes, (view) ->
  React.renderComponent App(
    view: view
    flux: flux
  ), document.getElementById("app")
  return
