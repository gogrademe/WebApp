require! {
  React
  './api.ls'
}


Auth =
  is-logged-in: ->
    !!localStorage.token

  login: ({email, password}) ->
    email = email.trim!
    password = password.trim!
    if email isnt "" and password isnt ""
      api.session.create {email: email, password: password}
      .then ~>
        @_setLoggedIn api.auth.token

  _setLoggedOut: ->
    localStorage.removeItem "token"

  _setLoggedIn: (token) ->
    new Promise (resolve, reject) ~>
      # TODO: This is unreliable! Doesn't work when token === undefined
      if token? or token isnt ""
        localStorage.setItem "token", token

        resolve!
      else
        @_setLoggedOut!
        reject "token not valid"

  current-user: ->
    if @isLoggedIn
      tokenInfo = localStorage.token.split(".")[1]
      return JSON.parse(window.atob(tokenInfo))
    {}

module.exports = Auth
