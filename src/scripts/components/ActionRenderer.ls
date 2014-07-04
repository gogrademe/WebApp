require! {
  React
  Router: "react-nested-router"
}

Dom = React.DOM
{div, h1, img, span, ul,li, a, i, button} = Dom

Link = Router.Link

ActionRenderer = React.create-class do
  render: ->
    div null,
      Link to: "detail", resourceId: @props.row.id,
        "Detail "
      Link to: "detail", resourceId: @props.row.id,
        "Edit "
      Link to: "detail", resourceId: @props.row.id,
        "Delete "

module.exports = ActionRenderer
