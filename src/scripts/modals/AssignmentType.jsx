/* @flow */

var React = require('react');

var api = require('../api/api.ls');

//Molecules
var ModalForm = require('../molecules/ModalForm');
var LabeledField = require('../molecules/LabeledField');

var AssignmentType = React.createClass({
  onSubmit(model: Object) {
    model.weight = parseFloat(model.weight / 100);

    return api.type.create(model);
  },
  render() {
    return (
      <ModalForm {... this.props} title="Assignment Type" onSubmitAsync={this.onSubmit}>
        <LabeledField label="Name" name="name" placeholder="Name" required/>
        <LabeledField label="Weight" name="weight" validationError="must be between .5% and 100%" validations="isWeight" required/>
      </ModalForm>
    );
  }
});

module.exports = AssignmentType;
