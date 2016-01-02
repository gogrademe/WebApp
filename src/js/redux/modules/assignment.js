import {CALL_API} from '../const';
import {Schemas} from '../const/schema';

const ASSIGNMENT_REQUEST = 'assignment/REQUEST';
const ASSIGNMENT_SUCCESS = 'assignment/SUCCESS';
const ASSIGNMENT_FAILURE = 'assignment/FAILURE';

function fetchAssignments() {
  return {
    [CALL_API]: {
      types: [ASSIGNMENT_REQUEST, ASSIGNMENT_SUCCESS, ASSIGNMENT_FAILURE],
      endpoint: `assignment`,
      schema: Schemas.ASSIGNMENT_ARRAY
    }
  };
}

export function loadAssignments() {
  return (dispatch, getState) => {
    return dispatch(fetchAssignments());
  };
}
