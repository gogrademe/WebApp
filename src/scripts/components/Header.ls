require! {
  React
  #Link: './HighlightedLink.ls'
  Router: "react-nested-router"
  Bootstrap: 'react-bootstrap'
}

{DropdownButton, MenuItem, Nav} = Bootstrap

Dom = React.DOM
{div, h1, img, span, ul, a, i, button} = Dom

Link = Router.Link
HeaderBar = React.create-class do
  displayName: "HeaderBar"
  render: ->
    div class-name: "navbar navbar-fixed-top nav-justified navbar-default header header-tall",
      div class-name: "navbar-header",
        div class-name: "nav nav-justified",
          h1 null,
            a class-name: "navbar-brand" href: "/",
              #img src: '/assets/img/lanciv-logo-final.png'
              "Cunae Gradebook"

HeaderNav = React.create-class do
  displayName: "HeaderNav"
  render: ->
    userTitle =
      span null,
        i className: "fa fa-user fa-fw",
          @props.currentUser.Email

    div class-name: "ui teal inverted large menu",
      div class-name: "title item",
        "Cunae Gradebook"
      Link class-name: "item" to: "dashboard",
        i class-name:"home icon"
        " Home"
      Link class-name: "item" to: "class",
        "Classes"
      Link class-name: "item" to: "people",
        "People"
      div class-name: "right menu",
        "Test"

/*<div class="ui menu">
  <a class="active item">
    <i class="home icon"></i> Home
  </a>
  <a class="item">
    <i class="mail icon"></i> Messages
  </a>
  <div class="right menu">
    <div class="item">
      <div class="ui icon input">
        <input type="text" placeholder="Search...">
        <i class="search link icon"></i>
      </div>
    </div>
  </div>
</div>*/

Header = React.create-class do
  displayName: "Header"
  propTypes:
    currentUser: React.PropTypes.object.isRequired
    isLoggedIn: React.PropTypes.bool.isRequired

  render: ->
    if @props.isLoggedIn then
      HeaderNav currentUser: @props.currentUser
    else
      HeaderBar null

module.exports = Header
