/** @jsx React.DOM */
var Alert = require('react-bootstrap/alert');
var utils = require('../utils');
module.exports = function() {
  var storeNames = Array.prototype.slice.call(arguments);
  return {
    getInitialState: function() {
      return {
        isSaving: false,
        error: null
      };
    },
    componentWillMount: function() {
      var flux = this.props.flux || this.context.flux;
      utils.forEach(storeNames, (store) => {
        flux.store(store).on('success', this.modalSaveSuccess);
        flux.store(store).on('error', this.modalSaveFail);
      });
    },
    modalSaving: function() {
        this.setState({isSaving: true});
    },
    modalSaveSuccess: function() {
      console.log('success');
      this.props.onRequestHide();
    },
    modalSaveFail: function(error) {
      console.log('fail', error.errors);
      if (this.state.isSaving) {
        this.setState({isSaving: false, error: error.errors});
      }
    },
    componentWillUnmount: function() {
      var flux = this.props.flux || this.context.flux;
      utils.forEach(storeNames, (store) => {
        flux.store(store).removeListener('error', this.modalSaveFail);
        flux.store(store).removeListener('sucess', this.modalSaveSuccess);
      });
    },
    errorAlerts: function() {
      if (this.state.error) {
        return (
          <Alert bsStyle="danger">
            {this.state.error}
          </Alert>
        );
      };
    }
  }
};
