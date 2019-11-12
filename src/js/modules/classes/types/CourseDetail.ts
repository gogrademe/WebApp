/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CourseDetail
// ====================================================

export interface CourseDetail_course {
  __typename: "Course";
  courseId: string;
  name: string;
  gradeLevel: string;
}

export interface CourseDetail_term {
  __typename: "Term";
  termId: string;
  name: string;
  schoolYear: number;
}

export interface CourseDetail {
  course: CourseDetail_course;
  term: CourseDetail_term;
}

export interface CourseDetailVariables {
  courseId: string;
  termId: string;
}
