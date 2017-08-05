/**
 * Grunt task Configuration
 *
 *      > grunt build
 *          The default task, counts sloc, runs tests and gets coverage.
 *      > grunt deploy
 *          Runs tests and builds/assembles the OS
 *
 * These are the registered tasks used by the main tasks. Not recommended to run by themselves
 *      > grunt concat
 *      > grunt copy:build
 *      > grunt clean:build
 *      > grunt uglify:build
 *      > grunt karma:build
 *      > grunt sloc:source
 *      > grunt sloc:test
 *      > grunt assemble
 */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'build/hardware/Operation.js',
                    'build/hardware/**/*.js',  // enumlator files
                    'build/asm/**/*.js'    // assembler files
                ],
                dest: 'dist/MolassOS.js'
            }
        },
        copy:{
            build:{
                cwd:'src',
                src:['**'],
                dest:'build',
                expand:true
            }
        },
        clean:{
            build:{
                src: ['build', 'dist', 'coverage']
            }
        },
        uglify: {
            build: {
                files: {
                    'dist/MolassOS.min.js': [ 'dist/MolassOS.js' ]
                }
            }
        },
        karma: {
            build: {
                configFile: 'karma.conf.js'
            }
        },
        sloc: {
            source : {
                options: {
                    reportType: 'json',
                    reportPath: 'coverage/source_sloc.json'
                },
                files: {
                    'src':  [ '**/*.js' ], // only source code
                }
            },
            test : {
                options: {
                    reportType: 'json',
                    reportPath: 'coverage/test_sloc.json'
                },
                files: {
                    'test':  [ '**/*.js' ], // only test code
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('karma-coverage');
    grunt.loadNpmTasks('grunt-sloc');
    grunt.registerTask('assemble', 'Assembles the OS', function() {
        // use assembler to create OS
        return false;
    });
    grunt.registerTask(
        'build',
        'Runs SLOC, concats, uglifies and runs Karma tests',
        [
            'clean', 'sloc:source', 'sloc:test',// clean and count lines of code
            // copy to build, concat and minify all sources
            'copy:build', 'concat', 'uglify',
            'karma' // run karma tests, generates coverage
         ]
    );
    grunt.registerTask(
        'deploy',
        'Builds, tests and assembles a new MolassOS',
        ['test', 'assemble']
    );
    grunt.registerTask('default', 'build');
};
