import _ from "lodash";

import React, { useState } from "react";

import { Grid, CrudActions } from "../../components/NewTable";

import { Link } from "react-router-dom";
import Header from "../../components/PageHeader";

import { Combobox as Select } from "react-widgets";
import { CourseBtn } from "../../molecules/ModalButtons";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import { Courses } from "./types/Courses";

const CourseLink = ({ column, row, value }) => (
  <div>
    <Link to={`/course/${column.currentTerm}/${row.courseId}/grades`}>{value}</Link>
  </div>
);

const Actions = props => (
  <div className="btn-group">
    <CrudActions {...props} />
    <CourseBtn label="Edit" values={{ courseId: props.row.courseId }} />
  </div>
);

const QUERIES = gql`
  query Courses {
    courses {
      courseId
      name
      gradeLevel
    }
    terms {
      termId
      name
      schoolYear
    }
  }
`;

const cols = currentTerm => {
  return [
    {
      key: "name",
      display: "Class Name",
      renderer: CourseLink,
      currentTerm: currentTerm
    },
    {
      key: "gradeLevel",
      display: "Grade Level"
    },
    {
      display: "",
      resourceType: "course",
      renderer: Actions,
      tdClassName: "collapsing right aligned",
      linkTo: "class"
    }
  ];
};

export default function Courses() {
  const { loading, error, data } = useQuery<Courses, null>(QUERIES);
  const [currentTerm, setCurrentTerm] = useState(0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Header
        primary="All Courses"
        right={
          <Select
            className="inline"
            onChange={val => setCurrentTerm(val.termId)}
            value={currentTerm}
            data={data.terms}
            valueField="termId"
            textField={item => `${item.schoolYear} - ${item.name}`}
          />
        }
      />
      <div>
        <CourseBtn label="New" values={{ initialValues: { termId: currentTerm } }} />
      </div>
      <div>
        <Grid attached columns={cols(currentTerm)} data={data.courses} />
      </div>
    </div>
  );
}
