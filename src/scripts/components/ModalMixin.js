
var utils = require('../utils');
module.exports = function() {
  var storeNames = Array.prototype.slice.call(arguments);
  return {
    getInitialState: function() {
      return {
        isSaving: false
      }
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
      console.log('fail', error);
      if (this.state.isSaving) {
        this.setState({isSaving: false, error: error});
      }
    },
    componentWillUnmount: function() {
      var flux = this.props.flux || this.context.flux;
      utils.forEach(storeNames, (store) => {
        flux.store(store).removeListener('error', this.modalSaveFail);
        flux.store(store).removeListener('sucess', this.modalSaveSuccess);
      });
    }
  }
};
