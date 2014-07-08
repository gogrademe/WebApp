require! {
  React

  "../../api/api.ls"
}
Dom = React.DOM
{div, h1, img, span, ul,li, a, i, button} = Dom

Panel = require("../../components/Panel.ls")
ClassDetail = React.createClass(
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
    Panel hasBody: true title: "Grades" className: "content-area",
      "Maybe put grades here?"

)
module.exports = ClassDetail
