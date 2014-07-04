require! {
  React
  Link: './HighlightedLink.ls'

  Bootstrap: 'react-bootstrap'
}

{DropdownButton, MenuItem, Nav} = Bootstrap

Dom = React.DOM
{div, h1, img, span, ul, a, i, button} = Dom

# var Link = RRouter.Link;
HeaderBar = React.create-class do
  displayName: "HeaderBar"
  render: ->
    div className: "navbar navbar-fixed-top nav-justified navbar-default header header-tall",
      div className: "navbar-header",
        div className: "nav nav-justified",
          h1 null,
            a className: "navbar-brand" href: "/",
              img src: "/assets/img/lanciv-logo-final.png",
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
              Link href: "/dashboard",
                "Dashboard"
              Link href: "/classes" matchPattern: "/classes*",
                "Classes"
              Link href: "/people" matchPattern: "/people*",
                "People"
            Nav className: "nav navbar-nav pull-right",
              DropdownButton title: "User" className: "btn-link",
                MenuItem key: "1",
                  "Dropdown link"
                MenuItem key: "2",
                  "Dropdown link"

Header = React.createClass(
  displayName: "Header"
  propTypes:
    currentUser: React.PropTypes.object.isRequired
    isLoggedIn: React.PropTypes.bool.isRequired

  render: ->
    div null, (if @props.isLoggedIn then HeaderNav(currentUser: @props.currentUser) else HeaderBar(null))
)
module.exports = Header
