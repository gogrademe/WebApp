import React, { PropTypes } from "react";
import { Grid, CrudActions } from "../../components/NewTable";
import { AssignmentBtn } from "../../molecules/ModalButtons";
// import AssignmentBtn from '../../molecules/Moda';
import { Button } from "semantic-ui-react";
import api from "../../api/api";

import { loadAssignments } from "../../redux/modules/assignment";
import { connect } from "react-redux";

const AssignmentEdit = React.createClass({
  propTypes: {
    row: PropTypes.object
  },
  render() {
    return (
      <div>
        <CrudActions {...this.props} />
        <AssignmentBtn
          label="Edit"
          values={{
            courseId: this.props.row.courseId,
            termId: this.props.row.termId,
            assignmentId: this.props.row.assignmentId
          }}
        />
      </div>
    );
  }
});

var assignmentCols = [
  {
    key: "name",
    display: "Name"
  },
  {
    key: "dueDate",
    display: "Due Date",
    format: "date"
  },
  {
    key: "group.name",
    display: "Type"
  },
  {
    key: "maxScore",
    display: "Out Of"
  },
  {
    key: "group.weight",
    display: "Weight",
    format: "decimalPercent",
    className: "col-md-1"
  },
  {
    display: <AssignmentBtn label="New" />,
    renderer: AssignmentEdit,
    resourceType: "assignmentGroup",
    tdClassName: "collapsing right aligned"
  }
];
var ClassAssignments = React.createClass({
  getInitialState() {
    return {
      assignments: []
    };
  },
  componentDidMount() {
    this.props.loadAssignments();
    api.assignment.events.addListener("change", this.getAssignments);
    api.group.events.addListener("change", this.getAssignments);
  },
  componentWillUnmount() {
    api.assignment.events.removeListener("change", this.getAssignments);
    api.group.events.removeListener("change", this.getAssignments);
  },
  componentWillMount() {
    this.getAssignments();
  },
  getAssignments() {
    const { termId, resourceID } = this.props.match.params;
    api.assignment
      .find({
        courseId: resourceID,
        termId: termId
      })
      .then(data => {
        this.setState({
          assignments: data
        });
      });
  },
  render() {
    const { termId, resourceID } = this.props.match.params;
    return (
      <div>
        <div className="btn-toolbar" role="toolbar">
          <AssignmentBtn
            label="New"
            className="btn btn-primary pull-right"
            values={{ courseId: Number(resourceID), termId: Number(termId) }}
          />
        </div>
        <Grid attached columns={assignmentCols} data={this.state.assignments} />
      </div>
    );
  }
});

export default connect(
  state => ({
    assignments: Object.values(state.entities.assignments)
  }),
  { loadAssignments }
)(ClassAssignments);
