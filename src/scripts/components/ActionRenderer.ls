require! {
  React: 'react'
  Router: "react-router"
}

Dom = React.DOM
{div, i} = Dom

Link = Router.Link

ActionRenderer = React.create-class do
  render: ->
    lnk = @props.column.link-to
    div class-name: "3 fluid ui icon buttons small",
      Link to: "#lnk.detail", resourceId: @props.row.id, class-name: "ui button",
        i class-name:"icon info"
      Link to: "#lnk.detail", resourceId: @props.row.id, class-name: "ui button",
        i class-name:"icon edit"
      Link to: "#lnk.detail", resourceId: @props.row.id, class-name: "ui button",
        i class-name:"icon trash"
module.exports = ActionRenderer
