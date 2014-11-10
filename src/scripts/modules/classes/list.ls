require! {
  'react': React
  moment

  "../../components/Panel.ls"
  '../../components/NewTable.ls'

  "../../api/api.ls"

  './CreateClassModal.ls'

  'react-router': {Link}

  '../../components/SemanticModal.ls'

  '../../components/PageHeader': Header
  '../../components/src/modules/Dropdown.ls': select
}
Dom = React.DOM
{div, i, strong, a} = Dom

{Grid} = NewTable

ClassName = React.create-class do
  render: ->
    term-id = @props.column.term?.value || "t"
    div null,
      Link to: "class.grades", params: {termId: term-id, resourceId: @props.row.id},
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
        @set-state classes: it
    api.term.find!
      .then ~>
        @set-state terms: it

  cols: ->
    return
      * key: 'name'
        display: 'Class Name'
        renderer: ClassName
        term: @state.term

      * key: 'gradeLevel'
        display: 'Grade Level'

      * key: 'maxStudents'
        display: 'Max Students'

      * display: ''
        resource-type: "class"
        renderer: NewTable.CrudActions
        link-to: "class"
        class-name: "right aligned"
        td-class-name: "right aligned"

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

  right-buttons: ->
    @select-render @state.terms

  render: ->
    div null,
      Header primary: 'All Classes' right: @right-buttons!
      div class-name: "main container",
        div class-name: "ui top attached right aligned segment",
          SemanticModal.ModalTrigger modal: CreateClassModal!,
            a class-name: "ui primary tiny button", "New Class"
        Grid class-name: "bottom attached" columns: @cols!, data: @state.classes

module.exports = ClassList
