require! {
  React: 'react'
  HeaderNav: './components/Header.ls'
  './api/api.ls'
  './api/auth.ls'
}

if process.env.NODE_ENV is not "production"
  api.base-url = 'http://192.168.1.68:5005/api'

if process.env.NODE_ENV is "production"
  api.base-url = 'http://api.gogrademe.com/api'

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
