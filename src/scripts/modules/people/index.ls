require! {
  React: 'react'
  Router: "react-router"

  "../../components/Panel.ls"

  "../../api/api.ls"
}

Route = Router.Route

Split = React.create-class do
  displayName: "Split"

  render: ->
    div className: "two-col",
      @props.detailView

module.exports =
  List:   require './list.ls'
  Detail: require './detail.ls'
