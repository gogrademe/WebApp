import React, {Component, PropTypes} from 'react';
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
            course_id={this.props.row.course_id}
            term_id={this.props.row.term_id}
            group_id={this.props.row.group_id}
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

class Settings extends React.Component<any,any>  {
  constructor(props) {
    super(props)
    this.fetch = this.fetch.bind(this)
  }
  state = {
    data:[]
  };

  fetch() {
    api.group
      .find({course_id: this.props.course_id, term_id: this.props.term_id})
      .then((xs) => {
          this.setState({
              data: xs
          });
      });
  }
  componentWillMount() {
      this.fetch();
  }
  tableColumns = [{
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
      resourceType: 'group',
      className: 'text-right',
      tdClassName: 'text-right col-md-2'
  }];
  componentDidMount() {
      api.group.events.addListener('change', this.fetch);
  }
  componentWillUnmount() {
      api.group.events.removeListener('change', this.fetch);
  }

  render() {
    const {term_id, resourceID} = this.props.params;
    return (
      <div>
        <div className='btn-toolbar' role='toolbar'>
          <AssignmentGroupBtn
              label='New'
              course_id={Number(resourceID)}
              term_id={Number(term_id)}
              className='btn btn-primary pull-right'/>
        </div>
        <Grid columns={this.tableColumns} data={this.state.data} />
      </div>
    );
  }
};

// Settings.propTypes = {
//     course_id: PropTypes.string,
//     term_id: PropTypes.string
// };

export default Settings;
