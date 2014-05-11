var Panel = require('../components/Panel.jsx');

// var Routed = require('Reactful-Router');
// var Link = Routed.Link;
// var Router = Routed.Router;

var AuthActions = require('../core/actions/AuthActions');
var LoginPage = React.createClass({
  handleSubmit: function() {
    var username = this.refs.username.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();

    AuthActions.login(username, password);

    return false;
  },
  render: function() {
    return (
      <Panel className="form-login" title="Login" hasBody>
        <form className = "form-horizontal" onSubmit={this.handleSubmit}>
          <div className="input-group field">
            <span className="input-group-addon"><i className="fa fa-user fa-fw"></i></span>
            <input type="text" className="form-control" placeholder="Username" ref="username" required/>
          </div>
          <div className="input-group field">
            <span className="input-group-addon"><i className="fa fa-lock fa-fw"></i ></span>
            <input type="password" className="form-control" placeholder="Password" ref="password" required/>
          </div>
          <div className="field">
            <button type="submit" role="button" className="btn btn-primary btn-block" value="Post">
            <i className="fa fa-cog fa-spin"></i> Log in </button>
          </div>
        </form>
      </Panel>
      );
  }
});

module.exports = LoginPage;