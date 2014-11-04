var React = require('react');
var api = require('../../api/api.ls');
var CrudTable = require('../../components/CrudTable.ls');
var NewTable = require('../../components/NewTable.ls');

AssignmentTypes = React.createClass({
  displayName: "AssignmentTypes",
  tableColumns: [{
    key: "name",
    display: "Name"
  }, {
    key: "weight",
    display: "Weight",
    format: 'decimalPercent'
  }, {
    key: "maxScore",
    display: "Max Score"
  }, {
    display: '',
    resourceType: "type",
    renderer: NewTable.CrudActions,
    linkTo: "type",
    className: "right aligned",
    tdClassName: "right aligned"
  }],
  fields: [{
    key: "name",
    label: "Name"
  }, {
    key: "weight",
    label: "Weight"
  }, {
    key: "maxScore",
    label: "Max Score"
  }],
  fetch: function() {
    return api.type.find();
  },
  render: function() {
    return (
      <div>
        <CrudTable columns={this.tableColumns} fetchData={this.fetch} resource="type" title="Assignment Type" formFields={this.fields} />
      </div>
    )
  }
});
module.exports = AssignmentTypes;
