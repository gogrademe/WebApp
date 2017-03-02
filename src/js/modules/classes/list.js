import React, {PropTypes} from 'react';

import {Grid, CrudActions} from '../../components/NewTable';
import api from '../../api/api';

import {Link} from 'react-router';
import Header from '../../components/PageHeader';

import {Combobox as Select} from 'react-widgets';
import {Button} from 'semantic-ui-react';
import {CourseBtn} from '../../molecules/ModalButtons';
const CourseLink = ({column, row, value}) => (
  <div>
    <Link to={`/app/course/${column.term}/${row.course_id}/grades`}>
      {value}
    </Link>
  </div>
);

const Actions = (props) => (
  <div className="btn-group">
    <CrudActions {...props}/>
    <CourseBtn label="Edit"
      values={{
        course_id: props.row.course_id,
        term_id: props.row.term_id,
        group_id: props.row.group_id
    }} />
  </div>
);

let CourseList = React.createClass({
    getInitialState(){
      return {
        courses: [],
        terms: null,
        term: null
      };
    },
    componentWillMount(){
      api.course.find().then(
        it => this.setState({courses: it})
      );

      api.term.find().then(
        it => this.setState({
          term: it[0].term_id,
          terms: it
        })
      );
    },
    cols(){
      return [
        {
          key: 'name',
          display: 'Class Name',
          renderer: CourseLink,
          term: this.state.term
        }, {
          key: 'grade_level',
          display: 'Grade Level'
        }, {
          display: '',
          resourceType: 'class',
          renderer: Actions,
          className: 'text-right',
          tdClassName: 'text-right col-md-2',
          linkTo: 'class'
        }
      ];
    },
    selectRender: function(xs){
      switch (false) {
      case !!xs:
        return 'Loading...';
      default:
        return (
          <Select
            className='inline'
            onChange={val => this.setState({term: val.term_id})}
            value={this.state.term}
            data={this.state.terms}
            valueField='term_id'
            textField={item => `${item.school_year} - ${item.name}`} />
        );
      }
    },
    render(){
      return (
        <div>
          <Header
            primary='All Courses'
            secondary='Test'
            right={this.selectRender(this.state.terms)}/>
            <div>
            <CourseBtn label="New" />
            </div>
          <div>
            <Grid attached
              columns={this.cols()}
              data={this.state.courses}/>
          </div>
        </div>
      );
    }
  });

  module.exports = CourseList;
