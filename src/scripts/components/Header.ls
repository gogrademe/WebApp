require! {
  React
  Router: "react-router"
}

Dom = React.DOM
{div} = Dom

HeaderNav = React.create-class do
  displayName: "HeaderNav"
  render: ->
    div class-name: "ui teal inverted menu",
      div class-name: "container",
        div class-name: "title item",
          @props.title
        div class-name: "right menu",
          @props.right


module.exports = HeaderNav
