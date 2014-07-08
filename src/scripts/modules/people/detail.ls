require! {
  React

  "../../components/Panel.ls"

  "../../api/api.ls"
}

PersonDetail = React.create-class do
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

module.exports = PersonDetail
