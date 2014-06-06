'use strict';
var Fluxxor = require('fluxxor');
var request = require('./api');

var AuthStore = Fluxxor.createStore({
    actions: {
        "LOGIN_AUTH": "onLoginAuth",
    },
    initialize: function() {
        this.isLoggedIn = !!localStorage.token;
        this.currentUser = this._currentUser();
        this.isLoggingIn = false;
    },
    onLoginAuth: function(payload) {
        this.isLoggingIn = true;
        var email = payload.email.trim();
        var password = payload.password.trim();
        if (email !== '' && password !== '') {
            request
                .post('/auth/login')
                .type('form')
                .send({
                    email: email,
                    password: password
                })
                .end((error, res) =>{
                    if (res.status == 200) {
                        this._setLoggedIn(res.body.token);
                    } else {
                        this._setLoggedOut();
                    }
                });
        }
        return this.emit('change');
    },
    onLogout: function(payload){

    },
    getState: function() {
        return {
            currentUser: this.currentUser,
            isLoggedIn: this.isLoggedIn,
            isLoggingIn: this.isLoggingIn
        };
    },
    _setLoggedOut: function() {
        localStorage.removeItem('token');
        this.isLoggingIn = false;
        this.isLoggedIn = false;
        return this.emit('change');
    },
    _setLoggedIn: function(token) {
        console.log(token);
        console.log(token !== '');
        // TODO: This is unreliable! Doesn't work when token === undefined
        if (token != null || token !== '') {
            console.log(token);
            localStorage.setItem('token', token);
            this.isLoggingIn = false;
            this.isLoggedIn = true;

            // TODO: This looks bad!
            this.currentUser = this._currentUser();

            return this.emit('change');
        } else {
            return this._setLoggedOut();
        }
    },
    _currentUser: function() {
        if (this.isLoggedIn) {
            var tokenInfo = localStorage.token.split('.')[1];
            return JSON.parse(window.atob(tokenInfo));
        }
        return {};
    }
});


module.exports = AuthStore;
