require! {
  React
  Router: "react-nested-router"

  "../../components/Panel.ls"

  "../../api/api.ls"
}

Route = Router.Route

/*Fluxxor = require("fluxxor")*/
/*FluxMixin = Fluxxor.FluxMixin(React)*/
Split = React.create-class do
  displayName: "Split"
  componentWillMount: !->
    #unless @props.detailView
    #  @navigate @props.currentClass + "/home",
    #    replace: true

  render: ->
    div className: "two-col",
      @props.detailView


module.exports =
  List: require './list.ls'
  Detail: require './detail.ls'
