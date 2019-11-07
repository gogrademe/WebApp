import * as React from 'react';
import {Button} from 'semantic-ui-react';

interface DeleteButtonProps {
  onClick(any)
}

interface DeleteButtonState {
  confirm: boolean
}

export default class DeleteButton extends React.Component<DeleteButtonProps, DeleteButtonState> {
  state = {
    confirm: false
  }
  toggle = (e) => {
    e.preventDefault();
    var conf = !this.state.confirm;
    this.setState({confirm: conf});
  }
  handleConfirm = (e) => {
    e.preventDefault();
    return this.props.onClick(e);
  }
  render() {
    return !this.state.confirm ? (
      <Button negative icon="trash" onClick={this.toggle}/>
    ) : (
      <Button.Group>
        <Button icon='remove' onClick={this.toggle}/>
        <Button.Or />
        <Button negative icon='trash' onClick={this.handleConfirm}/>
      </Button.Group>
    );
  }
}
