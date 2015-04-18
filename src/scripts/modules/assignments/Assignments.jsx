
var React = require('react');
var {Grid, CrudActions} = require('../../components/NewTable');
var ActionRenderer = require('../../components/ActionRenderer');
var SemanticModal = require('../../components/SemanticModal');
var api = require('../../api/api');


var AssignmentGrades = require('./AssignmentGrades');
var AssignmentBtn = require('../../molecules/ModalButtons').AssignmentBtn;

var AssignmentLink = React.createClass({
  displayName: "AssignmentLink",
  modal: function(){
    return new AssignmentGrades({
      assignmentId: this.props.row.id
    });
  },
  render: function(){
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
  getInitialState: function(){
    return {
      assignments: []
    };
  },
  componentDidMount: function(){
    api.assignment.events.addListener("change", this.getAssignments);
  },
  componentWillUnmount: function(){
    api.assignment.events.removeListener("change", this.getAssignments);
  },
  componentWillMount: function(){
    this.getAssignments();
  },
  getAssignments: function(){
    api.assignment.find({
      classId: this.props.classId,
      termId: this.props.termId
    }).then((data) => {
      this.setState({
        assignments: data
      });
    });
  },
  render: function(){
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
