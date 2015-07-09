// Karma configuration
var sharedConfig = require('./shared.karma.conf.js');
var _ = require('lodash');

module.exports = function(config) {
  var defaultConfig = sharedConfig(config);
  config.set(_.extend(defaultConfig, {

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['nested'],

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox', 'PhantomJS_Desktop'],
    plugins: defaultConfig.plugins.concat(['karma-nested-reporter', 'karma-chrome-launcher', 'karma-firefox-launcher'])

  }));
};
