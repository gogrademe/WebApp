module.exports = {
  devtool: "#inline-source-map",
  entry: "./src/scripts/index.ls",
  output: {
    filename: "build/app.js"
  },
  devServer: {
      // contentBase: "./build",
      noInfo: true,
      stats: { colors: true }
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'},
      {test: /\.ls$/, loader: 'livescript-loader'}
    ]
  }
};
