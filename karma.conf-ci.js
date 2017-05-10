let webpackConfig = require('./webpack.test.config')
module.exports = function(config) {
  // Example set of browsers to run on Sauce Labs
  // Check out https://saucelabs.com/platforms for all browser/platform combos
  var customLaunchers = {
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7',
      version: '35'
    }
  }

  config.set({

    basePath: '',
     frameworks: ['mocha', 'power-assert'],
     preprocessors: {
      'test/index.js': ['webpack', 'sourcemap']
    },
      webpackMiddleware: {
      // webpack-dev-middleware configuration 
      // i. e. 
      stats: 'errors-only'
    },
    webpack: webpackConfig,
      files: [
      'test/index.js'
    ],
    sauceLabs: {
        testName: 'shadow Unit Tests'
    },
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    reporters: ['dots', 'saucelabs'],
    singleRun: true
  })
}