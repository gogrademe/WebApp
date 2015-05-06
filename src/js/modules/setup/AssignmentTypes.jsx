

import React from 'react';
import api from '../../api/api';
import NewTable from '../../components/NewTable';

import {AssignmentTypeBtn} from '../../molecules/ModalButtons';

module.exports = React.createClass({
    getInitialState() {
        return {
            data: []
        };
    },
    fetch() {
      api.assignmentGroup.find({classId: this.props.classId})
        .then((xs) => {
          this.setState({
            data: xs
        });
    });
    },
    componentWillMount() {
      this.fetch();
    },
    tableColumns: [{
      key: "name",
      display: "Name"
    }, {
      key: "weight",
      display: "Weight",
      format: 'decimalPercent'
    }, {
      display: '',
      resourceType: "type",
      renderer: NewTable.CrudActions,
      linkTo: "type",
      className: 'text-right',
      tdClassName: 'text-right'
    }],
    componentDidMount() {
      api.assignmentGroup.events.addListener("change", this.fetch);
    },
    componentWillUnmount() {
      api.assignmentGroup.events.removeListener("change", this.fetch);
    },

    render() {
        return (
          <div>
            <div className="btn-toolbar" role="toolbar">
              <AssignmentTypeBtn label="New" classId={this.props.classId} className="btn btn-primary pull-right"/>
            </div>
            <NewTable.Grid columns={this.tableColumns} data={this.state.data} />
          </div>
        );
    }
});
