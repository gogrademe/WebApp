require! {
  'react': React

  "../../api/api.ls"
  "../../components/CrudTable.ls"

  "../../components/NewTable.ls"
}
Dom = React.DOM
{div, i, strong, a} = Dom

AssignmentTypes = React.create-class do
  displayName: "AssignmentTypes"

  table-columns:
    * key: "name"
      display: "Name"

    * key: "weight"
      display: "Weight"
      format: 'decimalPercent'

    * key: "maxScore"
      display: "Max Score"

    * display: ''
      resource-type: "type"
      renderer: NewTable.CrudActions
      link-to: "type"
      class-name: "right aligned"
      td-class-name: "right aligned"

  fetch: ->
    api.type.find!

  render: ->
    div null,
      CrudTable do
        columns: @table-columns
        fetch-data: @fetch
        resource: 'type'
        title: 'Assignment Type'
        form-fields: @table-cols

module.exports = AssignmentTypes
