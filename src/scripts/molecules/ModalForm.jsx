/* @flow */

var React = require('react');

var Formsy = require('formsy-react');

var SemanticModal = require('../components/SemanticModal');
var parseAPIErrors = require('../utils/parseAPIErrors');

var ModalForm = React.createClass({
  getDefaultProps: function(): Object {
    return {
      onSubmit: function() {}
    };
  },
  getInitialState: function(): Object {
    return {
      submitClass: "disabled"
    };
  },
  enableButton: function(): void {
    this.setState({
      submitClass: ""
    });
  },
  disableButton: function(): void {
    this.setState({
      submitClass: "disabled"
    });
  },
  onSubmitPushed: function(model: Object, resetModel: Function, updateInputsWithError: Function){
    if (this.props.onSubmitAsync !== undefined) {
      this.props.onSubmitAsync(model)
        .then(() => {
          this.props.onRequestHide();
        })
        .error((res) => {
          var parsedErrs = parseAPIErrors(res.body);
          updateInputsWithError(parsedErrs);
        });
    } else {
      this.props.onSubmit(model);
    }
  },
  submitForm: function(e: any): void {
    this.refs.form.submit(e);
    return;
  },
  render: function(): any {
    var {children, ...props} = this.props;
    return (
      <SemanticModal.SemanticModal {...props}>
        <div className="content">
          <Formsy.Form ref="form" className="ui form" onSubmit={this.onSubmitPushed} onValid={this.enableButton} onInvalid={this.disableButton}>
            {children}
          </Formsy.Form>
        </div>
        <div className="actions">
          <a className="ui labeled icon button" onClick={this.props.onRequestHide}>
            <i className="cancel icon" />
            Cancel
          </a>
          <a className={"ui labeled icon primary button " + this.state.submitClass} onClick={this.submitForm}>
            <i className="save icon" />
            Save
          </a>
        </div>
      </SemanticModal.SemanticModal>
    );
  }
});
module.exports = ModalForm;
