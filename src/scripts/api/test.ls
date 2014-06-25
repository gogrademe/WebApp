require! './api'
api.base-url = 'http://localhost:5000/api'

console.log "Logging in"
api.session.create {email: "test@test.com", password: "somePassword"}
.finally ->
    console.log it
    console.log it?.status-code
