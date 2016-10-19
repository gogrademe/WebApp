import React from 'react';

// import {ButtonGroup, Button, Glyphicon} from 'react-bootstrap';
import {Button} from 'semantic-ui-react';

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
      <Button negative icon="trash" onClick={this.toggle}/>
    ) : (
      <Button.Group>
        <Button icon='remove' onClick={this.toggle}/>
        <Button.Or />
        <Button negative icon='ok' onClick={this.handleConfirm}/>
      </Button.Group>
    );
  }
});
