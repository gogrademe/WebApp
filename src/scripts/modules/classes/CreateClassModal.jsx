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
      <Property name="className"
        label="Class Name" />
      <Property name="gradeLevel"
        label="Grade Level" />
      <Property name="teacher"
        label="Teacher" />
    </Schema>
  );


var ClassAssignments = React.createClass({
  saveChanges: function() {
    this.props.flux.actions.addClass()
  },
  render: function() {
    return this.transferPropsTo(
        <Modal title="Create Class" animation={true}>
          <div className="modal-body">
            <Form className="form-horizontal" schema={PersonSchema} />
          </div>
          <div className="modal-footer">
            <Button bsStyle="danger" onClick={this.props.onRequestHide}>Cancel</Button>
            <Button bsStyle="primary" onClick={this.saveChanges}>Save changes</Button>
          </div>
        </Modal>
    );
  }
});

module.exports = ClassAssignments;
