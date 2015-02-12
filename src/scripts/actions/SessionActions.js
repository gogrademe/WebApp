var Reflux = require('reflux');

var SessionActions = Reflux.createActions([
    "invalidateSession",
    "setSession"
]);

module.exports = SessionActions;
