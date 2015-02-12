var updates = require('react/lib/update');
var utils = require('../utils');

// Atoms
var FormInput = require('../atoms/FormInput');
var TextInput = require('../atoms/TextInput');
var NumberInput = require('../atoms/NumberInput');
// var PikadayInput = require('../atoms/PikadayInput');


// Molecules
var InputRow = require('../molecules/FormInputRow');
var FormMessages = require('../molecules/FormMessages');
var FormActions = require('../molecules/FormActions');

var formMixin = function(stateKey){
  var getProps, makeUpdatable;
  ({
    getInitialState: function(){
      var ref$;
      return ref$ = {}, ref$[stateKey + ""] = {}, ref$;
    }
  });
  getProps = function(path){
    var this$ = this;
    return {
      value: utils.valueFromPath(stateKey + "." + path, this.state),
      onChange: function(event){
        var value, data, ref$;
        value = event.target.value;
        data = updates(this$.state[stateKey], utils.pathToObj(path + "", {
          $set: value
        }));
        return this$.setState((ref$ = {}, ref$[stateKey + ""] = data, ref$));
      }
    };
  };
  makeUpdatable = curry$(function(component, path, extraProps){
    var props;
    extraProps == null && (extraProps = {
      type: "text"
    });
    props = import$(getProps.call(this, path), extraProps);
    return component(props);
  });
  return {
    // dateFor: makeUpdatable(PikadayInput),
    inputFor: makeUpdatable(TextInput),
    inputRow: makeUpdatable(InputRow),
    input: makeUpdatable(FormInput),
    numInputFor: makeUpdatable(NumberInput),
    updatableFor: makeUpdatable,
    messages: FormMessages,
    actions: FormActions
  };
};

function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}


module.exports = formMixin;
