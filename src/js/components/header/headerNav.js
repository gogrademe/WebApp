/** @jsx React.DOM */
var React = require('react');

var HeaderNav = React.createClass({
  render: function() {
  return (
        <div>
          <div className="navbar navbar-default navbar-fixed-top header">
            <div className="container">
              <div className="navbar-header">
                <a className="navbar-brand" href="#">
                  <img src="img/lanciv-logo-final.png" />Cunae Gradebook
                </a>
              </div>
              <div className="collapse navbar-collapse" id="navbar-collapse1">
              </div>
            </div>
          </div>
          <div className="navbar navbar-default subnav">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse2">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
              <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <li>
                    <a>Home</a>
                  </li>
                  <li>
                    <a >Classes</a>
                  </li>
                  <li >
                    <a href="#contact">Contact</a>
                  </li>
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">Setup
                        <b className="caret"></b>
                      </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a>Teachers</a>
                      </li>
                      <li>
                        <a href="#">Students</a>
                      </li>
                      <li>
                        <a href="#">Subjects</a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul className="nav navbar-nav pull-right">
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                      <i className="fa fa-user fa-fw"></i> Matt Aitchison
                      <b className="caret"></b>
                    </a>
                    <ul className="dropdown-menu" role="menu">
                      <li>
                        <a href="#"><i className="fa fa-cogs fa-fw"></i> Settings</a>
                      </li>
                      <li className="divider"></li>
                      <li>
                        <button className="btn btn-link"><i className="fa fa-power-off fa-fw"></i> Logout</button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
  )
}
});

module.exports = HeaderNav;