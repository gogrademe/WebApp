/** @jsx React.DOM */
'use strict';
var React = require('react');
var DropdownButton = require('react-bootstrap/DropdownButton');

var MenuItem = require('react-bootstrap/MenuItem');
var Nav = require('react-bootstrap/Nav');

// var Link = RRouter.Link;
var Link = require('./HighlightedLink.jsx');

var HeaderBar = React.createClass({
    render: function () {
        return (
          <div className="navbar navbar-fixed-top nav-justified navbar-default header header-tall">
            <div className="navbar-header">
              <div className="nav nav-justified">
                <h1>
                  <a className="navbar-brand" href="/">
                    <img src="/assets/img/lanciv-logo-final.png"/>
                      Cunae Gradebook
                    </a>
                </h1>
              </div>
            </div>
          </div>
      );
    }
});

var HeaderNav = React.createClass({
  render: function() {
    var userTitle = (
      <span>
        <i className="fa fa-user fa-fw">
        </i>
        {this.props.currentUser.Email}
      </span>
    );
  return (
        <div>
          <div className="navbar navbar-default navbar-fixed-top header">
            <div className="container">
              <div className="navbar-header">
                <a className="navbar-brand" href="/">
                  <img src="/assets/img/lanciv-logo-final.png" />
                  Cunae Gradebook
                </a>
              </div>
              <div className="collapse navbar-collapse"
                   id="navbar-collapse1">
              </div>
            </div>
          </div>
          <div className="navbar navbar-default subnav">
            <div className="container">
              <div className="navbar-header">
                <button type="button"
                        className="navbar-toggle"
                        data-toggle="collapse"
                        data-target="#navbar-collapse2">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
              <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <Link href="/dashboard">Dashboard</Link>
                  <Link href="/classes" matchPattern="/classes*">Classes</Link>
                  <Link href="/people" matchPattern="/people*">People</Link>
                </ul>
                <Nav className="nav navbar-nav pull-right">
                    <DropdownButton title={userTitle} className="btn-link">
                      <MenuItem key="1">Dropdown link</MenuItem>
                      <MenuItem key="2">Dropdown link</MenuItem>
                    </DropdownButton>
                </Nav>
              </div>
            </div>
          </div>
        </div>
    );
  }
});


var Header = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    isLoggedIn: React.PropTypes.bool.isRequired
  },
  render: function() {
    return (
      <div>
      {
        this.props.isLoggedIn ?
        <HeaderNav currentUser={this.props.currentUser}/> :
        <HeaderBar />
      }
      </div>
    );
  }
});

module.exports = Header;
