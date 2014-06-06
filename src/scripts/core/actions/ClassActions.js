module.exports = {
	getAll: function(){
		this.dispatch('GET_CLASSES', {});
	},
	addClass: function(){
		this.dispatch('ADD_CLASS', {});
	}
};
