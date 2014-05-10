var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AuthConstants = require('../constants/AuthConstants');
var request = require('superagent');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';


var _currentUser = {};
// var _token = null;
// var _isLoggedIn = false;

// var _isLoggedIn = function() {
//   console.log(_currentUser);
//   if(_currentUser){
//     return true;
//   } else {
//     return false;
//   }
// };

function _setLoggedIn(token) {
    if (token != null || token != '') {
        localStorage.setItem('loginToken', token);

        return AuthStore.emitChange();
    } else {
        return _setLoggedOut({
            error: "There was an error logging in."
        });
    }
}

function _setLoggedOut(opts) {
    // if (opts.error) {
    //   // redirect with error and delete anything that is not needed.
    // }
    localStorage.removeItem('loginToken');
}

function _isLoggedIn() {
    var token = localStorage.getItem('loginToken');
    if (token == null) {
        _setLoggedOut();
        return false;
    } else {
        return true;
    }
}


function login(username, password) {
    request
        .post('http://10.1.1.109:3000/authenticate')
        .type('form')
        .send({
            username: username,
            password: password
        })
        .end(function(error, res) {
            console.log(res);
            if (res.status == 200) {
                _setLoggedIn(res.body.token);
            } else {
                _setLoggedOut({
                    error: "Invalid username or password!"
                });
                console.log("Authentication failed");
            }
        });
};
var AuthStore = merge(EventEmitter.prototype, {
    getCurrentUser: function() {
        return _currentUser;
    },
    isLoggedIn: function() {
        return _isLoggedIn();
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

    switch (action.actionType) {
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