{}= require 'react'




# /**  */
#
# React = require('react');
#
# // RRouter
# var RRouter = require('rrouter');
# var Routes = RRouter.Routes;
# var Route = RRouter.Route;
#
# //Fluxxor
# var Fluxxor = require('fluxxor');
# var FluxMixin = Fluxxor.FluxMixin(React);
# var FluxChildMixin = Fluxxor.FluxChildMixin(React);
# var StoreWatchMixin = Fluxxor.StoreWatchMixin;
#
# var AuthStore = Fluxxor.createStore({
#     actions: {
#         "LOGIN_AUTH": "onLoginAuth",
#     },
#     initialize: function() {
#         this.isLoggedIn = !!localStorage.token;
#         this.currentUser = this._currentUser();
#         this.isLoggingIn = false;
#     }
# });
# var actions = require('./core/actions/AuthActions');
# var stores = {
#   AuthStore: new AuthStore()
# };
#
#
#
# var flux = new Fluxxor.Flux(stores, actions);
# window.flux = flux;
#
#
# var App = React.createClass({
#     mixins: [FluxMixin, StoreWatchMixin("AuthStore")],
#     getStateFromFlux: function() {
#       var flux = this.getFlux();
#       console.log(flux);
#       return {
#         Auth: flux.store("AuthStore").getState()
#       }
#     },
#   render: function() {
#     return this.transferPropsTo(
#       <div>
#         <Header currentUser={this.state.Auth.currentUser} isLoggedIn={this.state.Auth.isLoggedIn}/>
#         <div flux={flux}>
#           {this.props.view}
#         </div>
#       </div>
#     );
#   }
# });
#
# var LoginPage = React.createClass({
#   var LoginPage = React.createClass({
#     mixins: [FluxChildMixin, StoreWatchMixin("AuthStore")],
#     getStateFromFlux: function() {
#       console.log(this);
#       var flux = this.getFlux();
#       console.log(flux);
#       return {
#         AuthStore: flux.store("AuthStore").getState()
#       }
#     },
#     handleSubmit: function(e) {
#       e.preventDefault();
#       var email = this.refs.email.getDOMNode().value.trim();
#       var password = this.refs.password.getDOMNode().value.trim();
#     },
#     render: function() {
#       return (
#         <div>
#           <form className = "form-horizontal" onSubmit={this.handleSubmit}>
#             <div className="input-group field">
#               <span className="input-group-addon"><i className="fa fa-user fa-fw"></i></span>
#               <input type="text" className="form-control" placeholder="Email Address" ref="email" required/>
#             </div>
#             <div className="input-group field">
#               <span className="input-group-addon"><i className="fa fa-lock fa-fw"></i ></span>
#               <input type="password" className="form-control" placeholder="Password" ref="password" required/>
#             </div>
#             <div className="field">
#               <button type="submit" role="button" className="btn btn-primary btn-block" value="Post">
#               Log in </button>
#             </div>
#           </form>
#         </div>
#         );
#       }
#   });
#
# });
#
# var routes = (
#   <Routes >
#       <Route name="login" view={LoginPage} />
#   </Routes>
# );
#
#
# RRouter.start(routes, function(view) {
#   React.renderComponent(App({view: view, flux: flux}), document.getElementById('app'));
# });