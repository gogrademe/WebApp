import * as React from "react";
import { Button, Icon, Modal, Form } from "semantic-ui-react";

interface ModalFormProps {
  title?: string;
  open?: boolean;
  submitting?: boolean;
  pristine?: boolean;
  onClose?: () => void;
  requestClose?: () => void;
  handleSubmit?: (fn: (x: any) => void) => void;
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
    const { title, children, requestClose, handleSubmit, pristine, submitting, open, onClose } = this.props;
    return (
      <Modal {...{ open, onClose }}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          <Form ref="form" id="modal-form" onSubmit={handleSubmit(this.handleSubmit)}>
            {children}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={requestClose}>
            <Icon name="close" />
            Cancel
          </Button>
          <Button primary icon form="modal-form" disabled={pristine || submitting} type="submit">
            <Icon name="save" />
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

// export default ModalForm

// }

// export default ModalForm
// export default React.createClass({
//   propTypes: {
//     onSubmit: PropTypes.func,
//     onHide: PropTypes.func,
//     onSubmitAsync: PropTypes.func
//   },
//   getDefaultProps() {
//     return {
//       onSubmit() {}
//     };
//   },
//   getInitialState() {
//     return {
//       canSubmit: false
//     };
//   },
//   enableButton() {
//     this.setState({
//       canSubmit: true
//     });
//   },
//   disableButton() {
//     this.setState({
//       canSubmit: false
//     });
//   },
//   onSubmitPushed(model, resetModel, updateInputsWithError){
//     if (this.props.onSubmitAsync !== undefined) {
//       this.props.onSubmitAsync(model)
//         .then(() => {
//           this.props.onHide();
//         })
//         .error((res) => {
//           let parsedErrs = parseAPIErrors(res.body);
//           updateInputsWithError(parsedErrs);
//         });
//     } else {
//       this.props.onSubmit(model);
//     }
//   },
//   submitForm(e) {
//     this.refs.form.submit(e);
//     return;
//   },
//   render() {
//     const {children, onHide, handleSubmit, valid, pristine, submitting,title, ...props} = this.props;
//
//     return (
//       <Modal>
//           <Modal.Header>{title}</Modal.Header>
//           <Modal.Content>
//             <form ref="form" className="ui form" onSubmit={handleSubmit}>
//               {children}
//             </form>
//           </Modal.Content>
//           <Modal.Actions>
//             <Button primary>
//               <Icon name="close" />
//               Cancel
//             </Button>
//             <Button primary icon disabled={pristine || submitting} type="submit">
//               <Icon name="save" />
//               Save
//             </Button>
//           </Modal.Actions>
//         </Modal>
//     );
//   }
// });

//
// {/* <Modal {...props} bsStyle="primary">
//   <Modal.Header closeButton>
//     <Modal.Title>{props.title}</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <form ref="form" className="ui form" onSubmit={handleSubmit}>
//       {children}
//     </form>
//   </Modal.Body>
//   <Modal.Footer>
//     <button className="ui icon button" onClick={onHide}>
//       <i className="cancel icon" />
//       Cancel
//     </button>
//     {/* <button className={cx(
//       'btn btn-primary',
//       {
//         'disabled': !valid
//       })} */}
//     <button className="ui icon primary button" disabled={pristine || submitting} type="submit">
//       <i className="save icon" />
//       Save
//     </button>
//   </Modal.Footer>
// </Modal> */}
// {/* <Formsy.Form ref="form" className="ui form" onSubmit={this.onSubmitPushed} onValid={this.enableButton} onInvalid={this.disableButton}> */}
// {/* </Formsy.Form> */}
