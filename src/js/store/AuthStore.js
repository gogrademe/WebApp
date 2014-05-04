var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AuthConstants = require('../constants/AuthConstants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _auth = {};


function login(username, password) {
    request
    .post('http://localhost:3000/authenticate')
    .type('form')
    .send({username: username, password:password})
    .end(function(error, res){
      console.log(res);
      if (res.Error) {
        console.log("Authentication failed");
      }
    });
}
var AuthStore = merge(EventEmitter.prototype, {


  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});
// Register to handle all updates
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case AuthConstants.AUTH_LOGIN:
      text = action.text.trim();
      if (text !== '') {
        create(text);
      }
      break;

    default:
      return true;
  }

  // This often goes in each case that should trigger a UI change. This store
  // needs to trigger a UI change after every view action, so we can make the
  // code less repetitive by putting it here.  We need the default case,
  // however, to make sure this only gets called after one of the cases above.
  AuthStore.emitChange();

  return true; // No errors.  Needed by promise in Dispatcher.
})

module.exports = AuthStore;