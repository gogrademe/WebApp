import {CALL_API} from '../const';
import {Schemas} from '../const/schema';

const TERM_REQUEST = 'term/REQUEST';
const TERM_SUCCESS = 'term/SUCCESS';
const TERM_FAILURE = 'term/FAILURE';

function fetchTerms() {
  return {
    [CALL_API]: {
      types: [TERM_REQUEST, TERM_SUCCESS, TERM_FAILURE],
      endpoint: 'term',
      schema: Schemas.TERM_ARRAY
    }
  };
}

export function loadTerms() {
  return (dispatch, getState) => {
    return dispatch(fetchTerms());
  };
}
