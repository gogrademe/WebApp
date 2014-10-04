require! {
  React: 'react'

  "../../components/Panel.ls"
  '../../components/NewTable.ls'
  '../../components/ActionRenderer.ls'

  "../../api/api.ls"

  './CreatePersonModal.ls'
  './CreateAccountModal.ls'

  Header: '../../components/PageHeader.ls'

  '../../components/SemanticModal.ls'
}


{filter, sort-by} = require 'prelude-ls'


Dom = React.DOM
{div, h3, span, a} = Dom

{Grid, StringRenderer} = NewTable

custom-actions = (props)->
  SemanticModal.ModalTrigger modal: CreateAccountModal({person-id: props.row.id}),
    a class-name: "ui primary button tiny", "Create Account"


cols =
  * key: 'firstName'
    display: 'First Name'

  * key:'middleName'
    display: 'Middle Name'

  * key: 'lastName'
    display: 'Last Name'

  * key: 'profiles'
    display: 'Types'
    format: (v) ->
      if v.teacherId
        "Teacher"
      else
        "Student"

  * display: 'Actions'
    resource-type: "person"
    renderer: NewTable.CrudActions
    link-to: "people"

    custom-actions: custom-actions


PeopleList = React.create-class do
  displayName: "PeopleList"
  getInitialState: ->
    current-filter: 'All'
    people: []
  componentWillMount: ->
    api.person.find!
    .then ~>
      @set-state people: it[0]
  modal: ->
    CreatePersonModal null

  right-menu: ->
    SemanticModal.ModalTrigger modal: @modal!,
      a class-name: "ui primary tiny button", "Create"

  render-filter-button: (name) ->
    is-active = @state.current-filter is name
    if is-active then btn-class-name = "ui active button" else btn-class-name ="ui button"

    set-active = ~>
      @set-state current-filter: name

    div class-name: btn-class-name, on-click: set-active,
      name



  render-filter-buttons: ->
    div class-name: "ui basic tiny buttons",
      @render-filter-button "All"
      @render-filter-button "Students"
      @render-filter-button "Teachers"
      @render-filter-button "Parents"


  filtered-data: ->
    format = ~>
      term = @state.current-filter.to-lower-case!
      term = term.slice 0, -1

      "#{term}Id"

    if @state.current-filter is 'All'
      return @state.people
    else
      return filter (.profiles[format!] is not undefined), @state.people

  render: ->
    div null,
      Header primary: "All People", right: @right-menu!
      div class-name: "main container",
        div class-name: "ui top attached segment",
          @render-filter-buttons!
        Grid class-name: "bottom attached five column" columns: cols, data: @filtered-data!

module.exports = PeopleList
