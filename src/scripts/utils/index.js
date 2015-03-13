"use strict";
var moment = require('moment');
var decode64 = function(input){
  return false;
};
var momentInvalidDate = function(it){
  return !moment(it).isValid();
};
var yearIsOne = function(it){
  return moment(it).year() === 1 || moment(it).year() === 0;
};
var invalidDate = function(it){
  return momentInvalidDate(it) || yearIsOne(it);
};
var date = function(x){
  var ref$;
  switch (ref$ = [x], false) {
  case !not$(ref$[0]):
    return "";
  case !invalidDate(ref$[0]):
    return "";
  default:
    return moment(x).format('L');
  }
};
var dateForUpload = function(it){
  //return moment(it).format("YYYY-DD-MM");
  return moment(it).toDate();
};

var pathToObj = function(path, value){
  var o;
  o = {};
  pathReduce(path, o, function(obj, part, i, xs){
    if (i === xs.length - 1) {
      obj[part] = value;
      return obj;
    } else {
      return obj[part] = {};
    }
  });
  return o;
};
var pathReduce = function(path, obj, fn){
  return path.split('.').reduce(fn, obj);
};
var valueFromPath = function(path, obj){
  return pathReduce(path, obj, function(obj, part){
    return obj[part];
  });
};

module.exports = {
  decode64: decode64,
  formatDate: date,
  forUpload: dateForUpload,
  pathToObj: pathToObj,
  pathReduce: pathReduce,
  valueFromPath: valueFromPath,
  FormLink: require('./FormLink.js')
};
function not$(x){ return !x; }
