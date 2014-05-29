var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthConstants = require('../constants/AuthConstants');

var AuthActions = {
    login: function(email, password) {
        AppDispatcher.handleViewAction({
            actionType: AuthConstants.AUTH_LOGIN,
            email: email,
            password: password
        });
        console.log('Logging In');
    }
}

module.exports = {
	loginAuth: function(email, password){
		this.dispatch('LOGIN_AUTH', {email: email, password: password});
	}
};

