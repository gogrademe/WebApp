import {CALL_API} from '../const';
import {Schemas} from '../const/schema';

// Constants
const LOAD = 'gradebook/LOAD';
const LOAD_SUCCESS = 'gradebook/LOAD_SUCCESS';
const LOAD_FAIL = 'gradebook/LOAD_FAIL';

function fetchGradebook(courseId,termId) {
  return {
    [CALL_API]: {
      types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
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
