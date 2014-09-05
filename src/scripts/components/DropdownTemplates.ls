require! {
  React: 'react'
  "./src/modules/Dropdown.ls"
}

{div, h2} = React.DOM
AssignmentType = React.create-class do
  displayName: "DashboardModule"
  render: ->
    div null,
      "test"


module.exports =
  AssignmentType: AssignmentType
  select-render: (xs)->
    | !xs => "Loading..."
    | otherwise => Dropdown do
                    class-name:"inline"
                    select-callback: @update-select
                    selected-index: 0
                    default-value: xs[0].id
                    options: xs.map (x) ->
                      text: "Year #{x?.schoolYear} - #{x?.name}"
                      value: x?.id
