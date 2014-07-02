'use strict';

var Fluxxor = require('fluxxor');
var Actions = require('../actions/AuthActions.js');
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
    ongetPerson: function(payload) {
      request
        .get('/people/' + payload.id)
        .on('error', function(err) {
          return this.emit('error', payload)
        })
        .end(function(err, res) {
          if (res.status !== 200) {
            return this.emit('error', payload);
          }
          utils.findIndex
        }.bind());
    },
    getAllPeople: function(payload) {

      request
          .get('/people')
          .on('error', function(){
            console.log('err');
          })
          .end(function(error, res){
            if(res.status !== 200) {
              return this.emit('error', payload);
            }
            this.people = res.body;
            return this.emit('change');
          }.bind());
    },
    onAddPerson: function(payload) {
      console.log(payload);
      request
          .post('/people/create')
          .send(payload)
          .on('error', function(){
            return this.emit('error');
          })
          .end(function(error, res){
            if(res.status !== 200) {
              console.log(res);
              return this.emit('error', {payload: payload, errors: res.text});
            }

            this.people.push(res.body);

            this.emit('success');
            return this.emit('change');
          }.bind());
    }
  });
module.exports = PeopleStore;
