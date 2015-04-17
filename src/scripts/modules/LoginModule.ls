require! {
  'react': React
  "react-router": {Router, Navigation}

  "../components/Panel"
  "../api/auth.ls"
}
Dom = React.DOM
{form, div, span, i, input, button, h2, li, ul, h4, img} = Dom

LoginPage = React.create-class do
  displayName: "LoginPage"
  mixins: [Navigation]
  get-initial-state: ->
    error: null
    is-logging-in: false

  handleSubmit: (e) !->
    e.preventDefault!
    @setState isLoggingIn: true
    email = @refs.email.getDOMNode().value.trim!
    password = @refs.password.getDOMNode().value.trim!

    auth.login email: email, password: password
      .then ~>
        @transitionTo('dashboard')
      .error ~>
        @set-state do
          is-logging-in: false
          error: it

  #component-will-mount: ->
  #  if auth.isLoggedIn! then @replaceWith('dashboard')

  render-messages: ->
    if @state.error is not null
      div class-name: "ui error visible message",
        "#{@state.error.status-code}: #{@state.error.message}"

  render: ->
    div class-name:"login container",
      img className:"logo" src:"logo.svg"
      div null,
        form className: "ui fluid form segment" onSubmit: @handleSubmit,
          h4 class-name: "ui header",
            "Login"
          @render-messages!
          div className: "field",
            div class-name: "ui right labeled left icon input",
              input do
                type: "email"
                placeholder: "Email Address"
                ref: "email"
                required: true
              i class-name: "user icon"
              div class-name: "ui corner label",
                i class-name: "icon asterisk"
          div className: "field",
            div class-name: "ui right labeled left icon input",
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
              className: "ui primary fluid submit button"
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
