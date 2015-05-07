
import React from 'react';

import Formsy from 'formsy-react';

import LabeledField from './LabeledField';

var FormList = React.createClass({
    mixins: [Formsy.Mixin],
    getInitialState() {
      return {
        value: [{
          startDate: "12/12/2014",
          endDate: "12/12/2014"
        }]
      };
    },
    getDefaultProps() {
      return {

      };
    },
    render() {
      console.warn('WARN: FormInputRow has been deprecated.');
      // this.registerInputs(this.props.children);
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
  });

module.exports = FormList;
