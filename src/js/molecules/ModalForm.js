
import React, {Component, PropTypes} from 'react';
import { Button, Header, Icon, Image, Modal, Form } from 'semantic-ui-react'
import parseAPIErrors from '../utils/parseAPIErrors';


// class ModalForm extends Component {
//   render() {
// export default ({open, onHide, trigger, label, title, children, handleSubmit, pristine, submitting }) => (
export default ({trigger, label, title, children, handleSubmit, pristine, submitting }) => (
  <Modal trigger={trigger || <Button>{label || title}</Button>}>
    <Modal.Header>{title}</Modal.Header>
    <Modal.Content>
      <Form>
        {children}
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button>
        <Icon name="close" />
        Cancel
      </Button>
      <Button primary icon disabled={pristine || submitting} type="submit">
        <Icon name="save" />
        Save
      </Button>
    </Modal.Actions>
  </Modal>
);

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
