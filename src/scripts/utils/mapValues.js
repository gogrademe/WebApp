import _ from 'lodash';

function mapValues(obj, iterator, context) {
  return _.object(
    _.keys(obj),
    _.map(_.values(obj), iterator, context)
  );
}

module.exports = mapValues;
