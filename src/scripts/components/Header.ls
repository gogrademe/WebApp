{div, h1, a, img, span, i, a, img, button, span, span, span, span, ul}= require 'react'

DropdownButton = require("react-bootstrap/DropdownButton")
MenuItem = require("react-bootstrap/MenuItem")
Nav = require("react-bootstrap/Nav")

# var Link = RRouter.Link;
Link = require("./HighlightedLink")
HeaderBar = React.createClass(
  displayName: "HeaderBar"
  render: ->
    div className: "navbar navbar-fixed-top nav-justified navbar-default header header-tall",
      div className: "navbar-header",
        div className: "nav nav-justified",
          h1 null,
            a className: "navbar-brand" href: "/",
              img src: "/assets/img/lanciv-logo-final.png",
                "Cunae Gradebook"
)
HeaderNav = React.createClass(
  displayName: "HeaderNav"
  render: ->
    userTitle = (span(null, i(className: "fa fa-user fa-fw"), @props.currentUser.Email))
    div null, div(
      className: "navbar navbar-default navbar-fixed-top header"
    , div(
      className: "container"
    , div(
      className: "navbar-header"
    , a(
      className: "navbar-brand"
      href: "/"
    , img(src: "/assets/img/lanciv-logo-final.png"), "Cunae Gradebook")), div(
      className: "collapse navbar-collapse"
      id: "navbar-collapse1"
    ))), div(
      className: "navbar navbar-default subnav"
    , div(
      className: "container"
    , div(
      className: "navbar-header"
    , button(
      type: "button"
      className: "navbar-toggle"
      "data-toggle": "collapse"
      "data-target": "#navbar-collapse2"
    , span(
      className: "sr-only"
    , "Toggle navigation"), span(className: "icon-bar"), span(className: "icon-bar"), span(className: "icon-bar"))), div(
      className: "navbar-collapse collapse"
    , ul(
      className: "nav navbar-nav"
    , Link(
      href: "/dashboard"
    , "Dashboard"), Link(
      href: "/classes"
      matchPattern: "/classes*"
      someRandomeTest: "tesaasdasd"
    , "Classes"), Link(
      href: "/people"
      matchPattern: "/people*"
    , "People")), Nav(
      className: "nav navbar-nav pull-right"
    , DropdownButton(
      title: userTitle
      className: "btn-link"
    , MenuItem(
      key: "1"
    , "Dropdown link"), MenuItem(
      key: "2"
    , "Dropdown link"))))))
)
Header = React.createClass(
  displayName: "Header"
  propTypes:
    currentUser: React.PropTypes.object.isRequired
    isLoggedIn: React.PropTypes.bool.isRequired

  render: ->
    div null, (if @props.isLoggedIn then HeaderNav(currentUser: @props.currentUser) else HeaderBar(null))
)
module.exports = Header
