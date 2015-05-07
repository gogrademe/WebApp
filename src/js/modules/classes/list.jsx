import React, {PropTypes} from 'react';
// import moment from 'moment';
// import Panel from '../../components/Panel';
import {Grid, CrudActions} from '../../components/NewTable';
import api from '../../api/api';
// import CreateClassModal from './CreateClassModal';
import {Link} from 'react-router';
// import SemanticModal from '../../components/SemanticModal';
import Header from '../../components/PageHeader';
import Select from 'react-select';

let ClassName = React.createClass({
    propTypes: {
        column: PropTypes.object,
        row: PropTypes.object,
        value: PropTypes.string
    },
    render(){
      const termId = this.props.column.term || '';
      return (
        <div>
          <Link
            to='class.grades'
            params={{
              termId: termId,
              resourceId: this.props.row.id}}>
          {this.props.value}
          </Link>
        </div>
      );
    }
});

let ClassList = React.createClass({
    getInitialState(){
      return {
        classes: [],
        terms: null,
        term: null
      };
    },
    componentWillMount(){
      var this$ = this;
      api['class'].find().then(function(it){
        return this$.setState({
          classes: it
        });
      });
      return api.term.find().then(function(it){
        this$.setState({
          term: it[0].id
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
    updateSelect: function(it){
      this.setState({term: it});
    },
    selectRender: function(xs){
      switch (false) {
      case !!xs:
        return 'Loading...';
      default:
        return Select({
          className: 'inline',
          onChange: this.updateSelect,
          value: this.state.term,
          autoload: false,
          options: xs.map(function(x){
            return {
              label: 'Year ' + (x != null ? x.schoolYear.start : void 8) + '-' + (x != null ? x.schoolYear.end : void 8) + ' - ' + (x != null ? x.name : void 8),
              value: x != null ? x.id : void 8
            };
          })
        });
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
              data={this.state.classes}/>
          </div>
        </div>
      );
    }
  });

  // <SemanticModal.ModalTrigger modal={CreateClassModal()}>
  //   <a className='ui primary tiny button'>New Class</a>
  // </SemanticModal.ModalTrigger>
  module.exports = ClassList;
