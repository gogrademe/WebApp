require! {
  React

  "../../components/Panel.ls"

  "../../api/api.ls"

  Nav: './nav.ls'
  Header: '../../components/Header.ls'
}
Dom = React.DOM
{div, h1, img, span, ul,li, a, i, button} = Dom

ClassDetail = React.create-class do
  displayName: "ClassDetail"
  get-initial-state: ->
    terms: []
    class: {}

  component-will-mount: !->
    api.term.find!
    .then ~>
      @set-state do
        terms: it[0]
    api.class.get @props.params.resource-id
      .then ~>
        @set-state do
          class: it

  render: ->
    div null,
      Nav resource-id: @props.params.resource-id
      div null,
        "Maybe put grades here?"

module.exports = ClassDetail
