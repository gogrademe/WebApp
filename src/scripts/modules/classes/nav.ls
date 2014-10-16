require! {
  'react': React

  "../../components/Panel.ls"
  "../../api/api.ls"

  "react-router": Router
  "../../components/src/modules/Dropdown.ls": Semantic
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
          Link class-name: "item" to: "class.overview" params: {term-id: @props.term-id, resource-id: @props.resource-id}, "Home"
          Link class-name: "item" to: "class.detail" params: {term-id: @props.term-id, resource-id: @props.resource-id}, "Grades"
          Link class-name: "item" to: "class.students" params: {term-id: @props.term-id, resource-id: @props.resource-id}, "Students"
          Link class-name: "item" to: "class.assignments" params: {term-id: @props.term-id, resource-id: @props.resource-id}, "Assignments"
          Link class-name: "item" to: "class.settings" params: {term-id: @props.term-id, resource-id: @props.resource-id}, "Settings"
        div class-name: "right menu",
        @props.children

module.exports = Nav
