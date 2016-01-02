
import React from 'react';
import {Grid} from '../../components/NewTable';
import api from '../../api/api';
import { loadAssignments } from '../../redux/modules/assignment';
import { loadGradebook } from '../../redux/modules/gradebook';
import { connect } from 'react-redux';



let GradeInput = React.createClass({
    getInitialState() {
      return {
        value: this.props.value,
        initialValue: this.props.value
      };
    },
    changeValue(event) {
      this.setValue(event.currentTarget.value);
    },
    getValue() {
      // return this.props.value / this.props.column.max_score * 100 || '-';
      return this.state.value;
    },
    setValue(value) {
      this.setState({value: value});
    },
    componentDidUpdate(prevProps) {
      if (this.props.value !== prevProps.value) {
        this.setValue(this.props.value);
      }
    },
    // toggleInput() {
    //   const newVal = !this.state.showInput;
    //   this.setState({value: newVal});
    // },
    handleBlur(e) {
      e.preventDefault();
      // const val = e.currentTarget.value;

      // this.setState({showInput: false});
      if (this.state.value !== this.state.initialValue) {
        api.attempt.create({
          assignment_id: this.props.column.assignment_id,
          person_id: this.props.row.student.person_id,
          score: this.getValue()
        });
      }

    },
    // render(){
    //   return this.state.showInput ?
    //     this.renderInput() :
    //     (<div onClick={this.toggleInput}>
    //       {this.getValue()} %
    //     </div>);
    // },
    render() {
      return this.props.column.editMode ? (
        <div className="grade-input" onBlur={this.handleBlur} >
          <input
            type="text"
            className="form-control"
            placeholder="score"
            value={this.getValue()}
            onChange={this.changeValue} />
          <span className="input-group-addon">/ {this.props.column.max_score}</span>
        </div>
      ) : (<div>{this.getValue()}</div>);
    }
  });

let GradeAverage = React.createClass({
  calcIbGrade(x){
    switch (false) {
      case !(x > 94):
      return 7;
      case !(x > 84):
      return 6;
      case !(x > 74):
      return 5;
      case !(x > 64):
      return 4;
      case !(x > 54):
      return 3;
      case !(x > 44):
      return 2;
      case !(x >= 1):
      return 1;
      default:
      return 0;
    }
  },
  calcUsLetterGrade(x){
    switch (false) {
      case !(x > 96):
      return 'A+';
      case !(x > 92):
      return 'A';
      case !(x > 90):
      return 'A-';
      case !(x > 87):
      return 'B+';
      case !(x > 84):
      return 'B';
      case !(x > 79):
      return 'B-';
      case !(x > 76):
      return 'C+';
      case !(x > 72):
      return 'C';
      case !(x > 69):
      return 'C-';
      case !(x > 66):
      return 'D+';
      case !(x > 62):
      return 'D';
      case !(x > 59):
      return 'D-';
      default:
      return 'F';
    }
  },
  // I need all weights for a class which must total up to 100%
  // Ex
  // 20%
  // 40%
  // 10%
  // 30%
  calcGrade() {
    //   const assignments = this.props.row.assignments;
    //   let groups = this.props.row.groups;
    //   let groupGrades = {};

    //   for (let key in assignments) {
    //     console.log(key);
    //
    //   }
    //
    //   console.log(this.props.row);

    //   for (let key in groups) {
    //       const id = groups[key].id;
    //       groupGrades[id] = [];
    //   }
    //   console.log(groupGrades);
    // //   Put grades into buckets by weight.
    //   for (let x in assignments) {
    //     const a = assignments[x];
    //     if (a.grade) {
    //       const group = a.grade.assignment.group.weight;
    //
    //     //   if (!grades[group]) {
    //     //     grades[group] = [];
    //     //   }
    //
    //       grades[group].push(a.grade.gradeAverage);
    //     }
    //   }
    //
    //   // Calculate average for each bucket. Then multiply by weight.
    //   // x is weight.
    //   let weighted = [];
    //   for (let x in grades) {
    //     const total = grades[x].reduce((total, num) => total + num);
    //     // Average in weighted bucket.
    //     const average = (total / grades[x].length).toFixed(2);
    //
    //     weighted.push(average * x);
    //   }
    //
    //   if (weighted.length) {
    //     return Math.round(weighted.reduce((total,num) => total + num) * 100);
    //   }
    return 0;
  },
  render(){
    const body = this.calcGrade() + ' | ' + this.calcIbGrade(this.calcGrade()) + ' | ' + this.calcUsLetterGrade(this.calcGrade());
    return (
      <div>
        {body}
      </div>
    );
  }
});

