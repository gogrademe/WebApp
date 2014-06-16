/** @jsx React.DOM */

'use strict';
var React = require('react');
var Panel = require('../../components/Panel.jsx');
var RoutingContextMixin = require('rrouter').RoutingContextMixin;
var Link = require('rrouter').Link;

var Fluxxor = require('fluxxor');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Grid = require('react-grid');


var CreatePersonModal = require('./CreatePersonModal.jsx');
var Button = require('react-bootstrap/button');
var ModalTrigger = require('react-bootstrap/modaltrigger');
var LinkCell = React.createClass({
  render: function() {
    return (
      <div>
        <Link to="home" person={this.props.value}>{this.props.value} </Link>
      </div>
    );
  }
});
var ActionsCell = React.createClass({
  render: function() {
    return (
      <div>
        <Button bsStyle="link">Detail</Button>
        <Button bsStyle="link">Edit</Button>
        <Button bsStyle="link">Delete</Button>
      </div>
    );
  }
});

var columns = [
  {
    name: 'Id',
    key: 'id',
    width: 30,
    renderer: LinkCell
  },
  {
    name: 'First Name',
    key: 'firstName'
  },
  {
    name: 'Middle Name',
    key: 'middleName'
  },
  {
    name: 'Last Name',
    key: 'lastName'
  },
  {
    name: 'Type',
    key: 'teacher'
  },
  {
    name: 'Actions',
    renderer: ActionsCell
  }
];

var PeopleList = React.createClass({
  mixins: [RoutingContextMixin, FluxChildMixin, StoreWatchMixin('PeopleStore')],
  componentWillMount: function() {
    var flux = this.getFlux();
    flux.actions.getAllPeople();
  },
  getStateFromFlux: function() {
    var flux = this.getFlux();

    return {
      People: flux.store("PeopleStore").getState()
    };
  },
  render: function() {
    var flux = this.getFlux();
    return (
      <div title="All Classes" className="content-area panel panel-default">
        <div className="panel-heading clearfix">
          <div className="row">
            <div className="col-sm-4">
              <h3 className="panel-title">All People</h3>
            </div>
            <div className="col-sm-8 text-align-right">
              <div className="btn-group pull-right">
                <ModalTrigger modal={<CreatePersonModal flux={flux}/>}>
                  <Button bsStyle="primary" bsSite="small">Add</Button>
                </ModalTrigger>
              </div>
            </div>
          </div>
        </div>
        <Grid
          length={this.state.People.length}
          columns={columns}
          rows={this.state.People}
          rowHeight={40}
          />
      </div>
    );
  }
});

module.exports = PeopleList;
