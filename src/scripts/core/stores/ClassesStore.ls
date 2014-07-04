require! {
  React
  Fluxxor
  '../../api/api.ls'
}


/*Fluxxor = require("fluxxor")*/
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
    api.class.find!
      .then ->
        
    /*request.get("/classes").end ((error, res) ->
      @gbClasses = res.body
      @emit "change"
    ).bind()*/
    return

  onAddClass: (payload) ->
    @gbClasses.push do
      className: "a"
      gradeLevel: "Second Grade"

    @emit "change"
    return
)
module.exports = ClassesStore
