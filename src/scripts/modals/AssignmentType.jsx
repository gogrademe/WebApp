var React = require('react');
// var api = require('../../api/api.ls');

var SemanticModal = require('../components/SemanticModal');
var FormMixin = require('../mixins/FormMixin');

var FormInputRow = require('../molecules/FormInputRow');

module.exports = React.createClass({
  mixins: [FormMixin],
  render() {
    return (
      <SemanticModal.SemanticModal {...this.props} title="Assignment Type">
        <div className="content">
          <form className="ui form">
            <FormInputRow label="Name" formLink={this.linkState('form.name')}/>
            <FormInputRow label="Weight" formLink={this.linkState('form.weight')}/>
          </form>
        </div>
      </SemanticModal.SemanticModal>
    );
  }
});
