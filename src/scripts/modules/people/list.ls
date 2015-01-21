require! {
  'react': React

  "../../components/Panel.ls"
  '../../components/ActionRenderer'

  "../../api/api.ls"

  #'./CreatePersonModal.ls'

  '../../modals/Person.jsx': CreatePersonModal
  './CreateAccountModal.jsx'

  '../../components/NewTable.ls'

  '../../components/PageHeader': Header

  '../../components/SemanticModal.ls'
}


{filter, any} = require 'prelude-ls'


Dom = React.DOM
{div, h3, span, a, i} = Dom

{Grid, CrudActions} = NewTable

custom-actions = (props)->
  SemanticModal.ModalTrigger modal: CreateAccountModal({person-id: props.row.id}),
    a class-name: "ui icon primary button tiny",
      i class-name: "icon settings"

cols =
  * key: 'firstName'
    display: 'First Name'

  * key:'middleName'
    display: 'Middle Name'

  * key: 'lastName'
    display: 'Last Name'

  * key: 'types'
    display: 'Types'

  * display: ''
    resource-type: "person"
    renderer: CrudActions
    link-to: "people"
    class-name: "right aligned"
    td-class-name: "right aligned"
    custom-actions: custom-actions


PeopleList = React.create-class do
  displayName: "PeopleList"
  getInitialState: ->
    current-filter: 'All'
    people: []

  component-did-mount: ->
    api.person.events.add-listener "change", @get-people

  component-will-unmount: ->
    api.person.events.remove-listener "change", @get-people

  get-people: ->
    api.person.find!
    .then ~>
      @set-state people: it

  componentWillMount: ->
    @get-people!

  modal: ->
    CreatePersonModal null

  render-filter-button: (name) ->
    is-active = @state.current-filter is name

    btn-class-name =
      switch is-active
        | true => "ui active button"
        | _    => "ui button"

    set-active = ~>
      @set-state current-filter: name

    return
      div class-name: btn-class-name, on-click: set-active,
        name

  render-grid-top: ->
    div null,
      div class-name: "ui basic tiny buttons",
        @render-filter-button "All"
        @render-filter-button "Students"
        @render-filter-button "Teachers"
        @render-filter-button "Parents"
        @render-filter-button "Admins"

      SemanticModal.ModalTrigger modal: @modal!,
        a class-name: "ui right floated primary tiny button", "New Person"

  filtered-data: ->
    format = ~>
      @state.current-filter
        |> (. slice 0, -1)
    if @state.current-filter is 'All'
      return @state.people
    else
      @state.people
       |> filter (~> format(@state.current-filter) in it.types)

  render: ->
    div null,
      Header primary: "All People"
      div class-name: "main container",
        div class-name: "ui top attached segment",
          @render-grid-top!
        Grid class-name: "bottom attached five column" columns: cols, data: @filtered-data!

module.exports = PeopleList
