import React from 'react';
import Logo from '../atoms/Logo';
import Router from 'react-router';
import {AppBar, LeftNav} from 'material-ui';

import api from '../api/api';
import auth from '../api/auth';


let menuItems = [
  {route: 'dashboard', text: 'Dashboard'},
  {route: 'class', text: 'Classes'},
  {route: 'people', text: 'People'},
  {route: 'users', text: 'Users'},
  {route: 'setup', text: 'App Settup'}
];

var HeaderNav = React.createClass({
  mixins: [Router.Navigation, Router.State],
  userDisplayName(){
    return this.state.person.firstName + " " + this.state.person.lastName;
  },
  componentWillMount(){
    var personId, this$ = this;
    personId = auth.currentUser().personId;
    if (personId) {
      return api.person.get(personId).then(function(it){
        return this$.setState({
          person: it
        });
      });
    }
  },
  getInitialState(){
    return {
      person: {},
      selectedIndex: null
    }
  },
  render() {
    var header = <div className="logo">GoGradeMe</div>;
    return (
      <div>
        <AppBar
          className="mui-dark-theme"
          title="GoGradeMe"
          zDepth={0}
          onMenuIconButtonTouchTap={this._onMenuIconButtonTouchTap}
          />
        <LeftNav
          ref="leftNav"
          docked={false}
          isInitiallyOpen={false}
          menuItems={menuItems}
          header={header}
          selectedIndex={this._getSelectedIndex()}
          onChange={this._onLeftNavChange}
          />
      </div>
    );
  },
  _onMenuIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  },
  _getSelectedIndex: function() {
    // var currentItem;
    //
    // for (var i = menuItems.length - 1; i >= 0; i--) {
    //   currentItem = menuItems[i];
    //   if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
    // };
  },

  _onLeftNavChange: function(e, key, payload) {
    this.context.router.transitionTo(payload.route);
  },

  _onHeaderClick: function() {
    this.context.router.transitionTo('root');
    this.refs.leftNav.close();
  }
});

// <div className="ui fixed blue inverted main menu">
//   <div className="container">
//     <Link className="item" to="dashboard">
//       <i className="dashboard icon" />
//       Dashboard
//     </Link>
//     <Link className="item" to="class">
//       Classes
//     </Link>
//     <Link className="item" to="people">
//       <i className="users icon"/>
//       People
//     </Link>
//     <Link className="item" to="users">
//       <i className="users icon"/>
//       Users
//     </Link>
//     <Link className="item" to="setup">
//       App Setup
//     </Link>
//     <div className="right menu">
//       <div className="item">
//         {this.userDisplayName()}
//       </div>
//       <Link className="item" to="logout">
//         Logout
//       </Link>
//     </div>
//   </div>
// </div>

module.exports = HeaderNav;
