require! {
  React
}
Dom = React.DOM
{form, div, span, i, input, button} = Dom


Panel = require("../components/Panel.ls")
Fluxxor = require("fluxxor")
FluxChildMixin = Fluxxor.FluxChildMixin(React)
StoreWatchMixin = Fluxxor.StoreWatchMixin
LoginPage = React.create-class do
  displayName: "LoginPage"
  mixins: [
    FluxChildMixin
    StoreWatchMixin("AuthStore")
  ]
  getStateFromFlux: ->
    flux = @getFlux!
    AuthStore: flux.store("AuthStore").getState!

  handleSubmit: (e) ->
    flux = @getFlux()
    @setState isLoggingIn: true
    e.preventDefault()
    email = @refs.email.getDOMNode().value.trim!
    password = @refs.password.getDOMNode().value.trim!

    # AuthActions.login(email, password);
    flux.actions.loginAuth email, password
    return

  render: ->
    Panel className: "form-login" title: "Login" hasBody: true,
      form className: "form-horizontal" onSubmit: @handleSubmit,
        div className: "input-group field",
          span className: "input-group-addon",
            i className: "fa fa-user fa-fw"
          input do
            type: "text"
            className: "form-control"
            placeholder: "Email Address"
            ref: "email"
            required: true
        div className: "input-group field",
          span className: "input-group-addon",
            i className: "fa fa-lock fa-fw"
          input do
            type: "password"
            className: "form-control"
            placeholder: "Password"
            ref: "password"
            required: true
        div className: "field",
          button do
            type: "submit"
            disabled: @state.isLoggingIn
            role: "button"
            className: "btn btn-primary btn-block"
            value: "Post",
            LoginLoading isLoggingIn: @state.isLoggingIn
            "Log in"


LoginLoading = React.create-class do
  displayName: "LoginLoading"
  render: ->
    style = {}
    style.display = "none"  if not @props.isLoggingIn is true
    return
      i do
        className: "fa fa-cog fa-spin"
        style: style

module.exports = LoginPage
