require! {
  React: 'react'
  './components/Sidebar.ls'
  './api/api.ls'
  './api/auth.ls'
}

if process.env.NODE_ENV is not "production"
  api.base-url = 'http://10.0.0.7:5005/api'

Dom = React.DOM
{div} = Dom

App = React.create-class do
  displayName: "App"

  logged-in: ->
    if api.session.get! then Sidebar {}

  render: ->
    div class-name: "pushed",
      @logged-in {}
      div class-name: "page",
        @props.active-route-handler! || "Loading..."

module.exports = App
