

var Reflux = require('reflux');
var api = require('../api/api.ls');

var actions = require('../actions/SessionActions');

var SessionStore = Reflux.createStore({
  listenables: actions,
  getInitialState: function () {
    this.session = {
      token: localStorage.getItem("token")
    };

    return this.session;
  },
  onInvalidateSession: function() {
    this.session = {
      token: null
    };

    localStorage.removeItem("token");
    this.trigger(this.session);

  },
  // onSetSession: function(token) {
  //   localStorage.setItem("token", token);
  //   this.session = {
  //     token: localStorage.getItem("token")
  //   };
  //   this.trigger(this.session);
  //
  // },
  isLoggedIn: function () {
    switch (false) {
    case !localStorage.token:
      return localStorage.token;
    default:
      return null;
    }
  },
  login: function (arg$) {
    var email, password, this$ = this;
    email = arg$.email, password = arg$.password;
    email = email.trim();
    password = password.trim();
    if (email !== "" && password !== "") {
      return api.session.create({
        email: email,
        password: password
      }).then(function () {
        return this$._setLoggedIn(api.auth.token);
      });
    }
  },
  _setLoggedOut: function () {
    return localStorage.removeItem("token");
  },
  _setLoggedIn: function (token) {
    var this$ = this;
    return new Promise(function (resolve, reject) {
      if (token != null || token !== "") {
        localStorage.setItem("token", token);
        return resolve();
      } else {
        this$._setLoggedOut();
        return reject("token not valid");
      }
    });
  },
  currentUser: function () {
    var tokenInfo;
    if (this.isLoggedIn()) {
      tokenInfo = localStorage.token.split(".")[1];
      return JSON.parse(window.atob(tokenInfo));
    }
    return {};
  }

});

module.exports = SessionStore;
