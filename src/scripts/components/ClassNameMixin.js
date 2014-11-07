// Code from Stampsy
var React = require('react'),
    classSet = require('react/lib/cx'),
    _ = require('lodash'),
    $__0=    React,PropTypes=$__0.PropTypes;

var UTIL_FLAGS = [
  'fullWidth', 'fillHeight',
  'hideOnMobile', 'hideOnTablet',
  'floatLeft', 'floatRight',
  'clearFix', 'absoluteCenter',
  'displayBlock',
  'placeholder', 'smallCaps',
];

var ClassNameMixin = {
  propTypes: {
    className: PropTypes.string,
    context: PropTypes.string,
    fullWidth: PropTypes.bool,
    fillHeight: PropTypes.bool,
    hideOnMobile: PropTypes.bool,
    hideOnTablet: PropTypes.bool,
    floatLeft: PropTypes.bool,
    floatRight: PropTypes.bool,
    clearFix: PropTypes.bool,
    displayBlock: PropTypes.bool,
    absoluteCenter: PropTypes.bool,
    smallCaps: PropTypes.bool
  },

  getClassName:function() {
    var componentClassName = this.className || this.constructor.displayName,
        classNames = [componentClassName],
        context = this.props.context,
        modifiers;

    if (this.getCSSModifiers) {
      modifiers = this.getCSSModifiers();
    } else {
      modifiers = [];
    }

    if (_.isObject(modifiers) && !_.isArray(modifiers)) {
      modifiers = classSet(modifiers).split(' ');
    }

    if (context) {
      modifiers.push('isIn' + context[0].toUpperCase() + context.slice(1));
    }

    if (this.props.className) {
      classNames = classNames.concat(this.props.className.split(' '));
    }

    classNames = classNames.concat(
      UTIL_FLAGS.filter(function(flag)  {return this.props[flag];}.bind(this))
                .map(function(flag)  {return 'utils--' + flag;})
    );

    classNames = _.union(
      classNames,
      _.compact(modifiers).map(function(m)  {return componentClassName + '--' + m;})
    );

    return classNames.join(' ');
  }
};

