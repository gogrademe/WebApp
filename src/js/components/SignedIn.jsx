

import React from 'react';

import {Router, RouteHandler} from 'react-router';
import api from '../api/api';


var SignedIn = React.createClass({
  statics: {
    willTransitionTo: function(transition){
      if (!api.session.get()) {
        return transition.redirect('/login');
      }
    }
  },
  getInitialState(){
    return {
      person: {}
    };
  },
  updateActiveState(){
    if (!api.session.get()) {
      return Router.replaceWith('/login');
    }
  },
  render(){
    return (
      <div>
        <RouteHandler/>
      </div>
    );
  }
});
module.exports = SignedIn;
