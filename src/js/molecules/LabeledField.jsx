

import React from 'react';
import cx from 'classnames';

import Formsy from 'formsy-react';

var LabeledInput = React.createClass({
    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],
    getDefaultProps(){
      return {
        onChange() {},
        field: "input",
        required: true,
        type: "text"
      };
    },
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue: function (event) {
      this.setValue(event.currentTarget.value);

      this.props.onChange(event);
    },
    render() {
      var {type, placeholder, label, ...otherProps} = this.props;

      var error = this.showError() && this.getErrorMessage() !== undefined ? (
        <div className="ui red pointing above label">
          {this.getErrorMessage()}
        </div>
      ) : null;

      var renderLabel = label ? (
          <label className="control-label">
            {label}
          </label>
        ) : null;

      var Field = this.props.field;


      return (
        <div className={
            cx('form-group', this.props.size, {
          'has-error': this.showError()
          })}>
          {renderLabel}
          <div className={cx({
              // 'ui': true,
              // 'corner labeled': this.isRequired(),
              // 'input': true
            })}>

            <Field
              className="form-control"
              type={type}
              onChange={this.changeValue}
              value={this.getValue()}
              placeholder={placeholder || label}
              />

            {this.isRequired() ?
              (
                <div className="ui corner label">
                  <i className="red asterisk icon" />
                </div>
              ): null}
              {error}
          </div>
        </div>
      );
    }
  });


module.exports = LabeledInput;
