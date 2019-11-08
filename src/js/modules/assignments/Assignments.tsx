import * as React from "react";
import { Grid, CrudActions } from "../../components/NewTable";
import { AssignmentBtn } from "../../molecules/ModalButtons";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

class AssignmentEdit extends React.Component<any, undefined> {
  render() {
    return (
      <div>
        <CrudActions row={this.props.row} column={this.props.column} />
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
}

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
    resourceType: "assignment",
    tdClassName: "collapsing right aligned"
  }
];

const ASSIGNMENTS = gql`
  query Assignments($courseId: Int!, $termId: Int!) {
    assignments(courseId: $courseId, termId: $termId) {
      assignmentId
      name
      dueDate
      courseId
      termId
      group {
        name
        weight
      }
      maxScore
    }
  }
`;

export default function ClassAssignments({ match }) {
  const { termId, resourceID } = match.params;
  const { loading, error, data } = useQuery(ASSIGNMENTS, { variables: { courseId: resourceID, termId: termId } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <div className="btn-toolbar" role="toolbar">
        <AssignmentBtn
          label="New"
          className="btn btn-primary pull-right"
          values={{ courseId: Number(resourceID), termId: Number(termId) }}
        />
      </div>
      <Grid attached columns={assignmentCols} data={data.assignments} />
    </div>
  );
}
