import { Schema, arrayOf, normalize } from 'normalizr';

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/gaearon/normalizr
const attemptSchema = new Schema('attempts', {
  idAttribute: 'attemptId'
});

const personSchema = new Schema('people', {
  idAttribute: 'personId'
});

const groupSchema = new Schema('groups', {
  idAttribute: 'groupId'
});

const assignmentSchema = new Schema('assignments', {
  idAttribute: 'assignmentId'
});

assignmentSchema.define({
  group: groupSchema
});



// Schemas for Github API responses.
export const Schemas = {
  ATTEMPT: attemptSchema,
  ATTEMPT_ARRAY: arrayOf(attemptSchema),
  PERSON: personSchema,
  PERSON_ARRAY: arrayOf(personSchema),
  ASSIGNMENT: assignmentSchema,
  ASSIGNMENT_ARRAY: arrayOf(assignmentSchema),
  GROUP: groupSchema,
  GROUP_ARRAY: arrayOf(groupSchema)
};
