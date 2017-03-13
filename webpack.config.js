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
      {test: /\.ts$/, use: 'awesome-typescript-loader'},
      {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }
    ]
  },
  resolve: {
    alias: {
    },
    extensions: [".js", ".json", ".ts", "scss"]
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
