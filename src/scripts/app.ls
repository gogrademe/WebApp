require! {
  React
  Router: "react-router"
  './components/Sidebar.ls'
  EventEmitter2.EventEmitter2
  './api/api.ls'
  './api/auth.ls'
}

window.events = new EventEmitter2!

unless process.env.NODE_ENV == "production"
  api.base-url = 'http://localhost:5005/api'

Dom = React.DOM
{div} = Dom

App = React.create-class do
  displayName: "App"

  logged-in: ->
    if auth.is-logged-in! then Sidebar null

  render: ->
    div null,
      @logged-in null
      div null,
        @props.activeRoute! || "Loading..."

module.exports = App
