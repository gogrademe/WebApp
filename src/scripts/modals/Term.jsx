
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
  mapModel(model) {
    return {
      "start": Number(model.startYear),
      "end": Number(model.endYear),
      "terms": [
        {
          "name": "term1",
          "startDate": util.forUpload(model.term1_startDate),
          "endDate": util.forUpload(model.term1_endDate)
        },
        {
          "name": "term2",
          "startDate": util.forUpload(model.term2_startDate),
          "endDate": util.forUpload(model.term2_endDate)
        },
        {
          "name": "term3",
          "startDate": util.forUpload(model.term3_startDate),
          "endDate": util.forUpload(model.term3_endDate)
        },
        {
          "name": "term4",
          "startDate": util.forUpload(model.term4_startDate),
          "endDate": util.forUpload(model.term4_endDate)
        }
      ]
    };
  },
  onSubmit(model: SchoolYear) {
    model = this.mapModel(model);
    return api.schoolYear.create(model);
  },
  render() {
    return (
      <ModalForm {... this.props} title="School Year" onSubmitAsync={this.onSubmit}>
        <div className="field">
          <div className="two fields">
            <LabeledField label="Start Year" name="startYear" validations="isNumeric,isLessThan:endYear" placeholder="Start" />
            <LabeledField label="End Year" name="endYear" validations="isNumeric,isMoreThan:startYear" placeholder="End" />
          </div>
        </div>
        <div className="field">
          <label>Term One</label>
          <div className="two fields">
            <LabeledField name="term1_startDate" validations="isDate" placeholder="Start Date" required/>
            <LabeledField name="term1_endDate" validations="isDate" placeholder="End Date" required/>
          </div>
        </div>
        <div className="field">
          <label>Term Two</label>
          <div className="two fields">
            <LabeledField name="term2_startDate" validations="isDate" placeholder="Start Date" required/>
            <LabeledField name="term2_endDate" validations="isDate" placeholder="End Date" required/>
          </div>
        </div>
        <div className="field">
          <label>Term Three</label>
          <div className="two fields">
            <LabeledField name="term3_startDate" validations="isDate" placeholder="Start Date" required/>
            <LabeledField name="term3_endDate" validations="isDate" placeholder="End Date" required/>
          </div>
        </div>
        <div className="field">
          <label>Term Four</label>
          <div className="two fields">
            <LabeledField name="term4_startDate" validations="isDate" placeholder="Start Date" required/>
            <LabeledField name="term4_endDate" validations="isDate" placeholder="End Date" required/>
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
