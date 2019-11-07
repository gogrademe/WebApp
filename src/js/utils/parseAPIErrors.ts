import _ from "lodash";

// parseAPIErrors will parse an error that looks like the following.
// [{
//     "fieldNames":["name", "lastName"],
//     "message":"missing required field"
//   },
//   {
//     "fieldNames":["weight"],
//     "message":"must be between .5% and 100%"
// }];
function parseAPIErrors(errors: any): Object {
  var newErrs = {};
  _(errors).forEach(function(err) {
    _(err.fieldNames).forEach(function(f) {
      newErrs[f] = err.message;
    });
  });
  return newErrs;
}
export default parseAPIErrors;
// module.exports = parseAPIErrors;
