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

var CreateClassModal = require('./CreateClassModal.jsx');
var Button = require('react-bootstrap/button');
var ModalTrigger = require('react-bootstrap/modaltrigger');
var LinkCell = React.createClass({
  render: function() {
    return (
      <div>
        <Link to="detail/home" currentClass={this.props.value}>{this.props.value} </Link>
      </div>
    );
  }
});

var columns = [
  {
    name: 'Id',
    width: '20%',
    key: 'id'
  },
  {
    name: 'Class Name',
    width: '20%',
    key: 'className',
    renderer: LinkCell
  },
  {
    name: 'Grade Level',
    width: '20%',
    key: 'gradeLevel'
  },
  {
    name: 'Teacher',
    width: '40%',
    key: 'teacherName'
  }
];

function rows(start, end) {
  var rows = [];
  for (var i = start; i < end; i++) {
    rows.push({id:i, className:'Class Name ' + i, gradeLevel:'Grade Level ' + i, teacherName:'Teacher Name ' + i});
  }
  return rows;
}



var ClassList = React.createClass({
  mixins: [RoutingContextMixin, FluxChildMixin, StoreWatchMixin('ClassesStore')],
  componentWillMount: function() {
    var flux = this.getFlux();
    flux.actions.getAllClasses();
  },
  getStateFromFlux: function() {
    var flux = this.getFlux();

    return {
      Classes: flux.store("ClassesStore").getState()
    };
  },

  render: function() {
    return (
      <div className="content-area panel panel-default">
        <div className="panel-heading clearfix">
          <div className="row">
            <div className="col-sm-4">
              <h3 className="panel-title">All Classes</h3>
            </div>
            <div className="col-sm-8 text-align-right">
              <div className="btn-group pull-right">
                <ModalTrigger modal={<CreateClassModal flux={this.getFlux()}/>}>
                  <Button bsStyle="primary" bsSite="small">Add</Button>
                </ModalTrigger>
              </div>
            </div>
          </div>
        </div>
        <Grid
          length={10000}
          columns={columns}
          rows={rows}
          rowHeight={40}
          />
      </div>
    );
  }
});

module.exports = ClassList;
