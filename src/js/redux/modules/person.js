// Constants
const LOAD = 'person/LOAD';
const LOAD_SUCCESS = 'person/LOAD_SUCCESS';
const LOAD_FAIL = 'person/LOAD_FAIL';

const initialState = {
  isFetching: false,
  people: null
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
        people: action.result.data,
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


export function fetchPeople() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/person')
  };
}

// function fetchPeople() {
//   return {
//     [CALL_API]: {
//       types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
//       endpoint: `person`,
//       schema: Schemas.PERSON_ARRAY
//     }
//   };
// }

export function loadPeople() {
  return (dispatch, getState) => {
    return dispatch(fetchPeople());
  };
}
