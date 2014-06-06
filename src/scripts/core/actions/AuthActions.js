module.exports = {
	loginAuth: function(email, password){
		this.dispatch('LOGIN_AUTH', {email: email, password: password});
	},
	getAllClasses: function(){
		this.dispatch('GET_CLASSES', {});
	}
};
