require! {
  'react': React
  moment

  "../../components/Panel.ls"
  '../../components/NewTable.ls'

  "../../api/api.ls"

  './CreateClassModal.ls'

  'react-router': {Link}


  '../../components/SemanticModal'

  '../../components/PageHeader': Header
  'react-select': Select
  #'../../components/src/modules/Dropdown.ls': select
}
Dom = React.DOM
{div, i, strong, a} = Dom

{Grid} = NewTable

ClassName = React.create-class do
  render: ->
    term-id = @props.column.term || ""
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
        @set-state term: it[0].id
        @set-state terms: it

  cols: ->
    return
      * key: 'name'
        display: 'Class Name'
        renderer: ClassName
        term: @state.term

      * key: 'gradeLevel'
        display: 'Grade Level'

      * display: ''
        resource-type: "class"
        renderer: NewTable.CrudActions
        link-to: "class"
        class-name: "right aligned"
        td-class-name: "right aligned"

  update-select: ->
    console.log it
    @set-state term: it

  select-render: (xs)->
    | !xs => "Loading..."
    | otherwise => Select do
                    class-name:"inline"
                    on-change: @update-select
                    value: @state.term
                    autoload: false
                    options: xs.map (x) ->
                      label: "Year #{x?.schoolYear.start}-#{x?.schoolYear.end} - #{x?.name}"
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
