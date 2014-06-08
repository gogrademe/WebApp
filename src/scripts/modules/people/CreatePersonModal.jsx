var React = require('react');

var Modal = require('react-bootstrap/modal');
var Alert = require('react-bootstrap/alert');
var Button = require('react-bootstrap/button');

var ReactForms = require('react-forms');
var Schema    = ReactForms.schema.Schema;
var Property  = ReactForms.schema.Property;
var Form      = ReactForms.Form;
var FormFor = ReactForms.FormFor;

var ModalMixin = require('../../components/ModalMixin');

// var LaddaButton = require('react-ladda');

var PersonSchema = (
    <Schema>
      <Property name="firstName"
        label="First Name" />
      <Property name="middleName"
        label="Middle Name" />
      <Property name="lastName"
        label="Last Name" />
    </Schema>
  );


var CreatePersonModal = React.createClass({
  mixins:[ModalMixin('PeopleStore')],
  saveChanges: function() {
    var formVals = this.refs.form.valueLens().val();
    if (formVals) {
      this.props.flux.actions.addPerson(formVals);

      this.modalSaving();
    }
  },
  render: function() {
    if (!!this.state.error) {
      var alert = (
        <Alert bsStyle="danger">
          {this.state.error}
        </Alert>
      );
    };
    return this.transferPropsTo(
        <Modal title="Create Person" animation={true}>
          <div className="modal-body">
            {alert}
            <Form ref="form" className="form-horizontal" schema={PersonSchema} onSubmit={this.saveChanges}/>
          </div>
          <div className="modal-footer">
            <Button bsStyle="danger" onClick={this.props.onRequestHide}>Cancel</Button>
            <Button bsStyle="primary" onClick={this.saveChanges} disabled={this.state.isSaving}>Save</Button>
          </div>
        </Modal>
    );
  }
});

module.exports = CreatePersonModal;
