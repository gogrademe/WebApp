require! {
  React: 'react'
  Router: "react-router"
  select: "./src/modules/Dropdown.ls"

  '../api/api.ls'
  '../api/auth.ls'
}

Dom = React.DOM
{div, i, a} = Dom


Link = Router.Link


/*MenuLink = ({to} ...children) ->
  Link class-name: "item", to: to,
    children
    #Put Children Here?*/

HeaderNav = React.create-class do
  displayName: "HeaderNav"
  user-display-name: ->
    "#{@state.person.firstName} #{@state.person.lastName}"

  component-will-mount: ->
    person-id = auth.current-user!.person-id
    if person-id then
      api.person.get person-id
        .then ~>
          @set-state person: it

  get-initial-state: ->
    person: {}

  render: ->
    div class-name: "ui fixed blue inverted main menu",
      div class-name: "container",
        div class-name: "title item",
          "GoGradeMe"
        Link class-name: "item" to: "dashboard",
          i class-name:"dashboard icon"
          " Dashboard"
        Link class-name: "item" to: "class",
          "Classes"
        Link class-name: "item" to: "people",
          i class-name:"users icon"
          "People"
        Link class-name: "item" to: "school.settings",
          "School Settings"
        Link class-name: "item" to: "setup",
          "App Setup"
        div class-name: "right menu",
          div class-name: "item",
            @user-display-name!
          Link class-name:"item" to: "logout",
            "Logout"


module.exports = HeaderNav
