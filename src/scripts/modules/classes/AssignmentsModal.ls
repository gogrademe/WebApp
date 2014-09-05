require! {
  React: 'react'

  Modal: '../../components/SemanticModal.ls'.SemanticModal
  '../../components/Form.ls'

  "../../api/api.ls"
  "../../utils.ls"

  #"../../components/src/modules/Dropdown.ls"

  Nav: './nav.ls'
  Header: '../../components/Header.ls'

}

Dom = React.DOM
{div, a} = Dom


AssignmentsModal = React.create-class do
  displayName: "AssignmentsModal"
  prop-types:
    class-id: React.PropTypes.string.isRequired
    term-id: React.PropTypes.string.isRequired

  get-initial-state: ->
    assignment:
      class-id: @props.class-id
      term-id: @props.term-id
      terms: []
  component-will-mount: ->
    #api.term.find!
    #  .then !~>
    #    @set-state terms: it[0]


  handle-save: ->
    it.prevent-default!

    assignment = @state.assignment

    assignment.dueDate = utils.for-upload(@state.assignment.dueDate).format!

    api.assignment.create assignment
      .then ~>
        console.log it
      .catch ~>
        console.log it

  on-input: ->
    null

  on-select: ->
    null

  handle-change: (key, val)->
    @state.assignment[key] = val
    @set-state assignment: @state.assignment

  render-input: ({type, label, key})->
    Form.Input type: type, label: label, value: @state.assignment[key], on-change: @handle-change.bind null, key
  render: ->
    @transfer-props-to do
      Modal title:"Create Assignment",
        div class-name: "content",
          div class-name: "ui form",
            @render-input type: "text" label:"Name" key: "name"
            div class-name: "ui two fields",
              @render-input type: "date" label:"Due Date" key: "dueDate"
              @render-input type: "text" label:"Type" key: "typeId"
              #Combobox on-input: @on-input, on-select: @on-select,
              #  Option value: "foo",
              #    "foo"
        div class-name:"actions",
          a class-name: "ui button" on-click: @props.on-request-hide,
            "Cancel"
          a class-name: "ui button primary" on-click: @handle-save,
            "Save"


module.exports = AssignmentsModal
