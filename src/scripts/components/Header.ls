require! {
  React
  #Link: './HighlightedLink.ls'
  Router: "react-nested-router"
  Bootstrap: 'react-bootstrap'
  AppState: '../core/AppState.ls'
}

{DropdownButton, MenuItem, Nav} = Bootstrap

Dom = React.DOM
{div, h1,h4, img, span, ul, a, i, button, strong} = Dom

/*Link = Router.Link
HeaderBar = React.create-class do
  displayName: "HeaderBar"
  render: ->
    div class-name: "ui teal inverted large block header fixed center aligned brand",
      img src: "/assets/img/lanciv-logo-no-text.svg"
      h4 class-name: "",
        "Cunae Gradebook"*/

HeaderNav = React.create-class do
  displayName: "HeaderNav"
  render: ->
    div class-name: "ui teal inverted menu",
      div class-name: "container",
        div class-name: "title item",
          @props.title



module.exports = HeaderNav
