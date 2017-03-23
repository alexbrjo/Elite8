/**
 * Grunt task Configuration
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
                    'build/Molasses8080/**/*.js',  // enumlator files
                    'build/MolassesASM/**/*.js',   // assembler files
                    'build/MolassesBASIC/**/*.js'  // Compiler files
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
                src: [
                    'build', 'dist', 'coverage',
                    '**/MolassOS.*'
                    ]
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
            prebuild : {
                options: {
                    reportType: 'json',
                    reportPath: 'coverage/sloc.json'
                },
                files: {
                    'src':  [ '**/*.js' ] // only source code
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
    grunt.registerTask(
        'default', 
        'Runs SLOC, builds and runs Karma tests', 
        [
            'clean', // clean environment
            'sloc', // sloc in clean enviroment
            // copy to build, concat and minify all sources
            'copy:build', 'concat', 'uglify',
            'karma' // run karma tests, generates coverage
         ]
    );
};
