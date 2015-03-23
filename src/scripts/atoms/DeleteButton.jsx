import React from 'react';
import api from '../api/api.ls';

export default React.createClass({
  getInitialState() {
    return {
      confirm: false
    };
  },
  toggle(e) {
    e.preventDefault();
    var conf = !this.state.confirm;
    this.setState({confirm: conf});
  },
  handleConfirm(e) {
    e.preventDefault();
    return this.props.onClick(e);
  },
  render() {
    var btn = !this.state.confirm ? (
      <span>
        <a className="ui icon red button tiny" onClick={this.toggle}>
          <i className="icon trash"/>
        </a>
      </span>
    ) : (
      <span>
        <a className="ui icon button tiny" onClick={this.toggle}>
          <i className="icon remove"/>
        </a>
        <a className="ui icon red button tiny" onClick={this.handleConfirm}>
          <i className="icon checkmark"/>
        </a>
      </span>
    );

    return (
      <span>
        {btn}
      </span>
    );
  }
});

      // var error = this.showError() && this.getErrorMessage() !== undefined ? (
      //   <div className="ui red pointing above label">
      //     {this.getErrorMessage()}
      //   </div>
      // ) : null;

              // a class-name: "ui icon red button tiny" on-click: @delete,
              //   i class-name: "icon trash"
