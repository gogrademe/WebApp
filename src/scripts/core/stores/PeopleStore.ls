require! {
  React
}

Fluxxor = require("fluxxor")
Actions = require("../actions/AuthActions.ls")
request = require("./api.ls")
PeopleStore = Fluxxor.createStore(
  actions:
    GET_ALL_PEOPLE: "getAllPeople"
    ADD_PERSON: "onAddPerson"

  initialize: ->
    @people = []
    return

  getState: ->
    @people

  ongetPerson: (payload) ->
    request.get("/people/" + payload.id).on("error", (err) ->
      @emit "error", payload
    ).end ((err, res) ->
      return @emit("error", payload)  if res.status isnt 200
      utils.findIndex
      return
    ).bind()
    return

  getAllPeople: (payload) ->
    request.get("/people").on("error", ->
      console.log "err"
      return
    ).end ((error, res) ->
      return @emit("error", payload)  if res.status isnt 200
      @people = res.body
      @emit "change"
    ).bind()
    return

  onAddPerson: (payload) ->
    console.log payload
    request.post("/people/create").send(payload).on("error", ->
      @emit "error"
    ).end ((error, res) ->
      if res.status isnt 200
        console.log res
        return @emit("error",
          payload: payload
          errors: res.text
        )
      @people.push res.body
      @emit "success"
      @emit "change"
    ).bind()
    return
)
module.exports = PeopleStore
