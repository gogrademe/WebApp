require! {
  React: 'react'
  Link: './HighlightedLink.ls'
  Router: "react-router"
  select: "./src/modules/Dropdown.ls"
}

Dom = React.DOM
{div, i, a} = Dom

HeaderNav = React.create-class do
  displayName: "HeaderNav"
  render: ->
    div class-name: "ui fixed teal inverted main menu",
      div class-name: "container",
        div class-name: "title item",
          "Cunae Gradebook"
        Link class-name: "item" to: "dashboard",
          i class-name:"home icon"
          " Home"
        Link class-name: "item" to: "class",
          "Classes"
        Link class-name: "item" to: "people",
          "People"
        div class-name: "item",
          "School"
        Link class-name: "item" to: "school.settings",
          "Settings"
        div class-name: "right menu",
          div class-name: "item",
            "Matt Aitchison"
          div class-name: "item",
            "Settings"
          Link class-name:"item" to: "logout",
            "Logout"


module.exports = HeaderNav
