import React, {PropTypes} from 'react';

import {Grid, CrudActions} from '../../components/NewTable';
import api from '../../api/api';

import {Link} from 'react-router';
import Header from '../../components/PageHeader';

import {Combobox as Select} from 'react-widgets';

const CourseLink = ({column, row, value}) => (
  <div>
    <Link to={`/app/course/${column.term}/${row.course_id}/grades`}>
      {value}
    </Link>
  </div>
);

let ClassList = React.createClass({
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
          renderer: CrudActions,
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
            autoload={false}
            data={this.state.terms}
            valueField='term_id'
            textField={item => `${item.school_year} - ${item.name}`}
            />
        );
      }
    },
    rightButtons(){
      return this.selectRender(this.state.terms);
    },
    render(){
      return (
        <div>
          <Header
            primary='All Courses'
            right={this.rightButtons()}/>
          <div>
            <Grid
              columns={this.cols()}
              data={this.state.courses}/>
          </div>
        </div>
      );
    }
  });

  // <SemanticModal.ModalTrigger modal={CreateClassModal()}>
  //   <a className='ui primary tiny button'>New Class</a>
  // </SemanticModal.ModalTrigger>
  module.exports = ClassList;
