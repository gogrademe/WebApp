/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Assignments
// ====================================================

export interface Assignments_assignments_group {
  __typename: "AssignmentGroup";
  name: string;
  weight: number;
}

export interface Assignments_assignments {
  __typename: "Assignment";
  assignmentId: string;
  name: string;
  dueDate: any | null;
  courseId: string;
  termId: string;
  group: Assignments_assignments_group;
  maxScore: number;
}

export interface Assignments {
  assignments: Assignments_assignments[];
}

export interface AssignmentsVariables {
  courseId: string;
  termId: string;
}
