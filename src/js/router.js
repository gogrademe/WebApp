"use strict";
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var _missing= function(data){ return React.DOM.pre(null, "Route not found: "+ data.route) },
    _router= null,
    _started= false,
    _nextId= 1;

function handleRouteChange(container, component) {
  var routeParams= Array.prototype.slice.call( arguments, 1 )
  React.renderComponent(
    component({ routeParams:routeParams }, null),
    container
  )
}

module.exports = {

  set404: function(component) {
    if(_started) throw "You must set the 404 component before router#start is called!";
    if(typeof component != 'function') throw "You must supply a React component to router#set404!";
    _missing= component;
  },

  start: function (container, routes, pushState) {
    if(!_router) {
      _router= new Backbone.Router();
      _router.route('*unknown', '404', function(params) {
        React.renderComponent( _missing({ route:params }, null), container );
      })
    }

    for(var route in routes) {
      if(! routes.hasOwnProperty(route) ) continue;

      var component= routes[route],
          name= "route"+ _nextId++;

      _router.route(route, name, handleRouteChange.bind(this, container, component));
    }

    if(!_started) {
      pushState= !!pushState;
      Backbone.history.start({ pushState:pushState });
      _started= true;
    }
  }
}