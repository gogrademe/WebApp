require! {
  React
  Fluxxor
  Router: "react-nested-router"

  AuthStore: "./core/stores/AuthStore.ls"
  ClassesStore: "./core/stores/ClassesStore.ls"
  PeopleStore: "./core/stores/PeopleStore.ls"

  actions: "./core/actions/AuthActions.ls"

  Header: "./components/Header.ls"
}

Dom = React.DOM
{div} = Dom

FluxMixin = Fluxxor.FluxMixin(React)
StoreWatchMixin = Fluxxor.StoreWatchMixin

stores =
  AuthStore: new AuthStore!
  ClassesStore: new ClassesStore!
  PeopleStore: new PeopleStore!


window.flux = new Fluxxor.Flux(stores, actions)

App = React.create-class do
  displayName: "App"
  mixins: [
    FluxMixin
    StoreWatchMixin("AuthStore")
  ]

  getDefaultProps: ->
    flux: window.flux

  getStateFromFlux: ->
    auth: flux.store("AuthStore").getState!

  navigate: ->
    console.log "tried to navigate to #it"

  render: ->
      div null,
        Header currentUser: @state.auth.current-user, isLoggedIn: @state.auth.isLoggedIn
        div className: "container",
          @props.activeRoute || "test"

module.exports = App
