"use strict";
/** @flow */

var React = require('react');

var api = require('../api/api.ls');

//Molecules
var ModalForm = require('../molecules/ModalForm');
var LabeledField = require('../molecules/LabeledField');

var AccountModal = React.createClass({
  onSubmit(model) {
    return api.users.create(model);
  },
  render() {
    return (
      <ModalForm {... this.props} title="Create User Account" onSubmitAsync={this.onSubmit}>
        <LabeledField name="email" label="Email"/>
        <LabeledField name="password" label="Password" type="password"/>
      </ModalForm>

    );
  }
});

module.exports = AccountModal;
