/*{}= require 'react'



create = (student) ->
  id = Date.now()
  student.id = id
  _students.push student
  return
update = (id, updates) ->
  _students = merge(_students[id], updates)
  return
destroy = (id) ->
  delete _students[id]

  return
EventEmitter = require("events").EventEmitter
request = require("superagent")
merge = require("react/lib/merge")
StudentConstants = require("../constants/StudentConstants.ls")
AppDispatcher = require("../dispatcher/AppDispatcher.ls")
CHANGE_EVENT = "change"
_students = []
StudentStore = merge(EventEmitter::,
  getAll: ->
    _students

  emitChange: ->
    @emit CHANGE_EVENT
    return



  @param {function} callback

  addChangeListener: (callback) ->
    @on CHANGE_EVENT, callback
    return



  @param {function} callback

  removeChangeListener: (callback) ->
    @removeListener CHANGE_EVENT, callback
    return
)

# Register to handle all updates
AppDispatcher.register (payload) ->
  action = payload.action
  switch action.actionType
    when StudentConstants.STUDENT_CREATE
      create action.student
    else
      return true
  StudentStore.emitChange()
  true # No errors.  Needed by promise in Dispatcher.

module.exports = StudentStore*/
