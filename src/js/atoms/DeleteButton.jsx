import React from 'react';

import {ButtonGroup, Button, Glyphicon} from 'react-bootstrap';

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
    return !this.state.confirm ? (
      <Button bsStyle="danger" onClick={this.toggle}>
        <Glyphicon glyph="trash" />
      </Button>
    ) : (
      <ButtonGroup>
        <Button onClick={this.toggle}>
          <Glyphicon glyph="remove" />
        </Button>
        <Button bsStyle="danger" onClick={this.handleConfirm}>
          <Glyphicon glyph="ok" />
        </Button>
      </ButtonGroup>
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
