require! {
  React: 'react'

  Router: "react-router"

  '../api/api.ls'
}

Dom = React.DOM
{div} = Dom

{ActiveState} = Router

SignedIn = React.create-class do
  statics:
    willTransitionTo: (transition, params) ->
      console.log "will-transition"
      if !api.auth.token
        transition.redirect('/login')

  mixins: [ActiveState]
  updateActiveState: ->
    if !api.session.get!
      Router.replace-with('/login')

  render: ->
    div null,
      @props.active-route-handler!

module.exports = SignedIn
