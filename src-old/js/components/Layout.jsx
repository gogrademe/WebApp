/**
 * @jsx React.DOM
 */

var React = require('react');

var Header = require('./header/header');
// var AuthStore = require('../stores/AuthStore');

// function getAppState() {
//     return {
//         currentUser: AuthStore.getCurrentUser(),
//         isLoggedIn: AuthStore.isLoggedIn()
//     };
// }

var Layout = React.createClass({
  // getInitialState: function () {
  //   return getAppState();
  // },
  // componentWillMount: function () {
  //   AuthStore.addChangeListener(this._onChange);
  // },
  // componentWillUnmount: function() {
  //   AuthStore.removeChangeListener(this._onChange);
  // },
  componentWillMount: function() {
    console.log(this.props.isLoggedIn);
  },
  render: function() {
    return (
      <div>
        // <Header loggedIn={this.props.isLoggedIn} />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  },
  // _onChange: function() {
  //   this.setState(getAppState());
  // }

});

module.exports = Layout;