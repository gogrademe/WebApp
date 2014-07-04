require 'LiveScript'
require! './api'
api.base-url = 'http://localhost:5005/api'

console.log "Logging in"
api.session.create {email: "test@test.com", password: "somePassword"}
.then ->
    console.log it?.body
.then ->
    api.person.find!
.then ->
    console.log JSON.stringify it, null, 4
.then ->
  api.person.get "0496d740-d58d-41ee-b948-87abd2fa183c"
.then ->
  console.log JSON.stringify it, null, 4
.then ->
  api.class.find!
.then ->
  console.log JSON.stringify it, null, 4
.catch (err) ->
    x = {}
    for key, val of err
        x[key] = val unless typeof val is 'object'
    console.log x
