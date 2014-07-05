require! {
  React
  #Link: './HighlightedLink.ls'
  Router: "react-nested-router"
  Bootstrap: 'react-bootstrap'
}

{DropdownButton, MenuItem, Nav} = Bootstrap

Dom = React.DOM
{div, h1, img, span, ul,li, a, i, button} = Dom

Link = Router.Link

HeaderBar = React.create-class do
  displayName: "HeaderBar"
  render: ->
    div class-name: "navbar navbar-fixed-top nav-justified navbar-default header header-tall",
      div class-name: "navbar-header",
        div class-name: "nav nav-justified",
          h1 null,
            a class-name: "navbar-brand" href: "/",
              img src: '/assets/img/lanciv-logo-final.png'
              "Cunae Gradebook"

HeaderNav = React.create-class do
  displayName: "HeaderNav"
  render: ->
    userTitle = (span(null, i(className: "fa fa-user fa-fw"), @props.currentUser.Email))
    div null,
      div className: "navbar navbar-default navbar-fixed-top header",
        div className: "container",
          div className: "navbar-header",
            a className: "navbar-brand" href: "/",
              img src: "/assets/img/lanciv-logo-final.png"
              "Cunae Gradebook"
      div className: "navbar navbar-default subnav",
        div className: "container",
          div className: "navbar-header"
          div className: "navbar-collapse collapse",
            ul className: "nav navbar-nav",
              li null,
                Link to: "dashboard", "Home"
              li null,
                Link to: "class.list", "Classes"
              li null,
                Link to: "people", "People"
            Nav className: "nav navbar-nav pull-right",
              DropdownButton title: "User" className: "btn-link",
                MenuItem key: "1",
                  "Dropdown link"
                MenuItem key: "2",
                  "Dropdown link"

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
