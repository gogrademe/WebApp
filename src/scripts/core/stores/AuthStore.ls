require! {
  React
}


Fluxxor = require("fluxxor")
request = require("./api.ls")
AuthStore = Fluxxor.createStore(
  actions:
    LOGIN_AUTH: "onLoginAuth"

  initialize: ->
    @isLoggedIn = !!localStorage.token
    @currentUser = @_currentUser()
    @isLoggingIn = false
    return

  onLoginAuth: (payload) ->
    @isLoggingIn = true
    email = payload.email.trim()
    password = payload.password.trim()
    if email isnt "" and password isnt ""
      request.post("/session").send(
        email: email
        password: password
      ).end ((error, res) ->
        if res.status is 200
          @_setLoggedIn res.body.token
        else
          @_setLoggedOut()
        return
      ).bind()
    @emit "change"

  onLogout: (payload) ->

  getState: ->
    currentUser: @currentUser
    isLoggedIn: @isLoggedIn
    isLoggingIn: @isLoggingIn

  _setLoggedOut: ->
    localStorage.removeItem "token"
    @isLoggingIn = false
    @isLoggedIn = false
    @emit "change"

  _setLoggedIn: (token) ->
    console.log token
    console.log token isnt ""

    # TODO: This is unreliable! Doesn't work when token === undefined
    if token? or token isnt ""
      console.log token
      localStorage.setItem "token", token
      @isLoggingIn = false
      @isLoggedIn = true

      # TODO: This looks bad!
      @currentUser = @_currentUser()
      @emit "change"
    else
      @_setLoggedOut()

  _currentUser: ->
    if @isLoggedIn
      tokenInfo = localStorage.token.split(".")[1]
      return JSON.parse(window.atob(tokenInfo))
    {}
)
module.exports = AuthStore
