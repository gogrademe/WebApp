import * as React from "react";

import { Grid, CrudActions } from "../../components/NewTable";
import { AssignmentGroupBtn } from "../../molecules/ModalButtons";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import * as cx from "classnames";

const AssignmentEdit = props => (
  <div className="btn-group">
    <CrudActions {...props} />
    <AssignmentGroupBtn
      label="Edit"
      values={{ groupId: props.row.groupId, termId: props.row.termId, courseId: props.row.courseId }}
      className="btn btn-primary"
    />
  </div>
);

const WeightFooter = ({ data }) => {
  const weights = data.map(x => x.weight * 100);
  const weight = weights.length ? weights.reduce((a, b) => a + b) : 0;
  return (
    <div>
      <strong className={cx({ "text-danger": weight !== 100 })}>{weight}</strong> /100
    </div>
  );
};

const ASSIGNMENT_GROUPS = gql`
  query AssignmentGroups($courseId: ID!, $termId: ID!) {
    assignmentGroups(courseId: $courseId, termId: $termId) {
      groupId
      name
      termId
      courseId
      weight
    }
  }
`;

export default function Settings({ match }) {
  const { termId, resourceID } = match.params;
  const { loading, error, data } = useQuery(ASSIGNMENT_GROUPS, { variables: { courseId: resourceID, termId: termId } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const tableColumns = [
    {
      key: "name",
      display: "Name"
    },
    {
      key: "weight",
      display: "Weight",
      format: "decimalPercent",
      footerRenderer: WeightFooter
    },
    {
      display: "",
      renderer: AssignmentEdit,
      resourceType: "group",
      className: "text-right",
      tdClassName: "text-right col-md-2"
    }
  ];

  return (
    <div>
      <div className="btn-toolbar" role="toolbar">
        <AssignmentGroupBtn
          label="New"
          values={{ courseId: Number(resourceID), termId: Number(termId) }}
          className="btn btn-primary pull-right"
        />
      </div>
      <Grid columns={tableColumns} data={data.assignmentGroups} />
    </div>
  );
}
