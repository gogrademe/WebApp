require! {
  React: 'react'
  "../components/Header.ls"
}

{div, h2} = React.DOM
DashboardModule = React.create-class do
  displayName: "DashboardModule"
  render: ->
    div null,
      Header title: "Dashboard"
      div class-name: "main",
        div class-name: "ui grid",
          div class-name: "column",
            div class-name: "ui segment",
              h2 class-name:"ui center aligned header",
                "Welcome to the test version of Cuane Gradebook."

module.exports = DashboardModule
