require! {
  React

  Nav: './nav.ls'

  '../../api/api.ls'
}
Dom = React.DOM
{h4, div} = Dom

Split = React.create-class do
  displayName: "Split"
  render: ->
    div class-name: "two column stackable ui grid",
      div class-name: "four wide column",
        Nav resource-id: @props.params.resource-id
      div class-name: "twelve wide column",
        @props.activeRoute

module.exports =
  Split:       Split
  List:        require './list.ls'
  Detail:      require './detail.ls'
  Assignments: require './Assignments.ls'
  Students:    require './students.ls'
  Settings:    require './Settings.ls'

/*
<div class="ui two column page grid">
  <div class="column">
    <div class="ui labeled vertical fluid inverted icon menu">
      <a class="item">
        <i class="icon mail"></i>
        Mail
      </a>
      <a class="item">
        <i class="icon lab"></i>
        Lab
      </a>
      <a class="item">
        <i class="icon star"></i>
        Favorites
      </a>
    </div>
  </div>
  <div class="column">
    <div class="ui segment">
      <b>Inbox</b>
      <p>Welcome to your inbox. Would you like to see more information?</p>
    </div>
  </div>
</div>*/
