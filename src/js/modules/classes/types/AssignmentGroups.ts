/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AssignmentGroups
// ====================================================

export interface AssignmentGroups_assignmentGroups {
  __typename: "AssignmentGroup";
  groupId: string;
  name: string;
  termId: string;
  courseId: string;
  weight: number;
}

export interface AssignmentGroups {
  assignmentGroups: AssignmentGroups_assignmentGroups[];
}

export interface AssignmentGroupsVariables {
  courseId: string;
  termId: string;
}
