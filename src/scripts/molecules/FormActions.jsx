var React = require('react');

var FormActions = React.createClass({
  propTypes: {
    onCancel: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  },
  render: function(){
    return (
      <div className="actions">
        <a className="ui labeled icon button" onClick={this.props.onCancel}>
          <i className="cancel icon" />
          Cancel
        </a>
        <a className="ui labeled icon primary button" onClick={this.props.onSubmit}>
          <i className="save icon" />
          Save
        </a>
      </div>
    );
  }
});

module.exports = FormActions;
