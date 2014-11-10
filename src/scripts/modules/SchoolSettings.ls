require! {
  'react': React

  '../components/PageHeader': Header

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
      Header primary: "School / Settings"
      div class-name: "main container",
        div class-name: "ui form segment",
          #Form.Input type: "text" label: "School Name" on-change: @handle-change . "name"
          #Form.Input type: "text" label: "Address"
          #Form.Input type: "text" label: "Phone Number"
          #Form.Input type: "text" label: "Fax Number"
          div class-name: "actions",
            div class-name: "ui submit button",
              "Save"

module.exports =
  Settings: Settings
