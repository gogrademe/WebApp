var React = require('react');
// var api = require('../../api/api.ls');

var SemanticModal = require('../components/SemanticModal');
var FormMixin = require('../mixins/FormMixin');
var FormStore = require('../stores/FormStore');

var FormInputRow = require('../molecules/FormInputRow');

var AssignmentType = React.createClass({
  mixins: [FormMixin],
  // getInitialState() {
  //   return {
  //     form: {
  //       name: FormStore.getDefaultValue('name') || '',
  //       weight: FormStore.getDefaultValue('weight') || ''
  //     }
  //   };
  // },
  checkValid() {
    this.isFormValid({showError:true, event:'check'});
  },
  render() {
    return (
      <SemanticModal.SemanticModal {...this.props} title="Assignment Type">
        <div className="content">
          <form className="ui form">
            <FormInputRow label="Name" formLink={this.linkReqState('form.name')}/>
            <FormInputRow label="Weight" formLink={this.linkReqState('form.weight')}/>
          </form>
        </div>
        <button onClick={this.checkValid}> Valid? </button>
      </SemanticModal.SemanticModal>
    );
  }
});

module.exports = AssignmentType;
