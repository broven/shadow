var path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  entry: {
    contentScript: './src/js/contentScript.js',
    popup: './src/js/popup.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js'
  },
  devtool: "source-map",
  target: "web",
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "sass-loader" // compiles Sass to CSS
      }]
    }]
  },
  resolve: {
    alias: {},
    extensions: [".js", ".json", "scss"]
  },
  plugins: [
    new CopyWebpackPlugin([{
        from: './src/manifest.json'
      },
      {
        from: './src/popup.html'
      }
    ], {
      ignore: [
        '*.js'
      ]
    })
  ]
}
