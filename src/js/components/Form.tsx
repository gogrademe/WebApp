import React from 'react';
import {Form} from 'semantic-ui-react';
// import Formsy from 'formsy-react';
// import cx from 'react/lib/cx';

interface FormProps {}

class FormC extends React.Component<FormProps, undefined> {
  render() {
    return <Form/>
  }
}


export default FormC;
//
// export default React.createClass({
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
//   render() {
//     return (
//       <Formsy.Form className="ui form segment" onValid={this.enableButton} onInvalid={this.disableButton}>
//         {this.props.children}
//         <div>
//           <div className="ui right floated">
//             <a className="ui labeled icon button" onClick={this.props.onRequestHide}>
//               <i className="cancel icon" />
//               Cancel
//             </a>
//             <a className={cx({
//                 'ui labeled icon primary button': true,
//                 'disabled': !this.state.canSubmit
//               })}
//               onClick={this.submitForm}>
//               <i className="save icon" />
//               Save
//             </a>
//           </div>
//         </div>
//       </Formsy.Form>
//     );
//   }
// });
