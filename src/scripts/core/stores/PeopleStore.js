'use strict';

var Fluxxor = require('fluxxor');

var request = require('./api');
var PeopleStore = Fluxxor.createStore({
    actions: {
      'GET_ALL_PEOPLE':'getAllPeople',
      'ADD_PERSON':'onAddPerson'
    },
    initialize: function() {
        this.people = [];
    },
    getState: function() {
      return this.people;
    },
    getAllPeople: function(payload) {

      request
          .get('/people')
          .on('error', function(){
            console.log('err');
          })
          .end((error, res) =>{
            if(res.status !== 200) {
              return 'error'
            }
            this.people = res.body;
            return this.emit('change');
          });
    },
    onAddPerson: function(payload) {
      console.log(payload);
      request
          .post('/people/create')
          .send(payload)
          .on('error', function(){
            console.log('err');
          })
          .end((error, res) =>{
            if(res.status !== 200) {
              console.log(res.body);
              return 'error'
            }
            this.people.push(res.body);
            return this.emit('change');
          });
    }
  });
module.exports = PeopleStore;
