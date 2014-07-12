require! {
  React
  #Link: './HighlightedLink.ls'
  Router: "react-nested-router"
  Bootstrap: 'react-bootstrap'
}

{DropdownButton, MenuItem, Nav} = Bootstrap

Dom = React.DOM
{div, h1,h4, img, span, ul, a, i, button, strong} = Dom

HeaderNav = React.create-class do
  displayName: "HeaderNav"
  render: ->
    div class-name: "ui teal inverted menu",
      div class-name: "container",
        div class-name: "title item",
          @props.title

module.exports = HeaderNav
