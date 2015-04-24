

import React from 'react';

import {Router, State, RouteHandler} from 'react-router';
import api from '../api/api';
import auth from '../api/auth';


var SignedIn = React.createClass({
  mixins: [State],
  statics: {
    willTransitionTo: function(transition, params){
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
    return(
      <div>
        <RouteHandler/>
      </div>
    );
  }
});
module.exports = SignedIn;
