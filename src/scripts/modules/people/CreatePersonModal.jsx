var React = require('react');

var Modal = require('react-bootstrap/modal');
var Button = require('react-bootstrap/button');
var Fluxxor = require('fluxxor');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var ReactForms = require('react-forms');
var Schema    = ReactForms.schema.Schema;
var Property  = ReactForms.schema.Property;
var Form      = ReactForms.Form;
var FormFor = ReactForms.FormFor;


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
  saveChanges: function() {
    var formVals = this.refs.form.valueLens().val();
    if (formVals) {
      console.log(formVals);
      this.props.flux.actions.addPerson(formVals);
    }

  },
  onFormChange: function() {
    console.log(this);
  },
  render: function() {
    return this.transferPropsTo(
        <Modal title="Create Person" animation={true}>
          <div className="modal-body">
            <Form ref="form" className="form-horizontal" schema={PersonSchema} onSubmit={this.saveChanges}/>
          </div>
          <div className="modal-footer">
            <Button bsStyle="danger" onClick={this.props.onRequestHide}>Cancel</Button>
            <Button bsStyle="primary" onClick={this.saveChanges}>Save</Button>
          </div>
        </Modal>
    );
  }
});

module.exports = CreatePersonModal;
