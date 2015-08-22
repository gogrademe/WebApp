import React, {PropTypes} from 'react';

import api from '../api/api';

//Molecules
import ModalForm from '../molecules/ModalForm';
import {Input} from 'formsy-react-components';

export default React.createClass({
  propTypes: {
    course_id: PropTypes.number.isRequired,
    term_id: PropTypes.number.isRequired,
    group_id: PropTypes.number
  },
  getInitialState() {
    return {
      group: {}
    };
  },
  onSubmit(model) {
    model.weight = Number(model.weight / 100);
    model.course_id = Number(this.props.course_id);
    model.term_id = Number(this.props.term_id);

    if (this.props.group_id) {
      model.id = this.props.group_id;
      return api.assignmentGroup.update(model.id, model);
    } else {
      return api.assignmentGroup.create(model);
    }


  },
  componentWillMount() {
    if (this.props.group_id) {
      api.assignmentGroup
        .get(this.props.group_id)
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
