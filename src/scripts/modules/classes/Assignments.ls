require! {
  React
  Fluxxor

  "../../components/Panel.ls"
}

FluxChildMixin = Fluxxor.FluxChildMixin(React)
ClassAssignments = React.create-class do
  displayName: "ClassAssignments"
  mixins: [
    FluxChildMixin
  ]
  render: ->
    Panel hasBody: true title: "Assignments" className: "content-area",
      "Detail page!"

module.exports = ClassAssignments
