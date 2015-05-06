
import React from 'react';
import {Grid, CrudActions} from '../../components/NewTable';
import SemanticModal from '../../components/SemanticModal';
import api from '../../api/api';


import AssignmentGrades from './AssignmentGrades';
var AssignmentBtn = require('../../molecules/ModalButtons').AssignmentBtn;

var AssignmentLink = React.createClass({
  modal(){
    return new AssignmentGrades({
      assignmentId: this.props.row.id
    });
  },
  render(){
    return (
      <div>
        <SemanticModal.ModalTrigger modal={this.modal()}>
          <a>{this.props.value}</a>
        </SemanticModal.ModalTrigger>
      </div>
    );
  }
});
var assignmentCols = [
  {
    key: 'name',
    display: 'Name',
    className: 'assignment.student',
    renderer: AssignmentLink
  }, {
    key: 'dueDate',
    display: 'Due Date',
    format: 'date'
  }, {
    key: 'group.name',
    display: 'Type'
  }, {
    key: 'maxScore',
    display: 'Out Of'
  }, {
    key: 'group.weight',
    display: 'Weight',
    format: 'decimalPercent',
    className: 'col-md-1'
  }, {
    display: 'Actions',
    className: 'text-right',
    tdClassName: 'text-right',
    resourceType: 'assignment',
    renderer: CrudActions
  }
];
var ClassAssignments = React.createClass({
  getInitialState(){
    return {
      assignments: []
    };
  },
  componentDidMount(){
    api.assignment.events.addListener('change', this.getAssignments);
    api.assignmentGroup.events.addListener('change', this.getAssignments);
  },
  componentWillUnmount(){
    api.assignment.events.removeListener('change', this.getAssignments);
    api.assignmentGroup.events.removeListener('change', this.getAssignments);
  },
  componentWillMount(){
    this.getAssignments();
  },
  getAssignments(){
    api.assignment.find({
      classId: this.props.classId,
      termId: this.props.termId
    }).then((data) => {
      this.setState({
        assignments: data
      });
    });
  },
  render(){
    return (
      <div>
        <div className="btn-toolbar" role="toolbar">
          <AssignmentBtn
            label="New"
            className="btn btn-primary pull-right"
            classId={this.props.classId}
            termId={this.props.termId} />
        </div>
        <Grid
          columns={assignmentCols}
          data={this.state.assignments} />
      </div>
    );
  }
});
module.exports = ClassAssignments;
