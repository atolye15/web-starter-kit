/**
 * Starter Kit's Grunt file
 */

module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
                ' * <%= pkg.description %>\n' +
                ' * <%= pkg.author.name %> < <%= pkg.author.email %> >\n' +
                ' * Version <%= pkg.version %> ( <%= grunt.template.today("dd-mm-yyyy") %> )\n'+
                ' */\n',
        watch: {
            css: {
                options: {
                    livereload: true
                },
                files: 'src/sass/*.scss',
                tasks: 'sass'
            },
            html: {
                options: {
                    livereload: true
                },
                files: 'src/*.html',
                tasks: 'template:development'
            }
        },
        template: {

            development: {
                options: {
                    data: {
                        'cssDir': 'src/css',
                        'jsDir': 'src/js',
                        'cssFileName': 'style',
                        'jsFileName': 'main'
                    }
                },
                files: {
                    'index.html': ['src/index.html']
                }
            },
            live: {
                options: {
                    data: {
                        'cssDir': 'css',
                        'jsDir': 'js',
                        'cssFileName': 'style.min',
                        'jsFileName': 'main.min'
                    }
                },
                files: {
                    'index.html': ['src/index.html']
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'src/css/style.css': 'src/sass/style.scss'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: [
                    'Android 2.3',
                    'Android >= 4',
                    'Chrome >= 20',
                    'Firefox >= 24', // Firefox 24 is the latest ESR
                    'Explorer >= 9',
                    'iOS >= 6',
                    'Opera >= 12',
                    'Safari >= 6'
                ]
            },
            prefix : {
                src: 'src/css/style.css',
                dest: 'src/css/style.css'
            }
        },
        cssmin: {
            build: {
                options: {
                    banner: '<%= banner %>'
                },
                files: {
                    'src/css/style.min.css': 'src/css/style.css'
                }
            }
        },
        jshint: {
            // define the files to lint
            files: ['gruntfile.js', 'src/js/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                jshintrc: '.jshintrc'
            }
        },
        uglify: {
            build: {
                options: {
                    banner: '<%= banner %>'
                },
                files: {
                    'js/main.min.js': 'src/js/main.js'
                }
            }
        },
        clean:{
            css: ['css'],
            js: ['js'],
            img: ['img']
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
        sync: {
            all: {
                options: {
                    sync: ['version'],
                    from: 'package.json',
                    to: 'bower.json'
                }
            }
        },
        imagemin: {
            dynamic: { // Another target
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'src/', // Src matches are relative to this path
                    src: ['img/**/*.{png,jpg,gif}'], // Actual patterns to match
                    dest: '' // Destination path prefix
                }]
            }
        },
        copy: {
            js: {
                expand: true,
                cwd: 'src',
                src: ['js/**/*'],
                dest: '',
                filter: 'isFile'
            },
            css: {
                expand: true,
                cwd: 'src',
                src: ['css/**/*.css', '!css/sprites.css', '!css/fonts/**'],
                dest: '',
                filter: 'isFile'
            },
            fonts: {
                expand: true,
                cwd: 'src',
                src: ['css/fonts/**'],
                dest: '',
            }
        }
    });

    grunt.registerTask( 'compressimg', [ 'clean:img', 'imagemin' ] );

    grunt.registerTask('deploy', ['clean:js', 'clean:css', 'template:live', 'sass', 'autoprefixer', 'cssmin', 'jshint', 'uglify', 'sync', 'copy', 'concat']);

    grunt.registerTask( 'build', ['clean:js', 'clean:css', 'sass', 'autoprefixer', 'cssmin', 'jshint', 'uglify', 'copy', 'concat'] );


    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-npm2bower-sync');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
};