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

GradeLevel = React.create-class do
  get-initial-state: ->
    grades:
      "1st"
      "2nd"
      "3rd"
      "4th"
      "5th"
      "6th"
      "7th"
      "8th"
      "9th"
      "10th"
      "11th"
      "12th"

  render-options: ->
    if @state.grades
      @state.grades.map (item, rId) ->
        Option key: rId, value: item, label: "#{item}"
    else
      div null,
        "Loading..."

  render: ->
    @transfer-props-to do
      Autocomplete placeholder: "Grade Level" dropdown: true,
        @render-options!

module.exports =
  AssignmentType: AssignmentType
  GradeLevel: GradeLevel
