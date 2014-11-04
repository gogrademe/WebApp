var React = require('react');

var {Router, ActiveState} = require('react-router');
var api = require('../api/api.ls');
var auth = require('../api/auth.ls');


var SignedIn = React.createClass({
  mixins: [ActiveState],
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
    return <div><this.props.activeRouteHandler /></div>
  }
});
module.exports = SignedIn;
