var React = require('react');
// var api = require('../../api/api.ls');

var SemanticModal = require('../components/SemanticModal');
var FormMixin = require('../mixins/FormMixin');
var FormStore = require('../stores/FormStore');

//Molecules
var FormInputRow = require('../molecules/FormInputRow');
var FormActions = require('../molecules/FormActions');

// Validators
var isValidWeight = require('../utils/isValidWeight');

var AssignmentType = React.createClass({
  mixins: [FormMixin],
  checkValid() {
    this.isFormValid({showError:true, event:'check'});
  },
  // api.class.create @state.class
  //   .then ~>
  //     @props.on-request-hide!
  //   .error ~>
  //     @set-state errors: it.body
  saveForm() {
    var fData = this.state.form;
    if (fData.id === undefined) {
      api.type.create(fData)
        .then(()=> {
          this.props.onRequestHide();
        });
    }

  },
  render() {
    return (
      <SemanticModal.SemanticModal {...this.props} title="Assignment Type">
        <div className="content">
          <form className="ui form">
            <FormInputRow label="Name" formLink={this.linkReqState('form.name')}/>
            <FormInputRow label="Weight" formLink={this.linkValidatedState('form.weight', isValidWeight)}/>
          </form>
        </div>
        <FormActions onCancel={this.props.onRequestHide} onSubmit={this.submitForm} />
      </SemanticModal.SemanticModal>
    );
  }
});

module.exports = AssignmentType;
