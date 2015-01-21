/* @flow */

var React = require('react');

var api = require('../api/api.ls');
var util = require('../utils/index');

//Molecules
var ModalForm = require('../molecules/ModalForm');
var LabeledField = require('../molecules/LabeledField');
var FormList = require('../molecules/FormList');



type Term = {
  startDate: Date;
  endDate: Date;
};

type SchoolYear = {
  startYear: number;
  endYear: number;
  terms: Array<Term>;
};

var TermModal = React.createClass({
  onSubmit(model: SchoolYear) {
    return api.year.create(model);
  },
  render() {
    return (
      <ModalForm {... this.props} title="School Year" onSubmitAsync={this.onSubmit}>
        <div className="field">
          <div className="two fields">
            <LabeledField label="Start Year" name="startYear" validations="isNumeric,isLessThan:endYear" placeholder="Start" required/>
            <LabeledField label="End Year" name="endYear" validations="isNumeric,isMoreThan:startYear" placeholder="End" required/>
          </div>
        </div>
      </ModalForm>
    );
  }
});

module.exports = TermModal;


//
//
//
// var Term = React.createClass({
//   mixins: [FormMixin],
//   sendRequest(){
//     console.log(this.state);
//     var fData = this.state.form;
//     if (fData.id === undefined) {
//       api.term.create(fData)
//         .then(()=> {
//           this.props.onRequestHide();
//         });
//     }
//   },
//   render() {
//     return (
//       <SemanticModal.SemanticModal {...this.props} title="School Term">
//         <div className="content">
//           <form className="ui form">
//             <div className="field">
//               <label>School Year</label>
//               <div className="two fields">
//                 <FormInputRow
//                   placeholder="Start"
//                   formLink={this.linkValidatedState('form.schoolYear.start', isValidNumber)}
//                   />
//                 <FormInputRow
//                   placeholder="End"
//                   formLink={this.linkValidatedState('form.schoolYear.end', isValidNumber)}
//                   />
//               </div>
//             </div>
//             <div className="two fields">
//               <FormInputRow
//                 label="Start Date"
//                 formLink={this.linkValidatedState('form.startDate', isValidDate)}
//                 />
//               <FormInputRow
//                 label="End Date"
//                 formLink={this.linkValidatedState('form.endDate', isValidDate)}
//                 />
//             </div>
//           </form>
//         </div>
//         <FormActions onCancel={this.props.onRequestHide} onSubmit={this.submitForm.bind(this, this.sendRequest)} />
//       </SemanticModal.SemanticModal>
//     );
//   }
// });
//
//
// module.exports = Term;
