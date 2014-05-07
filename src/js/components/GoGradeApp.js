/** @jsx React.DOM */
var React = require('react');
var Router = require('director').Router;
var Header = require('./header/header');

var AuthStore = require('../stores/AuthStore');

/** Pages **/
var LoginPage = require('../pages/LoginPage');
var ClassMain = require('../pages/class/ClassContainerPage');

// var routes = {
//       '': LoginPage,
//       'classes': ClassMain
//     };

  var router = new Router();

  // router.on('/', function () {
  //   React.renderComponent(LoginPage(null), document.getElementById('inner'));
  // });
  // router.on('/classes', function () {
  //   React.renderComponent(ClassMain(null), document.getElementById('inner'));
  // });
        // router.on('/', function () {
        //     console.log(router);
        //     return
        // });
        // router.on('/classes', function () {
        //     console.log(router.getRoute());
        //     return <ClassMain />;
        // });
router.on('*', function() {return});

function getAppState() {
    return {
        currentUser: AuthStore.getCurrentUser(),
        loggedIn: AuthStore.isLoggedIn()
    };
}
var GoGradeApp = React.createClass({
    getInitialState: function() {
        return getAppState();
    },
    componentWillMount: function() {
        router.on(*)
    }
    componentDidMount: function() {
        console.log(this.state.loggedIn);
        /** Start Router **/
        router.init('/');
        // Router.start(document.getElementById('inner'), routes);
        AuthStore.addChangeListener(this._onChange);
    },
    render: function() {
        console.log(router.getRoute());
        if (router.getRoute() == ['']) {
            return <LoginPage />;
        }
        if (router.getRoute() == ["classes"]) {
            return <ClassMain />;
        }

        return <div />;

    },
    _onChange: function() {
        this.setState(getAppState());
    }
});

module.exports = GoGradeApp;