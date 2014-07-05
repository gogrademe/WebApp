require! {
  React

  "../../components/Panel.ls"

  "../../api/api.ls"
}
Dom = React.DOM
{div, h1, img, span, ul,li, a, i, button} = Dom

ClassStudents = React.create-class do
  displayName: "ClassStudents"
  get-initial-state: ->
    class: {}
  component-will-mount: !->
    api.class.get @props.params.resource-id
      .then ~>
        @set-state do
          class: it

  render: ->
    Panel hasBody: true title: "Students" className: "content-area",
      "Enrolled Students!"

module.exports = ClassStudents
