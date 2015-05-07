import React, {PropTypes} from 'react';
import api from '../../api/api';
import {Grid, CrudActions} from '../../components/NewTable';

import {AssignmentGroupBtn} from '../../molecules/ModalButtons';

import cx from 'classnames';

const AssignmentEdit = React.createClass({
  propTypes: {
    row: PropTypes.object
  },
  render() {
      return (
        <div className="btn-group">
          <CrudActions {... this.props}/>
          <AssignmentGroupBtn
            label='Edit'
            classId={this.props.row.classId}
            termId={this.props.row.termId}
            groupId={this.props.row.id}
            className='btn btn-primary'/>
        </div>
      );
  }
});

const WeightFooter = React.createClass({
  propTypes: {
    data: PropTypes.array
  },
  render() {
    const weights = this.props.data.map(x => x.weight * 100);
    const weight = weights.length ? weights.reduce((a, b) => a+b) : 0;
    return (
      <div>
        <strong className={cx({'text-danger': weight !== 100})}>
          {weight}
        </strong> /100
      </div>
    );
  }
});

export default React.createClass({
  propTypes: {
    classId: PropTypes.string,
    termId: PropTypes.string
  },
  getInitialState() {
    return {
        data: []
    };
  },
  fetch() {
    api.assignmentGroup
      .find({classId: this.props.classId, termId: this.props.termId})
      .then((xs) => {
          this.setState({
              data: xs
          });
      });
  },
  componentWillMount() {
      this.fetch();
  },
  tableColumns: [{
      key: 'name',
      display: 'Name'
  },
  {
      key: 'weight',
      display: 'Weight',
      format: 'decimalPercent',
      footerRenderer: WeightFooter
  },
  {
      display: '',
      renderer: AssignmentEdit,
      resourceType: 'assignmentGroup',
      className: 'text-right',
      tdClassName: 'text-right col-md-2'
  }],
  componentDidMount() {
      api.assignmentGroup.events.addListener('change', this.fetch);
  },
  componentWillUnmount() {
      api.assignmentGroup.events.removeListener('change', this.fetch);
  },

  render() {
    const weights = this.state.data.map(x => x.weight * 100);
    // this.state.data.map((x) => x.weight)

    return (
      <div>
        <div className='btn-toolbar' role='toolbar'>
          <AssignmentGroupBtn
              label='New'
              classId={this.props.classId}
              termId={this.props.termId}
              className='btn btn-primary pull-right'/>
        </div>
        <Grid columns={this.tableColumns} data={this.state.data} />
      </div>
    );
  }
});
