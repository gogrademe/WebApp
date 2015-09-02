import React, {PropTypes} from 'react';

import {Grid, CrudActions} from '../../components/NewTable';
import api from '../../api/api';

import {Link} from 'react-router';
import Header from '../../components/PageHeader';
// import Select from 'react-select';

import {Combobox as Select} from 'react-widgets';
let ClassName = React.createClass({
    propTypes: {
        column: PropTypes.object,
        row: PropTypes.object,
        value: PropTypes.string
    },
    render(){
      const term_id = this.props.column.term || '';
      return (
        <div>
          <Link
            to='course.grades'
            params={{
              term_id: term_id,
              resourceID: this.props.row.course_id}}>
          {this.props.value}
          </Link>
        </div>
      );
    }
});

let ClassList = React.createClass({
    getInitialState(){
      return {
        courses: [],
        terms: null,
        term: null
      };
    },
    componentWillMount(){
      var this$ = this;
      api.course.find().then(function(it){
        return this$.setState({
          courses: it
        });
      });
      return api.term.find().then(function(it){
        this$.setState({
          term: it[0].term_id
        });
        return this$.setState({
          terms: it
        });
      });
    },
    cols(){
      return [
        {
          key: 'name',
          display: 'Class Name',
          renderer: ClassName,
          term: this.state.term
        }, {
          key: 'gradeLevel',
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
        // return Select({
        //   className: 'inline',
        //   onChange: this.updateSelect,
        //   value: this.state.term,
        //   autoload: false,
        //   options: xs.map(function(x){
        //     return {
        //       label: 'Year ' + (x != null ? x.school_year.start : void 8) + '-' + (x != null ? x.school_year.end : void 8) + ' - ' + (x != null ? x.name : void 8),
        //       value: x != null ? x.id : void 8
        //     };
        //   })
        // });
      }
    },
    rightButtons(){
      return this.selectRender(this.state.terms);
    },
    render(){
      return (
        <div>
          <Header
            primary='All Classes'
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
