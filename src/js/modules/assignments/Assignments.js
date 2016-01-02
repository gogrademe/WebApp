
import React, {PropTypes} from 'react';
import {Grid, CrudActions} from '../../components/NewTable';
import {AssignmentBtn} from '../../molecules/ModalButtons';
import api from '../../api/api';

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
            course_id={this.props.row.course_id}
            term_id={this.props.row.term_id}
            assignment_id={this.props.row.assignment_id}
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
    key: 'due_date',
    display: 'Due Date',
    format: 'date'
  },
  {
    key: 'group.name',
    display: 'Type'
  },
  {
    key: 'max_score',
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
    api.group.events.addListener('change', this.getAssignments);
  },
  componentWillUnmount(){
    api.assignment.events.removeListener('change', this.getAssignments);
    api.group.events.removeListener('change', this.getAssignments);
  },
  componentWillMount(){
    this.getAssignments();
  },
  getAssignments(){
    const {term_id, resourceID} = this.props.params;
    api.assignment.find({
      course_id: resourceID,
      term_id: term_id
    }).then((data) => {
      this.setState({
        assignments: data
      });
    });
  },
  render(){
    const {term_id, resourceID} = this.props.params;
    return (
      <div>
        <div className="btn-toolbar" role="toolbar">
          <AssignmentBtn
            label="New"
            className="btn btn-primary pull-right"
            course_id={Number(resourceID)}
            term_id={Number(term_id)} />
        </div>
        <Grid
          columns={assignmentCols}
          data={this.state.assignments} />
      </div>
    );
  }
});
module.exports = ClassAssignments;
