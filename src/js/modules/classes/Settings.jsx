import React from 'react';
import api from '../../api/api';
import NewTable from '../../components/NewTable';

import {AssignmentGroupBtn} from '../../molecules/ModalButtons';

// const AssignmentEdit = (props) => {
//   return (
//     <AssignmentGroupBtn
//     label='Edit'
//     classId={props.classId}
//     termId={props.termId}
//     className='btn btn-primary pull-right'/>
//   );
// };

const AssignmentEdit = React.createClass({
  render() {
      return (
        <AssignmentGroupBtn
        label='Edit'
        classId={this.props.row.classId}
        termId={this.props.row.termId}
        groupId={this.props.row.id}
        className='btn btn-primary pull-right'/>
      );
  }
});

export default React.createClass({
  getInitialState() {
    return {
        data: []
    };
  },
  fetch() {
    api.assignmentGroup
      .find({classId: this.props.classId, termId: this.props.termId})
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
      key: 'name',
      display: 'Name'
  }, {
      key: 'weight',
      display: 'Weight',
      format: 'decimalPercent'
  }, {
      display: '',
      resourceType: 'assignmentGroup',
      renderer: NewTable.CrudActions,
      linkTo: 'type',
      className: 'text-right',
      tdClassName: 'text-right'
  }, {
      display: '',
      renderer: AssignmentEdit,
      className: 'text-right',
      tdClassName: 'text-right'
  }],
  componentDidMount() {
      api.assignmentGroup.events.addListener('change', this.fetch);
  },
  componentWillUnmount() {
      api.assignmentGroup.events.removeListener('change', this.fetch);
  },

  render() {
    return (
      <div>
        <div className='btn-toolbar' role='toolbar'>
          <AssignmentGroupBtn
              label='New'
              classId={this.props.classId}
              termId={this.props.termId}
              className='btn btn-primary pull-right'/>
        </div>
        <NewTable.Grid columns={this.tableColumns} data={this.state.data} />
      </div>
    );
  }
});
