require! {
  React: 'react'
  '../api/api.ls'
}

Dom = React.DOM
{div, h2} = Dom

SignedIn = React.create-class do
  statics:
    willTransitionTo: (transition, params) ->
      if !api.auth.token
        transition.redirect('/login')

  render: ->
    div null,
      @props.active-route-handler!

module.exports = SignedIn
