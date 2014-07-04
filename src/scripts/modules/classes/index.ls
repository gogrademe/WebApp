require! {
  React
  "../../api/api.ls"
}
Dom = React.DOM
{div} = Dom

/*RRouter = require("rrouter")
Routes = RRouter.Routes
Route = RRouter.Route
RoutingContextMixin = RRouter.RoutingContextMixin*/
Nav = require("./nav.ls")
Split = React.create-class do
  displayName: "Split"
  render: ->
    div class-name: "two-col",
      console.log "test"
      Nav class-name: "sidebar-nav"
      @props.activeRoute


/*ClassDetail = require("./detail.ls")
ClassList = require("./list.ls")
ClassAssignments = require("./Assignments.ls")
ClassSettings = require("./Settings.ls")*/
#module.exports = (props) ->
#  props = props or null
#  Routes path: "/" view: ClassList,
#    Routes view: Split name: "detail" path: ":currentClass",
#      Route name: "home" path: "home" detailView: ClassDetail
#      Route name: "assignments" path: "assignments" detailView: ClassAssignments
#      Route name: "settings" path: "settings" detailView: ClassSettings


module.exports =
  Split: Split
  List: require './list.ls'
  Detail: require './detail.ls'
  Assignments: require './Assignments.ls'
  Settings: require './Settings.ls'
