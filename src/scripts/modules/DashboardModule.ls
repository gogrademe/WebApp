require! {
  React
}



Panel = require("../components/Panel.ls")

# var Routed = require('Reactful-Router');
# var Link = Routed.Link;
# var Router = Routed.Router;
DashboardModule = React.createClass(
  displayName: "DashboardModule"
  render: ->
    Panel do
      title: "Dashboard"
      hasBody: true,
      "Welcome to the test version of Cuane Gradebook."
)
module.exports = DashboardModule
