// Generated by LiveScript 1.3.1
(function(){
  var React, api, Header, Dom, div, PersonDetail;
  React = require('react');
  api = require('../../api/api');
  // Header = require('../../components/Header');
  Dom = React.DOM;
  div = Dom.div;
  PersonDetail = React.createClass({
    displayName: 'PersonDetail',
    getInitialState(){
      return {
        person: {}
      };
    },
    componentWillMount(){
      var this$ = this;
      return api.person.get(this.props.params.resourceID).then(function(it){
        return this$.setState({
          person: it
        });
      });
    },
    title: function(it){
      switch (false) {
      case !it.middle_name:
        return it.first_name + ' ' + it.middle_name + ' ' + it.last_name;
      case !it.first_name:
        return it.first_name + ' ' + it.last_name;
      default:
        return 'Loading...';
      }
    },
    render(){
      return div(null, Header({
        title: this.title(this.state.person)
      }), div({
        className: 'main container'
      }, 'Detail page!'));
    }
  });
  module.exports = PersonDetail;
}).call(this);