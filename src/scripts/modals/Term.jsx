var React = require('react');

var SemanticModal = require('../components/SemanticModal');
var FormMixin = require('../mixins/FormMixin');

var FormInputRow = require('../molecules/FormInputRow');
var FormActions = require('../molecules/FormActions');

// Validators
var isValidNumber = require('../utils/isValidNumber');
var isValidDate = require('../utils/isValidDate');

var Term = React.createClass({
  mixins: [FormMixin],
  sendRequest(){
    console.log(this.state);
    var fData = this.state.form;
    if (fData.id === undefined) {
      api.term.create(fData)
        .then(()=> {
          this.props.onRequestHide();
        });
    }
  },
  render() {
    return (
      <SemanticModal.SemanticModal {...this.props} title="School Term">
        <div className="content">
          <form className="ui form">
            <div className="field">
              <label>School Year</label>
              <div className="two fields">
                <FormInputRow
                  placeholder="Start"
                  formLink={this.linkValidatedState('form.schoolYear.start', isValidNumber)}
                  />
                <FormInputRow
                  placeholder="End"
                  formLink={this.linkValidatedState('form.schoolYear.end', isValidNumber)}
                  />
              </div>
            </div>
            <div className="two fields">
              <FormInputRow
                label="Start Date"
                formLink={this.linkValidatedState('form.startDate', isValidDate)}
                />
              <FormInputRow
                label="End Date"
                formLink={this.linkValidatedState('form.endDate', isValidDate)}
                />
            </div>
          </form>
        </div>
        <FormActions onCancel={this.props.onRequestHide} onSubmit={this.submitForm.bind(this, this.sendRequest)} />
      </SemanticModal.SemanticModal>
    );
  }
});


module.exports = Term;
