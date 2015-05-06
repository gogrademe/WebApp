import React, {PropTypes} from 'react';

import api from '../api/api';

//Molecules
import ModalForm from '../molecules/ModalForm';
import LabeledField from '../molecules/LabeledField';

export default React.createClass({
  propTypes: {
    classId: PropTypes.string.isRequired,
    termId: PropTypes.string.isRequired,
    groupId: PropTypes.string
  },
  getInitialState() {
    return {
      group: {}
    };
  },
  onSubmit(model) {
    model.weight = Number(model.weight / 100);
    model.classId = this.props.classId;
    model.termId = this.props.termId;

    if (this.props.groupId) {
      model.id = this.props.groupId;
      return api.assignmentGroup.update(model.id, model);
    } else {
      return api.assignmentGroup.create(model);
    }


  },
  componentWillMount() {
    if (this.props.groupId) {
      api.assignmentGroup
        .get(this.props.groupId)
        .then(res => this.setState({group: res}));
    }
  },
  render() {
    const weight = Number(this.state.group.weight * 100) || '';
    return (
      <ModalForm {... this.props} title="Assignment Group" onSubmitAsync={this.onSubmit}>
        <LabeledField label="Name" name="name" value={this.state.group.name} placeholder="Name"/>
        <LabeledField label="Weight" name="weight" value={weight} validationError="must be between .5% and 100%" validations="isWeight"/>
      </ModalForm>
    );
  }
});
