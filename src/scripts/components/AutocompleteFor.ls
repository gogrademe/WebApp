require! {
  React: 'react'

  "../api/api.ls"
  "./autocomplete.ls"
}

Dom = React.DOM
{div} = Dom

{Autocomplete, Option} = autocomplete

AssignmentType = React.create-class do
  get-initial-state: ->
    types: null

  component-will-mount: ->
    api.type.find!
      .then ~>
        @set-state types: it[0]

  render-options: ->
    if @state.types
      @state.types.map (item, rId) ->
        Option key: rId, value: item.id, label: "#{item.name}"
    else
      div null,
        "Loading..."

  render: ->
    @transfer-props-to do
      Autocomplete placeholder: "Type" dropdown: true,
        @render-options!


module.exports =
  AssignmentType: AssignmentType
