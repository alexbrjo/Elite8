/* 
 * https://www.sitepoint.com/writing-awesome-build-script-grunt/
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
                    'build/global.js',          // add global vars first
                    'build/Intel8008/**/*.js',  // enumlator files
                    'build/asm/**/*.js'         // assembler files
                ],
                dest: 'dist/Sweet16.js'
            }
        },
        copy:{
            build:{
                cwd:'src',
                src:['**'],
                dest:'build',
                expand:true
            },
            test:{
                cwd:'dist',
                src:"Sweet16.*",
                dest:'test',
                expand:true
            }
        },
        clean:{
            build:{
                src:'build'
            },
            test:{
                src:'Sweet16.*'
            }
        },
        uglify: {
            build: {
                files: {
                    'dist/Sweet16.min.js': [ 'dist/Sweet16.js' ]
                }
            }
        },
        jasmine : {
            src : 'dist/Sweet16.js',
                options : {
                    specs : 'test/**/*.spec.js'
                }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.registerTask(
        'build', 
        'cleans, copys to build folder and uglifies', 
        ['clean', 'copy:build', 'concat', 'uglify', 'copy:test', 'jasmine']
    );
};
