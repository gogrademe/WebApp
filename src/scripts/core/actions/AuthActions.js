module.exports = {
	loginAuth: function(email, password){
		this.dispatch('LOGIN_AUTH', {email: email, password: password});
	},
	getAllClasses: function(){
		this.dispatch('GET_CLASSES', {});
	},
	addClass: function(){
		this.dispatch('ADD_CLASS', {});
	},
	getAllPeople: function(){
		this.dispatch('GET_ALL_PEOPLE', {});
	},
	addPerson: function(payload){
		this.dispatch('ADD_PERSON', payload);
	},
};
