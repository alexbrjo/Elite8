/**
 * Karma config file
 */
module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'test/**/*.js'
        ],
        reporters: ['progress'],
        port: 9876,
        autoWatch: true,
        browsers: ['PhantomJS'],
        captureTimeout: 30000,
        singleRun: true
    });
};
