require! {
  React
  Router: "react-nested-router"
}

Dom = React.DOM
{div, h1, img, span, ul,li, a, i, button} = Dom

Link = Router.Link

ActionRenderer = React.create-class do
  render: ->
    lnk = @props.column.link-to
    div class-name: "btn-group btn-group-sm",
      Link to: "#lnk.detail", resourceId: @props.row.id, class-name: "btn btn-default",
        "Detail"
      Link to: "#lnk.detail", resourceId: @props.row.id, class-name: "btn btn-default",
        "Edit"
      Link to: "#lnk.detail", resourceId: @props.row.id, class-name: "btn btn-default",
        "Delete"

module.exports = ActionRenderer
