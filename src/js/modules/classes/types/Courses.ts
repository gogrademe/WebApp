/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Courses
// ====================================================

export interface Courses_courses {
  __typename: "Course";
  courseId: string;
  name: string;
  gradeLevel: string;
}

export interface Courses_terms {
  __typename: "Term";
  termId: string;
  name: string;
  schoolYear: number;
}

export interface Courses {
  courses: Courses_courses[];
  terms: Courses_terms[];
}
