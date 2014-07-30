require! {
  React
  Router: "react-nested-router"

  "../components/Panel.ls"
  "../api/auth.ls"
}
Dom = React.DOM
{form, div, span, i, input, button, h2} = Dom

LoginPage = React.create-class do
  displayName: "LoginPage"
  get-initial-state: ->
    is-logging-in: false

  handleSubmit: (e) !->
    e.preventDefault!
    @setState isLoggingIn: true
    email = @refs.email.getDOMNode().value.trim!
    password = @refs.password.getDOMNode().value.trim!

    # AuthActions.login(email, password);
    #window.flux.actions.login email, password
    auth.login email: email, password: password
      .then ->
        Router.transitionTo('dashboard');
      .error ~>
        @set-state is-logging-in: false

  component-will-mount: ->
    if auth.isLoggedIn! then Router.replaceWith('dashboard')

  render: ->
    div class-name:"ui centered grid login form",
      h2 class-name:"ui header",
        "Cunae Gradebook"
      div class-name: "row",
        Panel class-name: "five wide column" title: "Login" hasBody: true,
          form className: "ui fluid form" onSubmit: @handleSubmit,
            div className: "field",
              div class-name: "ui left labeled icon input",
                input do
                  type: "text"
                  placeholder: "Email Address"
                  ref: "email"
                  required: true
                i class-name: "user icon"
                div class-name: "ui corner label",
                  i class-name: "icon asterisk"
            div className: "field",
              div class-name: "ui left labeled icon input",
                input do
                  type: "password"
                  placeholder: "Password"
                  ref: "password"
                  required: true
                i class-name: "lock icon"
                div class-name: "ui corner label",
                  i class-name: "icon asterisk"
            div className: "field",
              button do
                type: "submit"
                disabled: @state.isLoggingIn
                role: "button"
                className: "ui teal fluid submit button"
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
