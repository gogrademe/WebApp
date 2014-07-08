require! {
  React
  Fluxxor
  EventEmitter2.EventEmitter2
  Router: "react-nested-router"

  AuthStore: "./core/stores/AuthStore.ls"
  ClassesStore: "./core/stores/ClassesStore.ls"
  PeopleStore: "./core/stores/PeopleStore.ls"

  actions: "./core/actions/AuthActions.ls"

  Header: "./components/Header.ls"

  './api/api.ls'
}

Dom = React.DOM
{div} = Dom

FluxMixin = Fluxxor.FluxMixin(React)
StoreWatchMixin = Fluxxor.StoreWatchMixin

window.events = new EventEmitter2!
stores =
  AuthStore:    new AuthStore!
  ClassesStore: new ClassesStore!
  PeopleStore:  new PeopleStore!

window.flux = new Fluxxor.Flux(stores, actions)

App = React.create-class do
  displayName: "App"
  mixins:
    FluxMixin
    StoreWatchMixin("AuthStore")

  getDefaultProps: ->
    flux: window.flux

  getStateFromFlux: ->
    auth: flux.store("AuthStore").getState!

  render: ->
    div null,
      Header currentUser: @state.auth.current-user, isLoggedIn: @state.auth.isLoggedIn
      div className: "container",
        @props.activeRoute || "Loading..."

module.exports = App
