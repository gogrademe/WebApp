module.exports = {
	loginAuth: function(email, password){
		this.dispatch('LOGIN_AUTH', {email: email, password: password});
	}
};

