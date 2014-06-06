'use strict';

var Fluxxor = require('fluxxor');
var request = require('./api');
var ClassesStore = Fluxxor.createStore({
    actions: {
      "GET_CLASSES": "onGetAllClasses",
      "ADD_CLASS": "onAddClass"
    },
    initialize: function() {
      this.gbClasses = [];
    },
    getState: function() {
      return this.gbClasses;
    },
    onGetAllClasses: function(payload) {

      request
          .get('/classes')
          .end((error, res) =>{
            this.gbClasses = res.body;
            return this.emit('change');
          });
    },
    onAddClass: function(payload) {
      this.gbClasses.push({className: 'a', gradeLevel: 'Second Grade'});
      this.emit('change');
    }
  });
module.exports = ClassesStore;
