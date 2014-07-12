require! {
  React
  Router: "react-nested-router"

  "../api/auth.ls"
}

Dom = React.DOM
{div, h2} = Dom

RootRedirect = React.create-class do
  component-will-mount: ->
    if auth.is-logged-in
      Router.transition-to 'dashboard'
    else
      Router.transition-to 'login'
  render: ->
    div null

module.exports = RootRedirect
