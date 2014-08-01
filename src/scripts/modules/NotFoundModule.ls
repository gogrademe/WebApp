require! {
  React: 'react'

  "../components/Panel.ls"
}

NotFoundModule = React.create-class do
  displayName: "NotFound"
  render: ->
    Panel title: "404 Page" hasBody: true,
      "Page not found"

module.exports = NotFoundModule
