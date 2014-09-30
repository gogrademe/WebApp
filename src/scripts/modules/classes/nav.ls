require! {
  React: 'react'

  "../../components/Panel.ls"
  "../../api/api.ls"

  Router: "react-router"
  Semantic: "../../components/src/modules/Dropdown.ls"
}

Dom = React.DOM
{div, span, input, a} = Dom

Link = require '../../components/HighlightedLink.ls'

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

  title: ->
    | it        => "#{it.name} - #{it.gradeLevel}"
    | otherwise => "Loading..."

  options: ->
    @state.terms.map (k,v)->
      text: k.name

  render: ->
    @transferPropsTo do
      div class-name: "ui toolbar menu inverted black block header",
        div class-name:"left menu",
          Link class-name: "item" to: "class.detail" term-id: @props.term-id, resource-id: @props.resource-id, "Grades"
          Link class-name: "item" to: "class.students" term-id: @props.term-id, resource-id: @props.resource-id, "Students"
          Link class-name: "item" to: "class.assignments" term-id: @props.term-id, resource-id: @props.resource-id, "Assignments"
          Link class-name: "item" to: "class.settings" term-id: @props.term-id, resource-id: @props.resource-id, "Settings"
        div class-name: "right menu",
        @props.children

module.exports = Nav
