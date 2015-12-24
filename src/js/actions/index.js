import { CALL_API, Schemas } from '../redux/middleware/api';

export const GRADEBOOK_REQUEST = 'GRADEBOOK_REQUEST';
export const GRADEBOOK_SUCCESS = 'GRADEBOOK_SUCCESS';
export const GRADEBOOK_FAILURE = 'GRADEBOOK_FAILURE';

function fetchGradebook(courseId,termId) {
  return {
    [CALL_API]: {
      types: [GRADEBOOK_REQUEST, GRADEBOOK_SUCCESS, GRADEBOOK_FAILURE],
      endpoint: `course/${courseId}/term/${termId}/gradebook`,
      schema: Schemas.ATTEMPT_ARRAY
    }
  };
}

export function loadGradebook(courseId,termId) {
  return (dispatch, getState) => {
    return dispatch(fetchGradebook(courseId,termId));
  };
}


export const ASSIGNMENT_REQUEST = 'ASSIGNMENT_REQUEST';
export const ASSIGNMENT_SUCCESS = 'ASSIGNMENT_SUCCESS';
export const ASSIGNMENT_FAILURE = 'ASSIGNMENT_FAILURE';

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



export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  };
}
