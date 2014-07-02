{}= require 'react'
c = require("../constants") 


module.exports =
  loginAuth: (email, password) ->
    @dispatch "LOGIN_AUTH",
      email: email
      password: password

    return

  getAllClasses: ->
    @dispatch "GET_CLASSES", {}
    return

  addClass: ->
    @dispatch "ADD_CLASS", {}
    return

  getAllPeople: ->
    @dispatch "GET_ALL_PEOPLE", {}
    return

  addPerson: (payload) ->
    @dispatch "ADD_PERSON", payload
    return