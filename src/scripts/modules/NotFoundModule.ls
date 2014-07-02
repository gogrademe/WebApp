require! {
  React

  "../components/Panel.ls"
  "../utils.ls"
}

NotFoundPage = React.createClass(
  displayName: "NotFoundPage"
  render: ->
    requested = window.location.search
    requested = utils.getParam(requested, "req", false)
    console.log requested
    Panel do
      title: "Oops! - Page Not Found"
      hasBody: true,
    "We couldn't find the page you requested."
)
module.exports = NotFoundPage
