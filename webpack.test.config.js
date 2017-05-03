let merge = require('webpack-merge')
let baseConfig = require('./webpack.config')

let webpackConfig = merge(baseConfig, {
  module:{
    rules:[
    {test: /_test\.js$/, loader: "webpack-espower-loader"}
    ]
  }
})
delete webpackConfig.entry
module.exports = webpackConfig