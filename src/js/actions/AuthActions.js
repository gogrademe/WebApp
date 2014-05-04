var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthConstants = require('../constants/AuthConstants');

var AuthActions = {
    login: function(username, password) {
        AppDispatcher.handleViewAction({
            actionType: AuthConstants.AUTH_LOGIN,
            username: username,
            password: password
        });
    }
}

module.exports = AuthActions;