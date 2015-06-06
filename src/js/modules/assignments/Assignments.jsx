
import React, {PropTypes} from 'react';
import {Grid, CrudActions} from '../../components/NewTable';
import {AssignmentBtn} from '../../molecules/ModalButtons';
import api from '../../api/api';


// var AssignmentLink = React.createClass({
//   modal(){
//     return new AssignmentGrades({
//       assignmentId: this.props.row.id
//     });
//   },
//   render(){
//     return (
//       <div>
//         <AssignmentGradesBtn primary={true} icon={true} assignmentId={this.props.row.id}>
//           {this.props.value}
//         </AssignmentGradesBtn>
//       </div>
//     );
//   }
// });

const AssignmentEdit = React.createClass({
  propTypes: {
    row: PropTypes.object
  },
  render() {
      return (
        <div className="btn-group">
          <CrudActions {... this.props}/>
          <AssignmentBtn
            label='Edit'
            classId={this.props.row.classId}
            termId={this.props.row.termId}
            assignmentId={this.props.row.id}
            className='btn btn-primary'/>
        </div>
      );
  }
});

var assignmentCols = [
  {
    key: 'name',
    display: 'Name',
    className: 'assignment.student'
  },
  {
    key: 'dueDate',
    display: 'Due Date',
    format: 'date'
  },
  {
    key: 'group.name',
    display: 'Type'
  },
  {
    key: 'maxScore',
    display: 'Out Of'
  },
  {
    key: 'group.weight',
    display: 'Weight',
    format: 'decimalPercent',
    className: 'col-md-1'
  },
  {
      display: '',
      renderer: AssignmentEdit,
      resourceType: 'assignmentGroup',
      className: 'text-right',
      tdClassName: 'text-right col-md-2'
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
