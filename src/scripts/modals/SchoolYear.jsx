var React = require('react');
// var api = require('../../api/api.ls');

var SemanticModal = require('../components/SemanticModal');
var FormMixin = require('../mixins/FormMixin');

var FormInputRow = require('../molecules/FormInputRow');

var SchoolYear = React.createClass({
  mixins: [FormMixin],
  renderTerm() {
    return (
      <tr>
        <td>
          <FormInputRow placeholder="Start Date" formLink={this.linkState('startDate')}/>
        </td>
        <td>
          <FormInputRow placeholder="End Date" formLink={this.linkState('endDate')}/>
        </td>
        <td className="right aligned collapsing">
          <a className="ui icon red button tiny">
            <i className="trash icon" />
          </a>
        </td>
      </tr>
    );
  },
  render() {
    return (
      <SemanticModal.SemanticModal {...this.props} title="School Year">
        <div className="content">
          <form className="ui form">
            <div className="two fields">
              <FormInputRow label="Start Year" formLink={this.linkState('form.startYear')}/>
              <FormInputRow label="End Year" formLink={this.linkState('form.endYear')}/>
            </div>
            <table className="ui very basic table">
              <thead>
                <tr>
                  <th colSpan="2">
                    Terms
                  </th>
                  <th className="right aligned collapsing">
                    <a className="ui icon primary button tiny">
                      <i className="primary plus icon" />
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.renderTerm()}
                {this.renderTerm()}
                {this.renderTerm()}
              </tbody>
            </table>
          </form>
        </div>
      </SemanticModal.SemanticModal>
    );
  }
});


module.exports = SchoolYear;
