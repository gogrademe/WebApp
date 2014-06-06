'use strict';

var Fluxxor = require('fluxxor');
var request = require('superagent');
var ClassesStore = Fluxxor.createStore({
    actions: {
      "GET_CLASSES": "onGetAllClasses",
    },
    initialize: function() {
        this.gbClasses = [];
    },
    getState: function() {
      return this.gbClasses;
    },
    onGetAllClasses: function(payload) {

      request
          .get(AppCfg.apiUrl + '/classes')
          .end((error, res) =>{
            this.gbClasses = res.body;
            return this.emit('change');
          });
},
  });
module.exports = ClassesStore;
