import * as React from "react";
import { Button, Icon, Modal, Form } from "semantic-ui-react";

interface ModalFormProps {
  title?: string;
  open?: boolean;
  submitting?: boolean;
  pristine?: boolean;
  onClose?: () => void;
  requestClose?: () => void;
  handleSubmit?: any;
  onSubmitAsync?: (any) => void;
  defaultValues?: any[];
}

export default class ModalForm extends React.Component<ModalFormProps, any> {
  handleSubmit = fields => {
    // FIXME: handle null
    const { onSubmitAsync } = this.props;
    onSubmitAsync(fields);
  };
  render() {
    const { title, children, handleSubmit, requestClose, pristine, submitting, open, onClose } = this.props;
    return (
      <Modal {...{ open, onClose }}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          <Form ref="form" id="modal-form">
            {children}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={requestClose}>
            <Icon name="close" />
            Cancel
          </Button>
          <Button primary icon form="modal-form" disabled={pristine || submitting} onClick={handleSubmit} type="submit">
            <Icon name="save" />
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
