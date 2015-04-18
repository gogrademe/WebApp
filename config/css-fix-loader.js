// // css-fix-loader.js
// module.exports = function(source) {
//   this.cacheable();
//   return source.replace(/\};/g, "}");
// };
// module.exports = function(source) {
//   this.cacheable();
//   return source.replace(/\.\.\/\.\.\/theme\.config/g, "../../../../less/theme.config");
// };
//
//
var path = require("path");
// var fs = require("fs");
// module.exports = function(source) {
//     console.log("test");
//     this.cacheable();
//     var callback = this.async();
//     var headerPath = path.resolve("./src/less/theme.config");
//     this.addDependency(headerPath);
//     fs.readFile(headerPath, "utf-8", function(err, header) {
//         if(err) return callback(err);
//         callback(null, header + "\n" + source);
//     });
// };



var SemanticUIThemeConfigResolve = function() {
  return {
    "apply": function (compiler) {
      compiler.resolvers.normal.plugin("file", function(request, callback) {
          if(request.request === "../../theme.config") {
            callback(null, {
              path: path.resolve("./src/less/theme.config"),
              query: request.query,
              file: true, resolved: true
            });
          } else
            // continue with other plugins
            callback();
        });
    }
  };
};

module.exports = SemanticUIThemeConfigResolve;
