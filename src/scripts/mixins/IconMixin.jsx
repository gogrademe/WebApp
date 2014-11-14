var React = require('react');

var IconMixin = {
  propTypes: {
    size: React.PropTypes.oneOf(['small', 'medium', 'large']).isRequired
  },
  render: function () {
    var svg = this.renderSVG(this.props.size);

    var viewBox = {
      'small': '0 0 18 18',
      'medium': '0 0 32 32',
      'large': '0 0 48 48'
    };

    return (
      React.DOM.span({
        className: "Icon-container",
        dangerouslySetInnerHTML: {
          __html: '<svg viewBox="' + viewBox[this.props.size] + '">' + svg + '</svg>'}
      })
    );
  }
};

module.exports = IconMixin;
