/**
 * Karma config file
 */
module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'test/**/*.js', 'src/**/*.js'
        ],
        preprocessors: {
            'src/**/*.js': 'coverage'
        },
        reporters: ['progress', 'coverage'],
        port: 9876,
        autoWatch: true,
        browsers: ['PhantomJS'],
        captureTimeout: 30000,
        singleRun: true,
        coverageReporter: {
            type : 'lcovonly',
            dir : 'coverage/',
            file : 'lcov.info'
        }
    });
};
