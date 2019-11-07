import {CALL_API} from '../const';
import {Schemas} from '../const/schema';

const COURSE_REQUEST = 'course/REQUEST';
const COURSE_SUCCESS = 'course/SUCCESS';
const COURSE_FAILURE = 'course/FAILURE';

function fetchCourses() {
  return {
    [CALL_API]: {
      types: [COURSE_REQUEST, COURSE_SUCCESS, COURSE_FAILURE],
      endpoint: 'course',
      schema: Schemas.COURSE_ARRAY
    }
  };
}

export function loadCourses() {
  return (dispatch, getState) => {
    return dispatch(fetchCourses());
  };
}

export function fetchCourse(courseId) {
  return {
    [CALL_API]: {
      types: [COURSE_REQUEST, COURSE_SUCCESS, COURSE_FAILURE],
      endpoint: `course/${courseId}`,
      schema: Schemas.COURSE
    }
  };
}

const CREATE_COURSE_REQUEST = 'course.create/REQUEST';
const CREATE_COURSE_SUCCESS = 'course.create/SUCCESS';
const CREATE_COURSE_FAILURE = 'course.create/FAILURE';

export function createCourse(course) {
  return {
    [CALL_API]: {
      types: [CREATE_COURSE_REQUEST, CREATE_COURSE_SUCCESS, CREATE_COURSE_FAILURE],
      endpoint: 'course',
      method: 'POST',
      body: course,
      schema: Schemas.COURSE
    }
  };
}
