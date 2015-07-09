// Karma configuration
var sharedConfig = require('./shared.karma.conf.js');
var _ = require('lodash');

module.exports = function(config) {
  var defaultConfig = sharedConfig(config);
	config.set(_.extend(defaultConfig, {
		//The default 60s is not enough for Jenkins
		captureTimeout : 200000,

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'junit'],
		junitReporter : {
			outputFile : 'test-results.xml',
			suite : ''
		},

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['PhantomJS_Desktop'],
    plugins : defaultConfig.plugins.concat(['karma-junit-reporter'])
	}));
};
