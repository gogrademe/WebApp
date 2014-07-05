module.exports =
  login: (email, password) !->
    @dispatch "LOGIN_AUTH",
      email: email
      password: password
