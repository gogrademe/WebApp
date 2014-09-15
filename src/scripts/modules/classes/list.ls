require! {
  React: 'react'
  moment

  "../../components/Panel.ls"
  '../../components/NewTable.ls'

  "../../api/api.ls"

  './CreateClassModal.ls'

  Link: 'react-router'.Link

  Header: '../../components/Header.ls'
  select: '../../components/src/modules/Dropdown.ls'
}
Dom = React.DOM
{div, i, strong} = Dom

{Grid} = NewTable

ClassName = React.create-class do
  render: ->
    term-id = @props.column.term?.value || "t"
    div null,
      Link to: "class.detail", termId: term-id, resourceId: @props.row.id,
        @props.value



ClassList = React.create-class do
  displayName: "ClassList"
  getInitialState: ->
    classes: []
    terms: null
    term: null

  componentWillMount: ->
    api.class.find!
      .then ~>
        @set-state classes: it[0]
    api.term.find!
      .then ~>
        @set-state terms: it[0]

  cols: ->
    return
      * key: 'name'
        display: 'Class Name'
        renderer: ClassName
        term: @state.term

      * key: 'gradeLevel'
        display: 'Grade Level'

  update-select: ->
    @set-state term: it

  select-render: (xs)->
    | !xs => "Loading..."
    | otherwise => select do
                    class-name:"inline"
                    select-callback: @update-select
                    selected-index: 0
                    default-value: xs[0].id
                    options: xs.map (x) ->
                      text: "Year #{x?.schoolYear} - #{x?.name}"
                      value: x?.id

  render: ->
    div null,
      Header do
        title: 'All Classes'
      div class-name: "main",
        div class-name: "ui toolbar menu inverted black block header",
          div class-name:"right menu",
            div class-name:"item",
              strong {}, "Term: "
              @select-render @state.terms
        Grid columns: @cols!, data: @state.classes

module.exports = ClassList
