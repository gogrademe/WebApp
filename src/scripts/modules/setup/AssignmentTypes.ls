require! {
  React: 'react'

  "../../components/CrudTable.ls"
}
Dom = React.DOM
{div, i, strong, a} = Dom

AssignmentTypes = React.create-class do
  displayName: "AssignmentTypes"

  render: ->
    CrudTable null

module.exports = AssignmentTypes
