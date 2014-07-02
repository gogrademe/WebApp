AppCfg = {
  apiUrl: 'http:#localhost:5000/api'
};


require! = {
  React
  RRouter: rrouter
  Fluxxor: fluxxor
}

cloneWithProps = require('react/lib/cloneWithProps');



RoutingContextMixin = RRouter.RoutingContextMixin;



FluxMixin = Fluxxor.FluxMixin(React);
FluxChildMixin = Fluxxor.FluxChildMixin(React);
StoreWatchMixin = Fluxxor.StoreWatchMixin;

# Stores
AuthStore = require('./core/stores/AuthStore');
actions = require('./core/actions/AuthActions');
ClassesStore = require('./core/stores/ClassesStore');
PeopleStore = require('./core/stores/PeopleStore');

stores = {
  AuthStore: new AuthStore(),
  ClassesStore: new ClassesStore(),
  PeopleStore: new PeopleStore()
};

AppRoutes = require('./routes.js');

flux = new Fluxxor.Flux(stores, actions);

Header = require('./components/Header.jsx');

App = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("AuthStore"), RoutingContextMixin],
    getStateFromFlux: function() {
      flux = this.getFlux();

      return {
        Auth: flux.store("AuthStore").getState()
      };
    },
    render: function() {
      path = this.getRouting().path;

      # Handle login/logged out cases.
      if (!this.state.Auth.isLoggedIn) {
        this.navigate('/login');
      } else if(path === '/login') {
        this.navigate('/dashboard');
      } else if (path === "/") {
        this.navigate('/dashboard');
      }

      # This is needed to pass the current context to the View.
      View = cloneWithProps(this.props.view, {});
      return (
        <div>
          <Header currentUser={this.state.Auth.currentUser} isLoggedIn={this.state.Auth.isLoggedIn}/>
          <div className="container">
            {View}
          </div>
        </div>
      );
    }
});





RRouter.start(AppRoutes, function(view) {
  React.renderComponent(App({view: view, flux: flux}), document.getElementById('app'));
});
