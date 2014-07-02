{}= require 'react'
"use strict" 


Fluxxor = require("fluxxor")
request = require("./api")
ClassesStore = Fluxxor.createStore(
  actions:
    GET_CLASSES: "onGetAllClasses"
    ADD_CLASS: "onAddClass"

  initialize: ->
    @gbClasses = []
    return

  getState: ->
    @gbClasses

  onGetAllClasses: (payload) ->
    request.get("/classes").end ((error, res) ->
      @gbClasses = res.body
      @emit "change"
    ).bind()
    return

  onAddClass: (payload) ->
    @gbClasses.push
      className: "a"
      gradeLevel: "Second Grade"

    @emit "change"
    return
)
module.exports = ClassesStore