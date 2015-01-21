// css-fix-loader.js
module.exports = function(source) {
  this.cacheable();
  return source.replace(/\};/g, "}");
};
