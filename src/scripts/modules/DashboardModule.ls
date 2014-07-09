require! {
  React
  "../components/Panel.ls"
}
div = React.DOM.div
DashboardModule = React.create-class do
  displayName: "DashboardModule"
  render: ->
    div class-name:"ui celled grid",
      Panel title: "Dashboard",
        "Welcome to the test version of Cuane Gradebook."

module.exports = DashboardModule
