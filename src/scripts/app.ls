require! {
  'react': React
  './components/Header.ls': HeaderNav
  './api/api.ls'
  './api/auth.ls'
}

if process.env.NODE_ENV is not "production"
  api.base-url = 'http://localhost:5005'
  #api.base-url = 'http://10.55.206.122:5005/api'

if process.env.NODE_ENV is "production"
  api.base-url = 'http://api.gogrademe.com'

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
