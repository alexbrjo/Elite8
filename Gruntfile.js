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
                    'build/SugarAsm/**/*.js',   // assembler files
                    'build/HoneyBasic/**/*.js'  // Compiler files
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
            },
            test:{
                cwd:'dist',
                src:"MolassOS.*",
                dest:'test',
                expand:true
            }
        },
        clean:{
            build:{
                src:'build'
            },
            test:{
                src:'MolassOS.*'
            }
        },
        uglify: {
            build: {
                files: {
                    'dist/MolassOS.min.js': [ 'dist/MolassOS.js' ]
                }
            }
        },
        jasmine : {
            src : 'dist/MolassOS.js',
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
