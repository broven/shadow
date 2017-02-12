var path = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')
module.exports = {
  entry:"./src/main.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js'
  },
  devtool: "source-map",
  target: "web",
  module: {
    rules: [
      {test: /\.ts$/, use: 'awesome-typescript-loader'}
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".ts"]
  },
  plugins: [
    new CheckerPlugin()
  ]
}