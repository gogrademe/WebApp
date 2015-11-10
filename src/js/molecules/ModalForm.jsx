
import React, {PropTypes} from 'react';
import cx from 'classnames';

import Formsy from 'formsy-react';
import {Modal} from 'react-bootstrap';

import parseAPIErrors from '../utils/parseAPIErrors';

export default React.createClass({
  propTypes: {
    onSubmit: PropTypes.func,
    onHide: PropTypes.func,
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
          this.props.onHide();
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
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formsy.Form ref="form" className="form-horizontal" onSubmit={this.onSubmitPushed} onValid={this.enableButton} onInvalid={this.disableButton}>
            {children}
          </Formsy.Form>
        </Modal.Body>
        <Modal.Footer>
          <a className="btn btn-default" onClick={this.props.onHide}>
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
        </Modal.Footer>
      </Modal>
    );
  }
});
