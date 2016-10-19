import * as api from '../api';

// Constants
const LOAD = 'gradebook/LOAD';
const LOAD_SUCCESS = 'gradebook/LOAD_SUCCESS';
const LOAD_FAIL = 'gradebook/LOAD_FAIL';

const initialState = {
  isFetching: false,
  grades: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return Object.assign({}, state, {
        isFetching: true
      });
    case LOAD_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        grades: action.result.data,
      });
    case LOAD_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
}


function fetchGradebook(courseId,termId) {
  return {
      types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
      promise: () => api.getGrades(courseId,termId)
  };
}

export function loadGradebook(courseId,termId) {
  return (dispatch, getState) => {
    return dispatch(fetchGradebook(courseId,termId));
  };
}
