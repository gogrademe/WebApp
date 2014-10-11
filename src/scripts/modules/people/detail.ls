require! {
  'react': React

  "../../api/api.ls"

  '../../components/Header.ls'
}

Dom = React.DOM
{div} = Dom

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
    | it.firstName  => "#{it.firstName} #{it.lastName}"
    | otherwise     => "Loading..."

  render: ->
    div null,
      Header title: @title @state.person
      div class-name: "main container",
        "Detail page!"

module.exports = PersonDetail
