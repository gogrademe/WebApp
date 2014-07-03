require! {
  React
  cloneWithProps: "react/lib/cloneWithProps"

  RRouter
  Fluxxor

  AuthStore: "./core/stores/AuthStore.ls"
  actions: "./core/actions/AuthActions.ls"
  ClassesStore: "./core/stores/ClassesStore.ls"
  PeopleStore: "./core/stores/PeopleStore.ls"

  AppRoutes: "./routes.ls"

  Header: "./components/Header.ls"
}

Dom = React.DOM
{div} = Dom






RoutingContextMixin = RRouter.RoutingContextMixin


FluxMixin = Fluxxor.FluxMixin(React)
FluxChildMixin = Fluxxor.FluxChildMixin(React)
StoreWatchMixin = Fluxxor.StoreWatchMixin

stores =
  AuthStore: new AuthStore()
  ClassesStore: new ClassesStore()
  PeopleStore: new PeopleStore()


flux = new Fluxxor.Flux(stores, actions)

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
