require! {
  React

  "../../components/Panel.ls"
  '../../components/NewTable.ls'

  "../../api/api.ls"
}
Dom = React.DOM
{div, h3} = Dom


{Grid, StringRenderer, bindId} = NewTable


PeopleList = React.create-class do
  displayName: "PeopleList"
  getInitialState: ->
    people: []
  componentDidMount: ->
    @set-state people: [
      ["John", 67, 10000]
      ["Tom", 99, 10001]
    ]


  /*componentWillMount: ->
    api.person.find!
    .then ~>
      @set-state people: it[0]*/

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
      Grid headers: ["First Name", "Grade", "Id"], data: @state.people, renderers: [bindId(StringRenderer)]

module.exports = PeopleList
