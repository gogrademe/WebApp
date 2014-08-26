require! {
  React: 'react'
  './components/Sidebar.ls'
  './api/api.ls'
  './api/auth.ls'
}

if process.env.NODE_ENV is not "production"
  api.base-url = 'http://localhost:5005/api'

Dom = React.DOM
{div} = Dom

App = React.create-class do
  displayName: "App"

  logged-in: ->
    if api.auth.token then Sidebar {}

  render: ->
    div {},
      @logged-in {}
      div {},
        @props.active-route-handler! || "Loading..."

module.exports = App
