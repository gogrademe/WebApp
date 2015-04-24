
import React from 'react';
import {Grid, CrudActions} from '../../components/NewTable';
import ActionRenderer from '../../components/ActionRenderer';
import SemanticModal from '../../components/SemanticModal';
import api from '../../api/api';


import AssignmentGrades from './AssignmentGrades';
var AssignmentBtn = require('../../molecules/ModalButtons').AssignmentBtn;

var AssignmentLink = React.createClass({
  displayName: "AssignmentLink",
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
    key: 'type.name',
    display: 'Type'
  }, {
    key: 'maxScore',
    display: 'Out Of'
  }, {
    key: 'type.weight',
    display: 'Weight',
    format: 'decimalPercent',
    className: 'col-md-1'
  }, {
    display: 'Actions',
    resourceType: "assignment",
    renderer: CrudActions
  }
];
var ClassAssignments = React.createClass({
  displayName: "ClassAssignments",
  getInitialState(){
    return {
      assignments: []
    };
  },
  componentDidMount(){
    api.assignment.events.addListener("change", this.getAssignments);
  },
  componentWillUnmount(){
    api.assignment.events.removeListener("change", this.getAssignments);
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
        <div className="ui top attached right aligned segment">
          <AssignmentBtn
            label="New"
            classId={this.props.classId}
            termId={this.props.termId} />
        </div>
        <Grid
          className="bottom attached"
          columns={assignmentCols}
          data={this.state.assignments} />
      </div>
    );
  }
});
module.exports = ClassAssignments;
