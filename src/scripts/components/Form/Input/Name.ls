require! {
  'react': React
}

{div, label, input} = React.DOM

NameInput = React.create-class do
  displayName: "NameInput"
  render: ->
    div class-name: "field",
      label null,
        "Test"
      @transfer-props-to input null

module.exports = NameInput
