/**
 * Karma config file for running Jasmine Tests
 */
module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: ['test/**/*.js', 'src/**/*.js'],
        preprocessors: {
            'src/**/*.js': 'coverage'
        },
        reporters: ['progress', 'coverage'],
        port: 9876,
        autoWatch: true,
        browsers: ['PhantomJS'],
        captureTimeout: 30000, // 30 seconds
        singleRun: true,
        coverageReporter: {
            type : 'lcov', // change to lcovonly for no HTML
            dir  : 'coverage/',
            file : 'lcov.info'
        }
    });
};
