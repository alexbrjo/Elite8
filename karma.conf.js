/**
 * Karma config file for running Jasmine Tests
 */
module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: ['src/**/*.js', 'test/**/*.spec.js'],
        preprocessors: {
            'src/**/*.js': 'coverage'
        },
        reporters: ['progress', 'coverage'],
        port: 9876,
        autoWatch: true,
        browsers: ['PhantomJS'],
        captureTimeout: 30000,
        browserDisconnectTimeout: 30000,
        browserDisconnectTolerance: 0,
        browserNoActivityTimeout: 10000,
        singleRun: true,
        coverageReporter: {
            type : 'lcov', // change to lcovonly for no HTML
            dir  : 'coverage/',
            file : 'lcov.info'
        }
    });
};
