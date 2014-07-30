require! {
  React

  Header: '../components/Header.ls'

  Form: '../components/Form.ls'

  "../api/api.ls"
}

Dom = React.DOM
{form, div, span, i, input, button, label} = Dom

Settings = React.create-class do
  displayName: "SchoolSettings"
  handleSubmit: (e) !->
    e.preventDefault!

  handleChange: (e, key) ->
    @set-state {"#key": e.target.value}

  render: ->
    div null,
      Header title: "School / Settings"
      div class-name: "main",
        div class-name: "ui toolbar menu inverted black block header"
        div class-name: "ui centered grid",
          div class-name: "six wide column",
            div class-name: "ui form segment",
              Form.Input type: "text" label: "Class Name" on-change: @handle-change . "name"
              Form.Input type: "text" label: "Grade Level"
              Form.Input type: "text" label: "Max Students"
              div class-name: "ui submit button", "Save"

module.exports =
  Settings: Settings
