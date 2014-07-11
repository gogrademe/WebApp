require! {
  React

  "../../components/Panel.ls"
  "../../api/api.ls"

  Router: "react-nested-router"
  Semantic: "../../components/src/modules/Dropdown.ls"
}

Dom = React.DOM
{div, span, input, a} = Dom

Link = Router.Link

select = Semantic

Nav = React.create-class do
  display-name: "Nav"
  get-initial-state: ->
    class: null
    term: null
    terms: []
  component-will-mount: !->
    api.class.get @props.resource-id
      .then !~>
        @set-state do
          class: it

    api.term.find!
      .then !~>
        @set-state do
          terms: it[0]

  title: ->
    | it        => "#{it.name} - #{it.gradeLevel}"
    | otherwise => "Loading..."

  options: ->
    @state.terms.map (k,v)->
      console.log k,v
      text: k.name

  render: ->
    @transferPropsTo do
      div class-name: "ui vertical fluid menu",
        div class-name: "header item",
          "Nav"
        div class-name: "ui item",
          select class-name: "fluid" options: @options!
        Link class-name: "item" to: "class.detail" resource-id: @props.resource-id, "Home"
        Link class-name: "item" to: "class.students" resource-id: @props.resource-id, "Students"
        Link class-name: "item" to: "class.assignments" resource-id: @props.resource-id, "Assignments"
        Link class-name: "item" to: "class.settings" resource-id: @props.resource-id, "Settings"

module.exports = Nav
