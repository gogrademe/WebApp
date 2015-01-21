/* @flow */

var React = require('react');

var Formsy = require('formsy-react');

var RaisedButton = require('material-ui').RaisedButton;
var Dialog = require('material-ui').Dialog;

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
      canSubmit: false
    };
  },
  enableButton: function(): void {
    this.setState({
      canSubmit: true
    });
  },
  disableButton: function(): void {
    this.setState({
      canSubmit: false
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
  // render: function(): any {
  //   var {children, ...props} = this.props;
  //   return (
  //     <SemanticModal.SemanticModal {...props}>
  //       <div className="content">
  //         <Formsy.Form ref="form" className="ui form" onSubmit={this.onSubmitPushed} onValid={this.enableButton} onInvalid={this.disableButton}>
  //           {children}
  //         </Formsy.Form>
  //       </div>
  //       <div className="actions">
  //         <RaisedButton onClick={this.props.onRequestHide} label="Cancel"/>
  //         <RaisedButton disabled={!this.canSubmit} onClick={this.submitForm} label="Save" primary={true} />
  //       </div>
  //     </SemanticModal.SemanticModal>
  //   );
  // }
  componentDidMount: function() {
    this.refs.dialog.show();
  },
  render: function(): any {
    var {children, ...props} = this.props;

    var dialogActions = [
    {text: 'Cancel', onClick: this.props.onCloseClick},
    {text: 'Submit', onClick: this.submitForm}
    ];
    return (
      <Dialog {...props} ref="dialog" actions={dialogActions}>
        <div className="content">
          <Formsy.Form ref="form" className="ui form" onSubmit={this.onSubmitPushed} onValid={this.enableButton} onInvalid={this.disableButton}>
            {children}
          </Formsy.Form>
        </div>
      </Dialog>
    );
  }
});
module.exports = ModalForm;
