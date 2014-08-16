/**
 * Starter Kit's Grunt file
 */

module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: '/*!\n' +
                ' * pkg.name\n' +
                ' * Version <%= pkg.version %> ( <%= grunt.template.today("dd-mm-yyyy") %> )\n'+
                ' */\n',
        sync: {
            all: {
                options: {
                    sync: ['version'],
                    from: 'package.json',
                    to: 'bower.json'
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'css/style.css': 'src/sass/style.scss'
                }
            }
        },
        watch: {
            files: 'src/*.scss',
            tasks: 'default'
        },
        autoprefixer: {
           options: {
               browsers: [
                   'Android 2.3',
                   'Android >= 4',
                   'Chrome >= 20',
                   'Firefox >= 24', // Firefox 24 is the latest ESR
                   'Explorer >= 8',
                   'iOS >= 6',
                   'Opera >= 12',
                   'Safari >= 6'
               ]
            },
            src: 'css/main.css',
            dest: 'css/main.css'
        },
        jshint: {
            // define the files to lint
            files: ['gruntfile.js', 'src/**/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                jshintrc: 'js/.jshintrc'
            }
        },
        concat: {
            css: {
                options: {
                    stripBanners: true,
                    banner: '<%= banner %>\n'
                },
                src: ['css/style.css'],
                dest: 'css/style.css'
            },
            js: {
                options: {
                    stripBanners: true,
                    banner: '<%= banner %>\n'
                },
                src: ['js/main.js'],
                dest: 'js/main.js'
            }
        },
        uglify: {
            build: {
                options: {
                    banner: '<%= banner %>'
                },
                files: {
                    'js/main.min.js': 'js/main.js'
                }
            }
        },
        cssmin: {
            build: {
                options: {
                    banner: '<%= banner %>'
                },
                files: {
                    'style.css': 'style.min.css'
                }
            }
        }
    });

    grunt.registerTask('default', 'sass');
    grunt.registerTask('deploy', ['compass','uglify']);

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-npm2bower-sync');
};