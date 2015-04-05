var React = require('react');
var Formsy = require('formsy-react');
var cx = require('react/lib/cx');

export default React.createClass({
  getInitialState: function() {
    return {
      canSubmit: false
    };
  },
  enableButton: function () {
    this.setState({
      canSubmit: true
    });
  },
  disableButton: function () {
    this.setState({
      canSubmit: false
    });
  },
  render: function () {
    return (
      <Formsy.Form className="ui form segment" onValid={this.enableButton} onInvalid={this.disableButton}>
        {this.props.children}

        <div>
          <div className="ui right floated">
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
        </div>
      </Formsy.Form>
    );
  }
});


//
// <div className="actions">
//   <a className="ui labeled icon button" onClick={this.props.onRequestHide}>
//     <i className="cancel icon" />
//     Cancel
//   </a>
//   <a className={cx({
//       'ui labeled icon primary button': true,
//       'disabled': !this.state.canSubmit
//     })}
//     onClick={this.submitForm}>
//     <i className="save icon" />
//     Save
//   </a>
// </div>
