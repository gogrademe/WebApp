import React from "react";
import Header from "../../components/PageHeader";
import MenuLink from "../../components/MenuLink";

import { Menu } from "semantic-ui-react";

import { Route, Switch } from "react-router-dom";

import Grades from "./detail";
import Students from "./students";

import Assignments from "../assignments/Assignments";
import Settings from "./Settings";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { CourseDetail, CourseDetailVariables } from "./types/CourseDetail";

const QUERIES = gql`
  query CourseDetail($courseId: ID!, $termId: ID!) {
    course(courseId: $courseId) {
      courseId
      name
      gradeLevel
    }
    term(termId: $termId) {
      termId
      name
      schoolYear
    }
  }
`;

export default function CourseDetail({ match }) {
  const { loading, error, data } = useQuery<CourseDetail, CourseDetailVariables>(QUERIES, {
    variables: { courseId: match.params.resourceID, termId: match.params.termId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const primaryHeader = ({ name, gradeLevel }) => `${name} - Grade ${gradeLevel}`;
  const secondaryHeader = ({ name, schoolYear }) => `${name} - ${schoolYear}`;

  return (
    <div>
      <Header primary={primaryHeader(data.course)} secondary={secondaryHeader(data.term)} />
      <Menu pointing attached>
        <MenuLink to={`${match.url}/grades`} name="Grades" />
        <MenuLink to={`${match.url}/students`} name="Students" />
        <MenuLink to={`${match.url}/assignments`} name="Assignments" />
        <MenuLink to={`${match.url}/settings`} name="Settings" />
      </Menu>
      <Switch>
        <Route path={`${match.path}/grades`} component={Grades} />
        <Route path={`${match.path}/students`} component={Students} />
        <Route path={`${match.path}/assignments`} component={Assignments} />
        <Route path={`${match.path}/settings`} component={Settings} />
      </Switch>
    </div>
  );
}
