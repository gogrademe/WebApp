var React = require('react');
var SemanticModal = require('../../components/SemanticModal.ls');
var FormMixin = require('../../components/FormMixin.ls');

var api = require('../../api/api.ls');

var CreateAccountModal = React.createClass({
  mixins: [FormMixin('account')],
  propTypes: {
    personId: React.PropTypes.string.isRequired
  },
  getInitialState(){
    return {
      account: {
        personId: this.props.personId,
        email: '',
        password: ''
      }
    }
  },
  handleSubmit(e) {
    e.preventDefault();

    api.users.create(this.state.account)
    .then(() => {
      this.props.onRequestHide();
    });
  },
  render() {
    return (
      <SemanticModal.SemanticModal title="Create User Account">
        <div className="content">
          <form className="ui form" onSubmit={this.handleSubmit}>
            {this.inputFor("email", label="Email", type="email")}
            {this.inputFor("password", label="Password", type="password")}
          </form>
        </div>
        <this.actions onSubmit={this.handleSubmit} onCancel={this.props.onRequestHide}/>
      </SemanticModal.SemanticModal>
    )
  }
});

module.exports = CreateAccountModal
