var path = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  entry: {contentScript:'./src/ts/contentScript.ts',popup:'./src/ts/popup.ts'},
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
    new CheckerPlugin(),
    new CopyWebpackPlugin([
      {from:'./src/manifest.json'},
      {from: './src/popup.html'}
    ],{
      ignore: [
        '*.js',
        '*.ts'
      ]
    })
  ]
}