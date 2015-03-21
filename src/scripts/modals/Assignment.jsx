
/** @flow */

var React = require('react');

var api = require('../api/api.ls');
var utils = require('../utils');

//Molecules
var ModalForm = require('../molecules/ModalForm');
var LabeledField = require('../molecules/LabeledField');

var {AssignmentType} = require('../molecules/AutoCompleteFor.jsx');

var AccountModal = React.createClass({
  propTypes: {
    classId: React.PropTypes.string.isRequired,
    termId: React.PropTypes.string.isRequired
  },
  onSubmit(model) {
    model.classId = this.props.classId;
    model.termId = this.props.termId;
    model.dueDate = utils.forUpload(model.dueDate);
    model.maxScore = Number(model.maxScore);
    return api.assignment.create(model);
  },
  render() {
    return (
      <ModalForm {... this.props} title="Assignment" onSubmitAsync={this.onSubmit}>
        <LabeledField name="name" label="Name"/>
        <div className="field">
          <div className="ui two fields">
            <AssignmentType name="typeId" label="Type"/>
            <LabeledField name="dueDate" validation="isDate" label="Due Date"/>
          </div>
        </div>
        <LabeledField name="maxScore" validations="isNumeric" validationError="must be a number" label="Max Score"/>
      </ModalForm>

    );
  }
});

module.exports = AccountModal;
