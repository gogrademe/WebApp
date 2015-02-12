var React = require('react');
var api = require('../../api/api.ls');
var CrudTable = require('../../components/CrudTable.ls');
var NewTable = require('../../components/NewTable.ls');

var {AssignmentTypeBtn} = require('../../molecules/ModalButtons');

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
    showModal() {
        ModalActions.showModal(ModalTypes.ASSIGNMENT_TYPE);
    },
    componentDidMount() {
      api.type.events.addListener("change", this.fetch)
    },
    componentWillUnmount() {
      api.type.events.removeListener("change", this.fetch)
    },

    render() {
        return (
          <div>
            <div className="ui top attached right aligned segment">
              <AssignmentTypeBtn label="New" primary={true}/>
            </div>
            <NewTable.Grid className="bottom attached" columns={this.tableColumns} data={this.state.data} />
          </div>
        );
    }
});
