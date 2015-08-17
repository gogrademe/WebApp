import React, {PropTypes} from 'react';

import api from '../api/api';

//Molecules
import ModalForm from '../molecules/ModalForm';
import {Input} from 'formsy-react-components';

export default React.createClass({
  propTypes: {
    courseID: PropTypes.number.isRequired,
    termID: PropTypes.number.isRequired,
    groupID: PropTypes.number
  },
  getInitialState() {
    return {
      group: {}
    };
  },
  onSubmit(model) {
    model.weight = Number(model.weight / 100);
    model.courseID = Number(this.props.courseID);
    model.termID = Number(this.props.termID);

    if (this.props.groupID) {
      model.id = this.props.groupID;
      return api.assignmentGroup.update(model.id, model);
    } else {
      return api.assignmentGroup.create(model);
    }


  },
  componentWillMount() {
    if (this.props.groupID) {
      api.assignmentGroup
        .get(this.props.groupID)
        .then(res => this.setState({group: res}));
    }
  },
  render() {
    const weight = Number(this.state.group.weight * 100) || '';
    return (
      <ModalForm {... this.props} title="Assignment Group" onSubmitAsync={this.onSubmit}>
        <Input label="Name" name="name" value={this.state.group.name} placeholder="Name"/>
        <Input label="Weight" name="weight" value={weight} validationError="must be between .5% and 100%" validations="isWeight"/>
      </ModalForm>
    );
  }
});
