require! {
  React
  "../components/Panel.ls"
}

DashboardModule = React.create-class do
  displayName: "DashboardModule"
  render: ->
    Panel do
      title: "Dashboard"
      hasBody: true,
      "Welcome to the test version of Cuane Gradebook."
      
module.exports = DashboardModule
