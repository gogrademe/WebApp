

import React from 'react';
import api from '../../api/api';

import NewTable from '../../components/NewTable';

import {TermBtn} from '../../molecules/ModalButtons';

var Terms = React.createClass({
    tableColumns: [
    {
        key: 'name',
        display: 'Name'
    },
    {
        key: 'school_year',
        display: 'School Year'
    }
    ],
    getInitialState() {
        return {
            data: []
        };
    },
    fetch() {
        api.term.find()
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
