var ref$, find, filter, ceiling, isItNaN, sum, map, reject, mean, groupBy, uniqueBy, flatten;
var React = require('react');
var Panel = require('../../components/Panel.ls');
var NewTable = require('../../components/NewTable.ls');
var api = require('../../api/api.ls');

var Grid = NewTable.Grid;

var _ = require('lodash');

var ref$ = require('prelude-ls'), find = ref$.find, filter = ref$.filter, ceiling = ref$.ceiling, isItNaN = ref$.isItNaN, sum = ref$.sum, map = ref$.map, reject = ref$.reject, mean = ref$.mean, groupBy = ref$.groupBy, uniqueBy = ref$.uniqueBy, flatten = ref$.flatten;
var GradeOverview = React.createClass({
  displayName: "GradeOverview",
  getInitialState: function(){
    return {
      students: [],
      grades: [],
      assignments: []
    };
  },
  getGrades: function(){
    api.grade.find({
      classId: this.props.classId,
      termId: this.props.termId
    }).then((data) => {
      this.setState({grades: data});
    });
  },
  getStudents: function(){
    api.enrollment.find({
      classId: this.props.classId,
      termId: this.props.termId
    }).then((data) =>{
      this.setState({students: data});
    });
  },
  getAssignments: function(){
    api.assignment.find({
      classId: this.props.classId,
      termId: this.props.termId
    }).then((data) => {
      this.setState({assignments: data});
    });
  },
  groupTypes: function(){
    return uniqueBy(function(it){
      return it.id;
    })(
    map(function(it){
      return it.type;
    })(
    this.state.assignments));
  },
  aByType: function(){
    return groupBy(function(it){
      return it.typeId;
    })(
    this.state.assignments);
  },
          // grade =
          //   @state.grades
          //     |> filter (.assignment-id is a.id)
          //     |> find (.person-id is x.person-id)
  calc: function() {
    var abt = this.aByType();

    abt = _.map(abt,(x) => {
      console.log(x)
    })

    _.reduce(abt,(result, num, key)=> {
      console.log(result,num, key);
    });
  },
  buildCols: function(){
    // this.calc();
    var i$, ref$, len$, x;
    var cols = [{
      key: "student.name",
      display: "Student",
    }];

    for (i$ = 0, len$ = (ref$ = this.groupTypes()).length; i$ < len$; ++i$) {
      x = ref$[i$];
      cols.push({
        key: "types." + x.id,
        display: x.name
      });
    }
    return cols;
  },
  whatItShouldLookLike: {
    student: {
      id: "Something",
      name: "Jake Price"
    },
    types: {
      typeId1: {
        total: "100%"
      },
      typeId2: {
        total: "100%"
      }
    }
  },

    // build-data: ->
    //   for x in @state.students
    //     result =
    //       student:
    //         id: x.person.id
    //         name: "#{x.person.firstName} #{x.person.lastName}"
    //       assignments: {}
    //
    //     for a in @state.assignments
    //       grade =
    //         @state.grades
    //           |> filter (.assignment-id is a.id)
    //           |> find (.person-id is x.person-id)
    //
    //       result.assignments[a.id] = {
    //         grade: grade
    //         assignment: a
    //       }
    //
    //     result
  gradeFor: function(studentId, assignmentId) {
    return _.chain(this.state.grades)
      .filter((x) => {
        return x.assignmentId == assignmentId;
      })
      .find((x) => {
          return x.personId == studentId;
      }).value();

  },
  buildData: function() {
    return _.map(this.state.students, (x) =>{
      var res = {
        student: {
          id: x.person.id,
          name: x.person.firstName + " " + x.person.lastName
        },
        types: {}
      };

      _.forEach(this.aByType(), (type) => {
        // console.log(type);
        console.log(type);

        console.log(this.gradeFor(res.student.id, type[0].assignmentId))
        res.types[type[0].typeId] = 100
      });


      return res;
    });
  },
  buildData2: function(){
    var i$, ref$, len$, x, result, results$ = [];
    for (i$ = 0, len$ = (ref$ = this.state.students).length; i$ < len$; ++i$) {
      x = ref$[i$];
      result = {
        student: {
          id: x.person.id,
          name: x.person.firstName + " " + x.person.lastName
        },
        types: this.aByType()
      };
      results$.push(result);
    }
    return results$;
  },
  componentWillMount: function(){
    this.getGrades();
    this.getAssignments();
    this.getStudents();
  },
  componentDidMount: function() {
    api.grade.events.addListener("change", this.getGrades);
  },
  componentWillUnmount: function(){
    api.grade.events.removeListener("change", this.getGrades);
  },
  render: function(){
    return (
      <div>
        <Grid columns={this.buildCols()} data={this.buildData()} />
      </div>
    );
  }
});
module.exports = GradeOverview;
