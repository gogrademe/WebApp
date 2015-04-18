
import React from 'react';
import cx from 'react/lib/cx';

import Formsy from 'formsy-react';

import SemanticModal from '../components/SemanticModal';
import parseAPIErrors from '../utils/parseAPIErrors';

export default React.createClass({
  getDefaultProps() {
    return {
      onSubmit() {}
    };
  },
  getInitialState() {
    return {
      canSubmit: false
    };
  },
  enableButton() {
    this.setState({
      canSubmit: true
    });
  },
  disableButton() {
    this.setState({
      canSubmit: false
    });
  },
  onSubmitPushed(model, resetModel, updateInputsWithError){
    if (this.props.onSubmitAsync !== undefined) {
      this.props.onSubmitAsync(model)
        .then(() => {
          this.props.onRequestHide();
        })
        .error((res) => {
          let parsedErrs = parseAPIErrors(res.body);
          updateInputsWithError(parsedErrs);
        });
    } else {
      this.props.onSubmit(model);
    }
  },
  submitForm(e) {
    this.refs.form.submit(e);
    return;
  },
  render() {
    let {children, ...props} = this.props;

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
          <a className={cx({
              'ui labeled icon primary button': true,
              'disabled': !this.state.canSubmit
            })}
            onClick={this.submitForm}>
            <i className="save icon" />
            Save
          </a>
        </div>
      </SemanticModal.SemanticModal>
    );
  }
});
