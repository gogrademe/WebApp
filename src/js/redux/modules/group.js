import { CALL_API } from "../const";
import { Schemas } from "../const/schema";

import * as _ from "lodash";
import values from "lodash/fp/values";
import flow from "lodash/fp/flow";
import filter from "lodash/fp/filter";

const GROUP_REQUEST = "group/REQUEST";
const GROUP_SUCCESS = "group/SUCCESS";
const GROUP_FAILURE = "group/FAILURE";

function fetchGroups(courseId, termId) {
  return {
    [CALL_API]: {
      types: [GROUP_REQUEST, GROUP_SUCCESS, GROUP_FAILURE],
      endpoint: `group?courseId=${courseId}&termId=${termId}`,
      schema: Schemas.GROUP_ARRAY
    }
  };
}

export function loadGroups(courseId, termId) {
  return (dispatch, getState) => {
    return dispatch(fetchGroups(courseId, termId));
  };
}

// export const selectCourseGroups = (state, courseId) => _.values(state).filter({'courseId':courseId})
export const selectCourseGroups = (state, courseId, termId) =>
  flow(
    values,
    filter({ courseId: Number(courseId), termId: Number(termId) })
  )(state.entities.groups);
