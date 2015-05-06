
import React, {PropTypes} from 'react';
import cx from 'classnames';

import Formsy from 'formsy-react';
import {Modal} from 'react-bootstrap';

import parseAPIErrors from '../utils/parseAPIErrors';

export default React.createClass({
  propTypes: {
    onSubmit: PropTypes.func,
    onRequestHide: PropTypes.func,
    onSubmitAsync: PropTypes.func
  },
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
      <Modal {...props} bsStyle="primary">
        <div className="modal-body">
          <Formsy.Form ref="form" className="ui form" onSubmit={this.onSubmitPushed} onValid={this.enableButton} onInvalid={this.disableButton}>
            {children}
          </Formsy.Form>
        </div>
        <div className="modal-footer">
          <a className="btn btn-default" onClick={this.props.onRequestHide}>
            <i className="cancel icon" />
            Cancel
          </a>
          <a className={cx(
            'btn btn-primary',
            {
              'disabled': !this.state.canSubmit
            })}
            onClick={this.submitForm}>
            <i className="save icon" />
            Save
          </a>
        </div>
      </Modal>
    );
  }
});
