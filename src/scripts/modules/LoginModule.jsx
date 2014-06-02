
var React = require('react');
var Panel = require('../components/Panel.jsx');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var FluxChildMixin = Fluxxor.FluxChildMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

// var LoginPage = React.createClass({
//   mixins: [FluxChildMixin, StoreWatchMixin("AuthStore")],
//   getStateFromFlux: function() {
//     var flux = this.getFlux();
//     return {
//       // AuthStore: flux.store("AuthStore").getState()
//     }
//   },
//   getInitialState : function() {
//     return {
//       AuthStore: {}
//     }
//   },
//   handleSubmit: function(e) {
//     e.preventDefault();
//     var email = this.refs.email.getDOMNode().value.trim();
//     var password = this.refs.password.getDOMNode().value.trim();
//
//     // AuthActions.login(email, password);
//     // this.getFlux().actions.loginAuth(email, password);
//   },
//   componentWillMount: function() {
//     if (!this.state.isLoggedIn) {
//       console.log('is logged in should be moving to dashboard');
//     }
//   },
//   render: function() {
//     return (
//       <Panel className="form-login" title="Login" hasBody>
//         <form className = "form-horizontal" onSubmit={this.handleSubmit}>
//           <div className="input-group field">
//             <span className="input-group-addon"><i className="fa fa-user fa-fw"></i></span>
//             <input type="text" className="form-control" placeholder="Email Address" ref="email" required/>
//           </div>
//           <div className="input-group field">
//             <span className="input-group-addon"><i className="fa fa-lock fa-fw"></i ></span>
//             <input type="password" className="form-control" placeholder="Password" ref="password" required/>
//           </div>
//           <div className="field">
//             <button type="submit" role="button" className="btn btn-primary btn-block" value="Post" disabled={this.state.AuthStore.isLoggingIn}>
//             <LoginLoading isLoggingIn={this.state.AuthStore.isLoggingIn} /> Log in </button>
//           </div>
//         </form>
//       </Panel>
//       );
//   }
// });

var LoginPage = React.createClass({
  // mixins: [FluxChildMixin],
  // getStateFromFlux: function() {
  //
  //   // var flux = this.getFlux();
  //   // console.log(flux);
  //   return {
  //     AuthStore: flux.store("AuthStore").getState()
  //   }
  // },
  getInitialState : function() {
    console.log("flux:", flux);
    return {
      AuthStore: this.props.flux.store("AuthStore").getState()
    }
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var email = this.refs.email.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();

    // AuthActions.login(email, password);
    this.props.flux.actions.loginAuth(email, password);
  },
  render: function() {
    return (
      <Panel className="form-login" title="Login" hasBody>
        <form className = "form-horizontal" onSubmit={this.handleSubmit}>
          <div className="input-group field">
            <span className="input-group-addon"><i className="fa fa-user fa-fw"></i></span>
            <input type="text" className="form-control" placeholder="Email Address" ref="email" required/>
          </div>
          <div className="input-group field">
            <span className="input-group-addon"><i className="fa fa-lock fa-fw"></i ></span>
            <input type="password" className="form-control" placeholder="Password" ref="password" required/>
          </div>
          <div className="field">
            <button type="submit" role="button" className="btn btn-primary btn-block" value="Post">
            <LoginLoading isLoggingIn={this.state.AuthStore.isLoggingIn} /> Log in </button>
          </div>
        </form>
      </Panel>
      );
    }
});


var LoginLoading = React.createClass({
  render: function() {
    var style = {};
    if(!this.props.isLoggingIn === true) {
      style.display = 'none';
    }
    return (
        <i className="fa fa-cog fa-spin" style={style}></i>
      );
  }
});


module.exports = LoginPage;
