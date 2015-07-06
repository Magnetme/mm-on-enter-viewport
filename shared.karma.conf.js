var testUtils = require('magnet-test-utils');
/**
 * Shared karma config for both dev & jenkins testing
 */
module.exports = function(config) {
	return {

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],


		// list of files / patterns to load in the browser
    files: testUtils.files.concat([
      'out/index.js',
      'test/loadTest.js',
      'test/**/*.js',
      'test/**/*.css',
      'test/**/*.html'
    ]),

		// list of files to exclude
		exclude: [
		],

    plugins : ["karma-jasmine", "karma-jasmine-html-reporter", "karma-phantomjs-launcher"],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'**/*.html' : 'ng-html2js'
		},

		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		singleRun : true
	};
};

