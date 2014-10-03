require! {
  React: 'react'
  Header: "../components/PageHeader.ls"
  "../components/SemanticModal.ls"
}

{div, h2} = React.DOM
DashboardModule = React.create-class do
  displayName: "DashboardModule"
  render: ->
    div null,
      Header primary: 'Dashboard'
      div class-name: "main container",
        div class-name: "ui center aligned segment",
          h2 class-name:"ui header",
            "Welcome to the test version of Cunae Gradebook."

module.exports = DashboardModule
