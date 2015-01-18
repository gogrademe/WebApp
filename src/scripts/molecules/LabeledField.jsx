var React = require('react');
var cx = require('react/lib/cx');

var Formsy = require('formsy-react');

var LabeledInput = React.createClass({
    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue: function (event) {
      this.setValue(event.currentTarget.value);
    },
    render: function () {
      var error = this.showError() && this.getErrorMessage() !== undefined ? (
        <div className="ui red pointing above label">
          {this.getErrorMessage()}
        </div>
      ) : null;

      return (
        <div className={cx({
          'field': true,
          'required': this.showRequired(),
          'error':  this.showError()
          })}>
          <label>
            {this.props.label}
          </label>
          <div className="ui input">
            <input
              type="text"
              onChange={this.changeValue}
              value={this.getValue()}
              placeholder={this.props.placeholder}
            />
            {error}
          </div>
        </div>
      );
    }
  });

module.exports = LabeledInput;
