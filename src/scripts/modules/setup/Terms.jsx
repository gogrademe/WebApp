"use strict";

var React = require('react');
var api = require('../../api/api.ls');
var CrudTable = require('../../components/CrudTable.ls');

var NewTable = require('../../components/NewTable.ls');

var SemanticModal = require("../../components/SemanticModal.ls");

var {TermBtn} = require('../../molecules/ModalButtons');

var Terms = React.createClass({
    tableColumns: [
    {
        key: "schoolYear.start",
        display: "School Year Start"
    },
    {
        key: "schoolYear.end",
        display: "School Year End"
    },
    {
        key: "name",
        display: "Name"
    },
    {
        key: "startDate",
        display: "Start Date",
        format: 'date'
    },
    {
        key: "endDate",
        display: "End Date",
        format: 'date'
    },
    {
        display: '',
        resourceType: "term",
        renderer: NewTable.CrudActions,
        linkTo: "term",
        className: "right aligned",
        tdClassName: "right aligned"
    }
    ],
    getInitialState() {
        return {
            data: []
        }
    },
    fetch() {
        api.term.find()
            .then((xs) => {
              this.setState({
                data: xs
              })
        })
    },
    componentWillMount() {
        this.fetch();
    },
    showModal() {
        ModalActions.showModal(ModalTypes.TERM);
    },
    render() {
        return (
          <div>
            <div className="ui top attached right aligned segment">
              <TermBtn label="New" primary={true}/>
            </div>
            <NewTable.Grid className="bottom attached" columns={this.tableColumns} data={this.state.data} />
          </div>
        );
    }
});

module.exports = Terms
