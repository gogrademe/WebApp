require! {
  'react': React
  "../../components/Panel.ls"
}

Dom = React.DOM
{div, form, input, label, select} = Dom


ClassSettings = React.create-class do
  displayName: "ClassSettings"
  get-initial-state: ->
    settings: @props.class

  handle-change: (key, val)->
    @state.settings[key] = val
    @set-state settings: @state.settings

  submit: ->
    console.log "a"

  render: ->
    div null,
      #Nav resource-id: @props.params.resource-id, term-id: @props.params.term-id
      #div class-name: "ui centered grid",
      #  div class-name: "ten wide column",
      div class-name: "ui form segment",
        #Form.Input type: "text" label: "Class Name" value: @state.settings?.name, on-change: @handle-change.bind null, "name"
        #Form.Input type: "text" label: "Grade Level" value: @state.settings?.gradeLevel, on-change: @handle-change.bind null, "gradeLevel"
      #  Form.Input type: "text" label: "Max Students" value: @state.settings?.maxStudents, on-change: @handle-change.bind null, "maxStudents"
        #Form.Input type: "text" label: "Terms" value: @state.settings?.terms, on-change: @handle-change.bind null, "terms"
        div class-name: "ui submit button" on-click: @submit, "Save"

module.exports = ClassSettings
