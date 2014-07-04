require! {
  React
  moment

  "../../components/Panel.ls"
  '../../components/NewTable.ls'
  '../../components/ActionRenderer.ls'

  "../../api/api.ls"
}
Dom = React.DOM
{div, h3} = Dom

{Grid, StringRenderer} = NewTable


cols = [
  {
    key: 'firstName'
    display: 'First Name'
  }
  {
    key:'middleName'
    display: 'Middle Name'
  }
  {
    key: 'lastName'
    display: 'Last Name'
  }
  {
    key: 'updatedAt'
    display: 'Updated At'
    format: (d) ->
      moment(d).format('L')
  }
  {
    display: 'Actions'
    renderer: ActionRenderer
    link-to: "people"
  }

]
PeopleList = React.create-class do
  displayName: "PeopleList"
  getInitialState: ->
    people: []
  componentWillMount: ->
    api.person.find!
    .then ~>
      @set-state people: it[0]

  render: ->
    div title: "All Classes" className: "content-area panel panel-default",
      div className: "panel-heading clearfix",
        div className: "row",
          div className: "col-sm-4",
            h3 className: "panel-title",
              "All People"
          div className: "col-sm-8 text-align-right",
            div className: "btn-group pull-right",
              "Button"
      Grid columns: cols, data: @state.people

module.exports = PeopleList
