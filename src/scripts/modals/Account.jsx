
/** @flow */

var React = require('react');

var api = require('../api/api.ls');

//Molecules
var ModalForm = require('../molecules/ModalForm');
var LabeledField = require('../molecules/LabeledField');

var AccountModal = React.createClass({
  propTypes: {
    personId: React.PropTypes.string.isRequired
  },
  getInitialState() {
    return {
      person: {}
    }
  },
  onSubmit(model) {
    return api.users.create(model);
  },
  fetchPerson() {
    api.person.get(this.props.personId)
      .then((person)=>{
        this.setState({person: person});
      });
  },
  componentWillMount() {
    this.fetchPerson();
  },
  render() {
    return (
      <ModalForm {... this.props} title="User Account" onSubmitAsync={this.onSubmit}>
        <div className="field">
          <label>
            Name
          </label>
          <span>
            {this.state.person.firstName}
          </span>
          <span>
            {this.state.person.lastName}
          </span>
        </div>
        <LabeledField name="email" label="Email"/>
        <LabeledField name="password" label="Password" type="password"/>
      </ModalForm>

    );
  }
});

module.exports = AccountModal;
