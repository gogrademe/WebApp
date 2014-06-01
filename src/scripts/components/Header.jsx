/** @jsx React.DOM */

var DropdownButton = require('react-bootstrap/DropdownButton');

var MenuItem = require('react-bootstrap/MenuItem');
var Nav = require('react-bootstrap/Nav');
var NavItem = require('react-bootstrap/NavItem');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var HeaderBar = React.createClass({
    render: function () {
        return (
            <div className="navbar navbar-fixed-top nav-justified navbar-default header header-tall">
                <div className="navbar-header">
                    <div className="nav nav-justified">
                        <h1>
                            <a className="navbar-brand" href="/"><img src="/assets/img/lanciv-logo-final.png"/> Cunae Gradebook</a>
                        </h1>
                    </div>
                </div>
            </div>
            );
    }
});
    // <Navbar>
    //   <Nav>
    //     <NavItem key={1} href="#">Link</NavItem>
    //     <NavItem key={2} href="#">Link</NavItem>
    //     <DropdownButton key={3} title="Dropdown">
    //       <MenuItem key="1">Action</MenuItem>
    //       <MenuItem key="2">Another action</MenuItem>
    //       <MenuItem key="3">Something else here</MenuItem>
    //       <MenuItem divider />
    //       <MenuItem key="4">Separated link</MenuItem>
    //     </DropdownButton>
    //   </Nav>
    // </Navbar>
var HeaderNav = React.createClass({
  render: function() {
    var userTitle = <span><i className="fa fa-user fa-fw"></i>{this.props.currentUser.Email}</span>;
  return (
        <div>
          <div className="navbar navbar-default navbar-fixed-top header">
            <div className="container">
              <div className="navbar-header">
                <a className="navbar-brand" href="/">
                  <img src="/assets/img/lanciv-logo-final.png" />Cunae Gradebook
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
                        <Link to="dashboard">Dashboard</Link>
                    </li>
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
                /* <Link activeClassName="active" href="/classes/" matchPattern="/classes/*">Classes</Link>
                    <Link activeClassName="active" href="/students/" matchPattern="/students/*">Students</Link> */


                // <ul className="nav navbar-nav">
                //     <Link activeClassName="active" href="/dashboard" matchPattern="/dashboard">Dashboard</Link>
                //     <Link activeClassName="active" href="/classes/" matchPattern="/classes/*">Classes</Link>
                //     <Link activeClassName="active" href="/students/" matchPattern="/students/*">Students</Link>
                // </ul>


    // var title = <span><i className="fa fa-user fa-fw"></i> Matt Aitchison</span>;
    // <Navbar>
    //   <Nav>
    //     <DropdownButton key={3} title={title}>
    //       <MenuItem key="1">Dropdown link</MenuItem>
    //       <MenuItem key="2">Dropdown link</MenuItem>
    //     </DropdownButton>
    //   </Nav>
    // </Navbar>
});
                // <ul className="nav navbar-nav pull-right">

                //   <li className="dropdown">
                //     <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                //       <i className="fa fa-user fa-fw"></i> Matt Aitchison
                //       <b className="caret"></b>
                //     </a>
                //     <ul className="dropdown-menu" role="menu">
                //       <li>
                //         <a href="#"><i className="fa fa-cogs fa-fw"></i> Settings</a>
                //       </li>
                //       <li className="divider"></li>
                //       <li>
                //         <button className="btn btn-link"><i className="fa fa-power-off fa-fw"></i> Logout</button>
                //       </li>
                //     </ul>
                //                   </li>
                // </ul>


var Header = React.createClass({
  render: function() {
  return (
    <div>
    {this.props.isLoggedIn ? <HeaderNav currentUser={this.props.currentUser}/> : HeaderBar(null)}
    </div>
  )
}
});

module.exports = Header;
