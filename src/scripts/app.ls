require! {
  React
  Router: "react-nested-router"
  './components/Sidebar.ls'

  './api/api.ls'
  './api/auth.ls'
}
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
        @props.activeRoute || "Loading..."

module.exports = App
