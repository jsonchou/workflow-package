/*
 * grunt-cli
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tyler Kellen, contributors
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-init/blob/master/LICENSE-MIT
 */

module.exports = function (grunt) {
    "use strict";
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: [
              'Gruntfile.js',
              'libs/util.js',
              'scripts/src/**/*.js'
            ],
            options: {
                curly: true,
                eqeqeq: false,
                eqnull: true,
                browser: true,
                globals: {
                    window: true,
                    jQuery: true,
                    console: true,
                    module: true,
                    $: true
                }
            }
        },
        uglify: {
            options: {
                preserveComments:'some',
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
                mangle: {
                    except: ['jQuery', 'Backbone']
                }
            },
            dist: {
                src: ['libs/jquery-1.10.2.min.js', 'libs/jquery.cookie.js', 'libs/util.js', 'scripts/src/common.js'],
                dest: 'scripts/core.js'
            },
            subdist: {
                files: [{
                    expand: true,
                    cwd: 'scripts/src',
                    src: '*.js',
                    dest: 'scripts'
                }]
            }
        },
        cssmin: {
            options: {
                keepSpecialComments:1
            },
            minify: {
                expand: true,
                cwd: 'styles/src/',
                src: ['*.css', '!*.min.css'],
                dest: 'styles/',
                ext: '.css'
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        copy: {
            main: {
                src: 'styles/src/**',
                dest: 'styles/'
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'qunit']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('json-test', ['jshint', 'qunit']);
    grunt.registerTask('json-uglify', ['uglify']);
    grunt.registerTask('json-concat', ['concat']);
    grunt.registerTask('json-cssmin', ['cssmin']);
    grunt.registerTask('json-copy', ['copy']);
    grunt.registerTask('built', ['jshint', 'qunit', 'uglify', 'cssmin']);

};
