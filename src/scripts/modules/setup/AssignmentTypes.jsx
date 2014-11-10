var React = require('react');
var api = require('../../api/api.ls');
var CrudTable = require('../../components/CrudTable.ls');
var NewTable = require('../../components/NewTable.ls');

var SemanticModal = require("../../components/SemanticModal.ls");

var AssignmentTypeModal = require('../../modals/AssignmentType');

module.exports = React.createClass({
    getInitialState() {
      return {
        data: []
      }
    },
    fetch() {
      api.type.find()
        .then((xs) => {
          this.setState({
            data: xs
          })
        })
    },
    componentWillMount() {
      this.fetch()
    },
    tableColumns: [{
      key: "name",
      display: "Name"
    }, {
      key: "weight",
      display: "Weight",
      format: 'decimalPercent'
    }, {
      display: '',
      resourceType: "type",
      renderer: NewTable.CrudActions,
      linkTo: "type",
      className: "right aligned",
      tdClassName: "right aligned"
    }],
    render() {
        return (
          <div>
            <div className="ui top attached right aligned segment">
              <SemanticModal.ModalTrigger modal={AssignmentTypeModal()}>
                <a className="ui primary tiny button">
                  New
                </a>
              </SemanticModal.ModalTrigger>
            </div>
            <NewTable.Grid className="bottom attached" columns={this.tableColumns} data={this.state.data} />
          </div>
        );
    }
});
