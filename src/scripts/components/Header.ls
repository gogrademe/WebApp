require! {
  React
  #Link: './HighlightedLink.ls'
  Router: "react-nested-router"
  Bootstrap: 'react-bootstrap'
}

{DropdownButton, MenuItem, Nav} = Bootstrap

Dom = React.DOM
{div, h1,h4, img, span, ul, a, i, button} = Dom

Link = Router.Link
HeaderBar = React.create-class do
  displayName: "HeaderBar"
  render: ->
    div class-name: "ui teal inverted large block header fixed center aligned brand",
      img src: "/assets/img/lanciv-logo-no-text.svg"
      h4 class-name: "",
        "Cunae Gradebook"

HeaderNav = React.create-class do
  displayName: "HeaderNav"
  render: ->
    userTitle =
      span null,
        i className: "fa fa-user fa-fw",
          @props.currentUser.Email
#ui fixed transparent inverted main menu
    #div class-name: "ui teal inverted large menu fixed",
    div class-name: "ui fixed teal transparent inverted main menu",
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
        div class-name: "right menu",
          "Test"

Header = React.create-class do
  displayName: "Header"
  propTypes:
    currentUser: React.PropTypes.object.isRequired
    isLoggedIn: React.PropTypes.bool.isRequired

  render: ->
    if @props.isLoggedIn then
      HeaderNav currentUser: @props.currentUser
    else
      HeaderBar null

module.exports = Header
