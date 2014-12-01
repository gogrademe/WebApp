var React = require('react');

var {Router, State, RouteHandler} = require('react-router');
var api = require('../api/api.ls');
var auth = require('../api/auth.ls');


var SignedIn = React.createClass({
  mixins: [State],
  statics: {
    willTransitionTo: function(transition, params){
      if (!api.auth.token) {
        return transition.redirect('/login');
      }
    }
  },
  getInitialState: function(){
    return {
      person: {}
    };
  },
  updateActiveState: function(){
    if (!api.session.get()) {
      return Router.replaceWith('/login');
    }
  },
  render: function(){
    return <div><RouteHandler/></div>
  }
});
module.exports = SignedIn;
