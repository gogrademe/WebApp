require! {
  'react': React

  "react-router": Router

  '../api/api.ls'
  '../api/auth.ls'
}

Dom = React.DOM
{div} = Dom

{ActiveState} = Router

SignedIn = React.create-class do
  statics:
    willTransitionTo: (transition, params) ->
      if !api.auth.token
        transition.redirect('/login')

  mixins: [ActiveState]
  get-initial-state: ->
    person: {}

  updateActiveState: ->
    if !api.session.get!
      Router.replace-with('/login')

  render: ->
    div null,
      @props.active-route-handler!

module.exports = SignedIn
