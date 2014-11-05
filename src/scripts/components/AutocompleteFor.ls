require! {
  'react': React

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
        @set-state types: it

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

SchoolTerms = React.create-class do
  display-name: "SchoolTerms"
  get-initial-state: ->
    terms: null

  component-will-mount: ->
    api.term.find!
      .then ~>
        @set-state terms: it

  handle-change: ->
    @props.on-change target: value: [it.target.value]

  render-options: ->
    if @state.terms
      @state.terms.map (item, rId) ->
        Option key: rId, value: item.id, label: "#{item.name} - #{item.schoolYear}"
    else
      div null,
        "Loading..."

  render: ->
    div null,
      Autocomplete on-change: @handle-change, placeholder: "Term" dropdown: true,
        @render-options!

GradeLevel = React.create-class do
  display-name: "GradeLevel"

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
    @state.grades.map (item, rId) ->
      Option key: rId, value: item, label: "#{item}"
  
  handle-change: ->
    @props.on-change target: value: it.target.value

  render: ->
    @transfer-props-to do
      Autocomplete on-change: @handle-change, placeholder: "Grade Level" dropdown: true,
        @render-options!

ProfileTypes = React.create-class do
  display-name: "ProfileTypes"

  get-initial-state: ->
    types:
      "Student"
      "Teacher"
      "Parent"
      "Other"
      "Admin"

  handle-change: ->
    @props.on-change target: value: [it.target.value]

  render-options: ->
    @state.types.map (item, rId) ->
      Option key: rId, value: item, label: "#{item}"

  render: ->
    @transfer-props-to do
      Autocomplete on-change: @handle-change, placeholder: "Type" dropdown: true,
        @render-options!

module.exports =
  AssignmentType: AssignmentType
  GradeLevel: GradeLevel
  ProfileTypes: ProfileTypes
  SchoolTerms: SchoolTerms
