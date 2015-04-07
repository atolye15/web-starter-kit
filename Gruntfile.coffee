module.exports = (grunt)->
  'use strict'
  grunt.config.set 'config', grunt.file.readJSON 'config.json'
  grunt.initConfig
    info: grunt.config.get('config').info
    srcPath: grunt.config.get('config').srcPath
    devPath: grunt.config.get('config').devPath
    distPath: grunt.config.get('config').distPath
    staging: grunt.config.get('config').staging
    env       : ( if grunt.config.get('config').staging then 'prod' else 'dev' )
    envPath   : ( if grunt.config.get('config').staging then grunt.config.get('config').distPath else grunt.config.get('config').devPath )

    banner: '/*!\n' +
            ' * <%= info.description %>\n' +
            ' * <%= info.author.name %> < <%= info.author.email %> >\n' +
            ' * Version <%= info.version %> ( <%= grunt.template.today("dd-mm-yyyy") %> )\n'+
            ' */\n'
    watch:
      options:
        livereload: true
      sass:
        files: ['<%= srcPath %>/sass/**/*.scss']
        tasks: ['sass', 'autoprefixer']
      coffee:
        files: ['<%= srcPath %>/coffee/**/*.coffee']
        tasks: ['coffee', 'concat:coffee']
      vendor:
        files: ['<%= srcPath %>/vendors/**/*.js']
        tasks: ['concat:vendors']
      html:
        files: [ '<%= srcPath %>/tpl/**/*.tpl', '!<%= srcPath %>/tpl/includes/**' ]
        tasks: [ 'newer:template:build', 'newer:includereplace:includes', 'newer:preprocess' ]

    template:
      build:
        options:
          data:
            'assetsPath': 'assets'
        files: grunt.config.get('config').tplFiles

    includereplace:
      includes:
          #Task-specific options go here.
        files: [
          expand  : true
          flatten : true
          src     : ['preprocess/*.html']
          dest    : '<%= envPath %>'
        ]

    sass:
      product:
        files:
          'preprocess/css/main.css': '<%= srcPath %>/sass/main.scss'

    autoprefixer:
      options:
        browsers: [
          'Android 2.3'
          'Android >= 4'
          'Chrome >= 36'
          'Firefox >= 33'
          'Explorer >= 9'
          'iOS >= 6'
          'Opera >= 26'
          'Safari >= 6'
          ]
      prefix:
        src  : 'preprocess/css/main.css'
        dest : '<%= envPath %>/css/main.css'

    cssmin:
      build:
        options:
          banner: '<%= banner %>'
          rebase: false
        files:
          '<%= envPath %>/css/main.min.css' : '<%= envPath %>/css/main.css'

    coffee:
      product:
        options:
          bare: true
        expand: true
        cwd: '<%= srcPath %>/coffee/'
        src: ['*.coffee']
        dest: 'preprocess/coffee-output'
        ext: '.js'

    jshint:
      files: ['preprocess/coffee-output/*.js']
      options:
        jshintrc: '.jshintrc'

    concat:
      options:
        seperator: ';\n'
        stripBanners: true,
        banner: '<%= banner %>\n'
      coffee:
        src: grunt.config.get('config').coffeeFiles
        dest: '<%= envPath %>/js/app.js'
      vendors:
        src: grunt.config.get('config').vendorFiles
        dest: '<%= envPath %>/js/vendors.js'
      # css:
      #   src: ['<%= srcPath %>/css/main.css']
      #   dest: '<%= distPath %>/css/main.css'

    uglify:
      options:
        mangle: false
        banner: '<%= banner %>'
      product:
        files:
          '<%= envPath %>/js/app.min.js': [
            '<%= envPath %>/js/vendors.js'
            '<%= envPath %>/js/app.js'
          ]

    imagemin:
      dynamic:
        options:
          optimizationLevel: 7
        files: [
            expand: true
            cwd: '<%= srcPath %>/'
            src: ['img/**/*.{png,jpg,gif,svg}']
            dest: '<%= envPath %>/'
          ]

    clean:
      # css: ['<%= distPath %>/css']
      # js:  ['<%= distPath %>/js']
      # img: ['<%= distPath %>/img']
      # dist: [
      #   '<%= distPath %>'
      #   '*.html'
      #   '<%= srcPath %>/css/main.css'
      #   '<%= srcPath %>/css/main.css.map'
      #   '<%= srcPath %>/js/app.js'
      #   '<%= srcPath %>/coffee/output/*.js'
      # ]
      dev        : ['<%= devPath %>/']
      dist       : ['<%= distPath %>/']
      preprocess : ['preprocess/']
      all        : [ '<%= devPath %>/', '<%= distPath %>/', 'preprocess/' ]

    copy:
      fonts:
        expand : true,
        cwd    : '<%= srcPath %>',
        src    : ['fonts/**']
        dest   : '<%= envPath %>/css/'
      libs:
        expand : true,
        cwd    : '<%= srcPath %>',
        src    : ['libs/**']
        dest   : '<%= envPath %>/'

      # js:
      #   expand: true,
      #   cwd: '<%= srcPath %>',
      #   src: ['js/**']
      #   dest: '<%= distPath %>/'
      # copy external css
      # css:
      #   expand: true,
      #   cwd: '<%= srcPath %>',
      #   src: ['css/*.css', '!css/main.css']
      #   dest: '<%= distPath %>/'
      # copy Bower Components
      bowerComponents:
        files: [
          { ##! ClassList
            src    : [ 'bower_components/classlist/classList.min.js' ]
            dest   : 'src/vendors/classList.min.js'
            filter : 'isFile'
          }
          { ##! html5shiv
            src    : [ 'bower_components/html5shiv/dist/html5shiv.min.js' ]
            dest   : 'src/libs/html5shiv.min.js'
            filter : 'isFile'
          }
          { ##! jQuery
            src    : [ 'bower_components/jquery/dist/jquery.min.js' ]
            dest   : 'src/libs/jquery.min.js'
            filter : 'isFile'
          }
          { ##! Bootstrap
            expand : true
            cwd    : 'bower_components/bootstrap-sass-official/assets/stylesheets/'
            src    : [ 'bootstrap/**' ]
            dest   : 'src/sass/'
          }
          { ##! Bootstrap JS
            expand : true
            cwd    : '/bower_components/bootstrap-sass-official/assets/javascripts/'
            src    : [ 'bootstrap.js' ]
            dest   : 'src/vendors/'
          }
        ]

    connect:
      server:
        options:
          port: 8000
          hostname: 'localhost'
          keepalive: true

    ftp_push:
      deploy:
        options:
          authKey: 'key'
          host: "hots-name",
          dest: "/project-folder-name",
          port: 21
        files: [
          expand: true
          cwd: '.'
          src: [
            'prod/**'
          ]
        ]
    preprocess:
      html :
        options :
          context :
            ENV : '<%= env %>'
        files :
          '<%= envPath %>/index.html' : '<%= envPath %>/index.html'

  grunt.registerTask 'mode', ( mode )->
    if mode == 'dev'
      grunt.task.run 'updatejson:staging:false'
      grunt.config.set( 'envPath', grunt.config.get('devPath') )
      grunt.log.ok 'Development mod aktifleştirildi.'
      grunt.task.run 'clean:dev', 'general'

    else if mode == 'prod'
      grunt.task.run 'updatejson:staging:true'
      grunt.config.set( 'envPath', grunt.config.get('distPath') )
      grunt.log.ok 'Production mod aktifleştirildi.'
      grunt.task.run 'clean:dist', 'general', 'imagemin', 'copy:fonts', 'uglify', 'cssmin', 'copy:libs'
    else
      grunt.log.error 'Hatalı komut girdiniz.'

  grunt.registerTask 'updatejson', ( key, value )->

    projectFile = 'config.json'

    if !grunt.file.exists( projectFile )
      grunt.log.error( 'File ' + projectFile + ' not found!');
      return true # return false to abort the execution

    project = grunt.file.readJSON projectFile # get file as json object

    # Convert to boolen if value is true or false
    value == 'true' && ( value = true )
    value == 'false' && ( value = false )

    project[key]= value # edit the value of json object, you can also use projec.key if you know what you are updating

    grunt.file.write( projectFile, JSON.stringify( project, null, 2 ) ) # serialize it back to file

  grunt.event.once 'watch',(event, listener) ->
    if grunt.config.get 'staging'
      throw new Error 'Develop modu aktifleştiriniz!'

  grunt.registerTask 'general',
  [
    'clean:preprocess'
    'template:build'
    'includereplace:includes'
    'preprocess'
    'sass'
    'autoprefixer'
    'coffee'
    'jshint'
    'concat'
  ]

  grunt.registerTask 'build',
  [
    'mode:live'
    'clean:css'
    'clean:js'
    'sass'
    'autoprefixer'
    'cssmin'
    'coffee'
    'concat'
    'copy:js'
    'uglify'
    'newer:imagemin'
    'copy:fonts'
    'copy:libs'
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
  grunt.loadNpmTasks 'grunt-ftp-push'
  grunt.loadNpmTasks 'grunt-include-replace'
  grunt.loadNpmTasks 'grunt-preprocess'