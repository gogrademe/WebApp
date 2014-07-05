require! {
  React

  "../../api/api.ls"
}
Panel = require("../../components/Panel.ls")
PersonDetail = React.createClass(
  displayName: "PersonDetail"
  getInitialState: ->
    person: {}

  componentWillMount: ->
    api.person.get @props.params.resourceId
    .then ~>
      @setState do
        person: it

  title: (it)->
    | it.middleName => "#{it.firstName} #{it.middleName} #{it.lastName}"
    | it.firstName => "#{it.firstName} #{it.lastName}"
    | otherwise => "Loading..."

  render: ->
    Panel hasBody: true title: @title @state.person, className: "content-area",
      "Detail page!"
)
module.exports = PersonDetail
