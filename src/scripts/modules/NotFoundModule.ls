require! {
  'react': React

  '../components/Header.ls'
  "../components/Panel.ls"
}

{div} = React.DOM

NotFoundModule = React.create-class do
  displayName: "NotFound"
  render: ->
    div {},
      Header title: "Not found!"
      Panel title: "404 Page" hasBody: true,
        "Page not found"

module.exports = NotFoundModule
