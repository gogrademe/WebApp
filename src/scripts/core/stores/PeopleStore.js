'use strict';

var Fluxxor = require('fluxxor');

var PeopleStore = Fluxxor.createStore({
    actions: {

    },
    initialize: function() {
        this.people = [];
    },
    getState: function() {
      return this.people;
    }
  });
module.exports = PeopleStore;
