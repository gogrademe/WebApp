

import React from 'react';
import api from '../../api/api';
import CrudTable from '../../components/CrudTable';

import NewTable from '../../components/NewTable';

import {TermBtn} from '../../molecules/ModalButtons';

var Terms = React.createClass({
    tableColumns: [
    {
        key: "start",
        display: "Start"
    },
    {
        key: "end",
        display: "End"
    },
    {
        key: "terms",
        display: "School Year Start"
    },
    {
        display: '',
        resourceType: "schoolYear",
        renderer: NewTable.CrudActions,
        linkTo: "schoolYear",
        className: 'text-right',
        tdClassName: 'text-right'
    }
    ],
    getInitialState() {
        return {
            data: []
        };
    },
    fetch() {
        api.schoolYear.find()
            .then((xs) => {
              this.setState({
                data: xs
            });
        });
    },
    componentWillMount() {
        this.fetch();
    },
    render() {
        return (
          <div>
              <div className="btn-toolbar" role="toolbar">
              <TermBtn label="New" primary className="btn btn-primary pull-right"/>
            </div>
            <NewTable.Grid columns={this.tableColumns} data={this.state.data} />
          </div>
        );
    }
});

module.exports = Terms;
