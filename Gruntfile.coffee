module.exports = (grunt)->
  'use strict'
  tplFiles = require './src/tpl/files.json'
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    banner: '/*!\n' +
            ' * <%= pkg.description %>\n' +
            ' * <%= pkg.author.name %> < <%= pkg.author.email %> >\n' +
            ' * Version <%= pkg.version %> ( <%= grunt.template.today("dd-mm-yyyy") %> )\n'+
            ' */\n'
    tplFiles : require './src/tpl/files.json'
    watch:
      options:
        livereload: true
      sass:
        files: ['src/sass/**/*.scss']
        tasks: ['sass']
      coffee:
        files: ['src/coffee/**/*.coffee']
        tasks: ['coffee', 'concat:coffee']
      vendor:
        files: [
          'src/js/vendor/**/*.js'
          ]
      html:
        files: 'src/tpl/**/*.tpl'
        tasks: 'newer:template:dev'

    template:
      dev:
        options:
          data:
            'cssDir': 'src/css'
            'jsDir': 'src/js'
            'imgDir': 'src/img'
            'cssFileName': 'style'
            'jsFileName': 'main'
        files: tplFiles
      live:
        options:
          data:
            'cssDir': 'assets/css'
            'jsDir': 'assets/js'
            'imgDir': 'assets/img'
            'cssFileName': 'style.min'
            'jsFileName': 'main.min'
        files: tplFiles

    sass:
      product:
        files:
          'src/css/style.css': 'src/sass/style.scss'

    autoprefixer:
      options:
        browsers: [
          'Android 2.3'
          'Android >= 4'
          'Chrome >= 20'
          'Firefox >= 24'
          'Explorer >= 9'
          'iOS >= 6'
          'Opera >= 12'
          'Safari >= 6'
          ]
      prefix:
        src: 'src/css/style.css'
        dest: 'src/css/style.css'

    cssmin:
      build:
        options:
          banner: '<%= banner %>'
        files:
          'assets/css/style.min.css': 'src/css/style.css'

    coffee:
      product:
        options:
          bare: true
        expand: true
        cwd: 'src/coffee/'
        src: ['*.coffee']
        dest: 'src/coffee/output'
        ext: '.js'

    jshint:
      files: ['src/js/*.js']
      options:
        jshintrc: '.jshintrc'

    concat:
      options:
        seperator: ';\n'
        stripBanners: true,
        banner: '<%= banner %>\n'
      coffee:
        src: [
          'src/coffee/output/*.js'
        ]
        dest: 'src/js/main.js'
      css:
        src: ['src/css/style.css']
        dest: 'assets/css/style.css'

    uglify:
      options:
        mangle: false
        banner: '<%= banner %>'
      product:
        files:
          'assets/js/main.min.js': 'assets/js/main.js'

    imagemin:
      dynamic:
        options:
          optimizationLevel: 7
        files: [
            expand: true
            cwd: 'src/'
            src: ['img/**/*.{png,jpg,gif}']
            dest: 'assets/'
          ]

    clean:
      css: ['assets/css']
      js:  ['assets/js']
      img: ['assets/img']
      dist: ['assets', '*.html', 'src/css/style.css', 'src/js/main.js', 'src/coffee/output/*.js']

    copy:
      fonts:
        expand: true,
        cwd: 'src',
        src: ['css/fonts/**']
        dest: 'assets/'

      js:
        expand: true,
        cwd: 'src',
        src: ['js/**']
        dest: 'assets/'

    connect:
      server:
        options:
          port: 8000
          hostname: 'localhost'
          keepalive: true


  grunt.registerTask 'compressimg',
  [
    'clean:img'
    'imagemin'
  ]

  grunt.registerTask 'deploy',
  [
    'clean:css'
    'clean:js'
    'template:live'
    'sass'
    'autoprefixer'
    'cssmin'
    'coffee'
    'concat'
    'copy:js'
    'uglify'
    'newer:imagemin'
    'copy:fonts'
  ]

  grunt.registerTask 'build',
  [
    'clean:css'
    'clean:js'
    'sass'
    'autoprefixer'
    'cssmin'
    'coffee'
    'concat'
    'uglify'
    'copy:fonts'
  ]

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-template'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-autoprefixer'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-imagemin'
  grunt.loadNpmTasks 'grunt-newer'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-notify'