// function loadData(props) {
//   props.loadAssignments();
// }


function loadData(props) {
  props.loadAssignments();
  props.loadGradebook(props.params.resourceID,props.params.term_id);
}
let ClassDetail = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    assignments: React.PropTypes.object.isRequired,
    attempts: React.PropTypes.array.isRequired,
  },
  getInitialState(){
    return {
      students: [],
      attempts: [],
      assignments: [],
      assignmentGroups: [],
      editColumn: null
    };
  },
  // getGrades(){
  //   const params = this.props.params;
  //   api.attempt.find({
  //     course_id: params.resourceID,
  //     term_id: params.term_id
  //   })
  //   .then(xs => this.setState({attempts: xs}));
  // },
  getStudents(){
    const params = this.props.params;
    api.enrollment.find({
      course_id: params.resourceID,
      term_id: params.term_id
    })
    .then(xs => this.setState({students: xs}));
  },
  getAssignments(){
    const params = this.props.params;
    api.assignment.find({
      course_id: params.resourceID,
      term_id: params.term_id
    })
    .then(xs => this.setState({assignments: xs}));
  },
  getAssignmentGroups(){
    const params = this.props.params;
    api.group.find({
      course_id: params.resourceID,
      term_id: params.term_id
    })
    .then(xs => this.setState({assignmentGroups: xs}));
  },
  buildCols(){
    let cols = [{
      key: 'student.person.display_name',
      display: 'Student'
    }];

    for (let x of this.state.assignments) {
      cols.push({
        key: `assignments.${x.assignment_id}.grade.score`,
        editMode: true,
        renderer: GradeInput,
        assignment_id: x.assignment_id,
        max_score: x.max_score,
        display: x.name
      });
    }

    cols.push({
      display: 'Avg - IB - US',
      tdClassName: 'success',
      renderer: GradeAverage
    });

    return cols;
  },

  buildData(){
    // const setKeyValue = (obj, {key, value}) => {obj[key] = value; return obj; };
    let results = [];
    // for (let a of this.state.attempts) {
    //   const result = {
    //     student: this.state.students.find(x => a.person_id === x.person_id),
    //     attempts: a.assignmentAttempts.map((x) => ({key: x.assignment_id, value: x})).reduce(setKeyValue, {}),
    //     groups: this.state.assignmentGroups
    //   };
    //
    //   results.push(result);
    // }
    for (let s of this.state.students) {
      let result = {
        student: s,
        assignments: {}
      };
      for (let a of this.state.assignments) {

        let grade = this.state.attempts
          .filter(x => x.assignment_id === a.assignment_id)
          .find(x => x.person_id === s.person_id);
        result.assignments[a.assignment_id] = {
          grade: grade,
          assignment: a
        };
      }
      results.push(result);
    }
    return results;
  },
  componentDidMount() {

  },
  componentWillMount() {

    loadData(this.props);
    // api.attempt.events.addListener('change', this.getGrades);

    // api.attempt.find({
    //   course_id: params.resourceID,
    //   term_id: params.term_id
    // })
    // .then(xs => this.setState({attempts: xs}));
    // this.getGrades();
    this.getAssignments();
    // this.getAssignmentGroups();
    this.getStudents();
  },
  componentWillUnmount(){
    // api.attempt.events.removeListener('change', this.getGrades);
  },
  render(){
    return (
      <div>
        <Grid columns={this.buildCols()} data={this.buildData()} />
      </div>
    );

  }
});

// function mapStateToProps(state, ownProps) {
//   const { login, name } = ownProps.params;
//   const {
//     pagination: { stargazersByRepo },
//     entities: { users, repos }
//   } = state;
//
//   const fullName = `${login}/${name}`;
//   const stargazersPagination = stargazersByRepo[fullName] || { ids: [] };
//   const stargazers = stargazersPagination.ids.map(id => users[id]);
//
//   return {
//     fullName,
//     name,
//     stargazers,
//     stargazersPagination,
//     repo: repos[fullName],
//     owner: users[login]
//   };
// }
// function select(state) {
//   return {
//     assign: loadAssignments()
//   };
// }
// //
// export default connect(select)(ClassDetail);



export default connect(state => ({
  assignments: state.entities.assignments,
  attempts: state.entities.attempts
}),{loadAssignments,loadGradebook})(ClassDetail);
// module.exports = ClassDetail;
