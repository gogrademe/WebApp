require! {
  'react': React
  "react-router": Router

  "../api/api.ls"
  "../components/Header.ls"
}

{div, h2} = React.DOM
LogoutModule = React.create-class do
  displayName: "LogoutModule"
  component-did-mount: ->
    api.session.del!
      .then ~>
        Router.replace-with "/login"

  render: ->
    div null,
      Header title: "Logging Out..."
      div class-name: "main",
        div class-name: "ui grid",
          div class-name: "column",
            div class-name: "ui segment",
              h2 class-name:"ui center aligned header",
                "Logging out..."

module.exports = LogoutModule
