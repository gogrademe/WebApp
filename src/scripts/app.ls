require! {
  React: 'react'
  HeaderNav: './components/Header.ls'
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
    if api.session.get! then
      HeaderNav {}

  render: ->
    div null,
      @logged-in {}
      div class-name: "page",
        div class-name: "full height",
          @props.active-route-handler! || "Loading..."

module.exports = App
