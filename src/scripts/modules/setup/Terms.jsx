var React = require('react');
var api = require('../../api/api.ls');
var CrudTable = require('../../components/CrudTable.ls');
var NewTable = require('../../components/NewTable.ls');

var Terms = React.createClass({
    displayName: "SchoolTerms",
    tableColumns: [{
        key: "name",
        display: "Name"
    }, {
        key: "startDate",
        display: "Start Date",
        format: 'date'
    }, {
        key: "endDate",
        display: "End Date",
        format: 'date'
    }, {
        display: '',
        resourceType: "term",
        renderer: NewTable.CrudActions,
        linkTo: "term",
        className: "right aligned",
        tdClassName: "right aligned"
    }],
    fields: [{
        key: "name",
        label: "Name"
    }, {
        key: "weight",
        label: "Weight"
    }],
    fetch() {
        return api.term.find();
    },
    render() {
        return (
            <div>
                <CrudTable columns={this.tableColumns} fetchData={this.fetch} resource="type" title="Assignment Type" formFields={this.fields} />
            </div>
        );
    }
});

module.exports = Terms
