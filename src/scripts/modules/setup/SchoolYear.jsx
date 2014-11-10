var React = require('react');
var api = require('../../api/api.ls');

var SemanticModal = require("../../components/SemanticModal.ls");
var NewTable = require('../../components/NewTable.ls');

var SchoolYearModal = require('../../modals/SchoolYear');

var SchoolYear = React.createClass({
    getInitialState() {
      return {
        data: []
      }
    },
    tableColumns: [{
        key: "schoolYear",
        display: "School Year"
    }, {
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
    render() {
        return (
          <div>
            <div className="ui top attached right aligned segment">
              <SemanticModal.ModalTrigger modal={SchoolYearModal()}>
                <a className="ui primary tiny button">
                  New
                </a>
              </SemanticModal.ModalTrigger>
            </div>
            <NewTable.Grid className="bottom attached" columns={this.tableColumns} data={this.state.data} />
          </div>
        );
    }
});

module.exports = SchoolYear;
