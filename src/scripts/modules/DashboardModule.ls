require! {
  React: 'react'
  Header: "../components/PageHeader.ls"
  "../components/SemanticModal.ls"
}

{div, h3, h2, span} = React.DOM
DashboardModule = React.create-class do
  displayName: "DashboardModule"
  render-item: ({header, time, description, author})->
    div class-name: "item",
      div class-name: "content",
        div class-name: "header",
          header
        div class-name: "meta",
          span class-name: "author",
            "#author,"
          span class-name: "time",
            time
        div class-name: "description",
          description

  render: ->
    div null,
      Header primary: 'Dashboard'
      div class-name: "main container",
        div class-name: "ui segment",
          h3 class-name: "ui dividing header",
            "Announcements"
          div class-name: "ui items",
            @render-item do
              header: "New Version!"
              time: "Yesterday"
              description: "Major Changes: theme"
              author: "Matt Aitchison"
            @render-item do
              header: "Grade Grid View"
              time: "Yesterday"
              description: "Grade inputs have been removed to prevent accidental changes."
              author: "Matt Aitchison"




module.exports = DashboardModule
