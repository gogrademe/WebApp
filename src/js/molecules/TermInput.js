
import React from 'react';
import cx from 'react/lib/cx';

// import Formsy from 'formsy-react';

class TermInput extends React.Component {
  // Add the Formsy Mixin
  // mixins: [Formsy.Mixin],

  static defaultProps = {
    value: {}
  };

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue = (event) => {
    console.log(event);
    var value = this.getValue();
    value[event.currentTarget.name] = event.currentTarget.value;
    this.setValue(value);
  };

  getVal = (name) => {
    return this.getValue()[name];
  };

  render() {
    var error = this.showError() && this.getErrorMessage() !== undefined ? (
      <div className="ui red pointing above label">
        {this.getErrorMessage()}
      </div>
    ) : null;

    return (
      <div className={cx({
        'field': true,
        'required': this.showRequired(),
        'error': this.showError()
        })}>
        <label>
          {this.props.label}
        </label>
        <div className="two fields">
          <input name="startDate" onChange={this.changeValue} value={this.getVal('startDate')} validations="isDate" placeholder="Start Date" required/>
          <input name="endDate" onChange={this.changeValue} validations="isDate" placeholder="End Date" required/>
          {error}
        </div>
      </div>
    );
  }
}

module.exports = TermInput;
