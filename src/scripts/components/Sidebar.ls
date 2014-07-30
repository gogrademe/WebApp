require! {
  React
  Link: './HighlightedLink.ls'
  Router: "react-nested-router"
  select: "./src/modules/Dropdown.ls"
}

Dom = React.DOM
{div, a, i} = Dom


Sidebar = React.create-class do
  displayName: "Sidebar"
  options: ->
    [
      * text: "Test",
      * text: "Test Two"
    ]

  render: ->
    div class-name: "ui sidebar vertical purple floating inverted thin menu active",
      div class-name: "header item",
        "Cunae Gradebook"
      Link class-name: "item" to: "dashboard",
        i class-name:"home icon"
        " Home"
      Link class-name: "item" to: "class",
        "Classes"
      Link class-name: "item" to: "people",
        "People"
      div class-name: "header item",
        "School"
      Link class-name: "item" to: "school.settings",
        "Settings"
      div class-name: "header item",
        "Matt Aitchison"
      a class-name:"item",
        "Settings"
      a class-name:"item",
        "Logout"


module.exports = Sidebar
