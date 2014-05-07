var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AuthConstants = require('../constants/AuthConstants');
var request = require('superagent');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';


var _currentUser = {};
var _isLoggedIn = false;
// var _isLoggedIn = function() {
//   console.log(_currentUser);
//   if(_currentUser){
//     return true;
//   } else {
//     return false;
//   }
// };
function login(username, password) {
    request
    .post('http://localhost:3000/authenticate')
    .type('form')
    .send({username: username, password:password})
    .end(function(error, res){
      console.log(res);
      if (res.status != 200) {
        _isLoggedIn = false;
        console.log("Authentication failed");
      } else {
        _isLoggedIn = true;
      }
    });
}
var AuthStore = merge(EventEmitter.prototype, {
  getCurrentUser: function() {
    //{userName: 'Someone', role: 'Admin'}
    return _currentUser;
  },
  isLoggedIn: function() {
    return _isLoggedIn;
  },

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
  console.log(payload);
  var action = payload.action;
  var username;
  var password;

  switch(action.actionType) {
    case AuthConstants.AUTH_LOGIN:
      username = action.username.trim();
      password = action.password.trim();
      if (username !== '' && password !== '') {
        login(username, password);
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