module.exports = (grunt)->
  'use strict'
  grunt.config.set 'config', grunt.file.readJSON 'config.json'
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    distPath: grunt.config.get('config').distPath
    srcPath: grunt.config.get('config').srcPath
    tplFiles: grunt.config.get('config').tplFiles
    staging: grunt.config.get('config').staging
    assetsPath: ( if grunt.config.get('config').staging then grunt.config.get('config').distPath else grunt.config.get('config').srcPath )

    banner: '/*!\n' +
            ' * <%= pkg.description %>\n' +
            ' * <%= pkg.author.name %> < <%= pkg.author.email %> >\n' +
            ' * Version <%= pkg.version %> ( <%= grunt.template.today("dd-mm-yyyy") %> )\n'+
            ' */\n'
    watch:
      options:
        livereload: true
      sass:
        files: ['<%= srcPath %>/sass/**/*.scss']
        tasks: ['sass']
      coffee:
        files: ['<%= srcPath %>/coffee/**/*.coffee']
        tasks: ['coffee', 'concat:coffee']
      vendor:
        files: ['<%= srcPath %>/js/vendor/**/*.js']
      html:
        files: [ '<%= srcPath %>/tpl/**/*.tpl', '!<%= srcPath %>/tpl/includes/**' ]
        tasks: [ 'newer:template:build', 'newer:replace:includes' ]

    template:
      build:
        options:
          data:
            'assetsPath': '<%= assetsPath %>'
            'cssFileName': 'style'+( if grunt.config.get('config').staging then '.min' else '' )
            'jsFileName': 'main'+( if grunt.config.get('config').staging then '.min' else '' )
        files: '<%= tplFiles %>'

    replace:
      includes:
        options:
          patterns: [
            # Moduls
            {
              match: 'exm-module',
              replacement: '<%= grunt.file.read("'+grunt.config.get('config').srcPath+'/tpl/includes/module.tpl") %>'
            }
          ]
        files: [
          expand: true
          flatten: true
          src: ['*.html']
          dest: ''
        ]

    sass:
      product:
        files:
          '<%= srcPath %>/css/style.css': '<%= srcPath %>/sass/style.scss'

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
        src: '<%= srcPath %>/css/style.css'
        dest: '<%= srcPath %>/css/style.css'

    cssmin:
      build:
        options:
          banner: '<%= banner %>'
        files:
          '<%= distPath %>/css/style.min.css': '<%= srcPath %>/css/style.css'

    coffee:
      product:
        options:
          bare: true
        expand: true
        cwd: '<%= srcPath %>/coffee/'
        src: ['*.coffee']
        dest: '<%= srcPath %>/coffee/output'
        ext: '.js'

    jshint:
      files: ['<%= srcPath %>/js/*.js']
      options:
        jshintrc: '.jshintrc'

    concat:
      options:
        seperator: ';\n'
        stripBanners: true,
        banner: '<%= banner %>\n'
      coffee:
        src: [
          '<%= srcPath %>/coffee/output/*.js'
        ]
        dest: '<%= srcPath %>/js/main.js'
      css:
        src: ['<%= srcPath %>/css/style.css']
        dest: '<%= distPath %>/css/style.css'

    uglify:
      options:
        mangle: false
        banner: '<%= banner %>'
      product:
        files:
          '<%= distPath %>/js/main.min.js': '<%= distPath %>/js/main.js'

    imagemin:
      dynamic:
        options:
          optimizationLevel: 7
        files: [
            expand: true
            cwd: '<%= srcPath %>/'
            src: ['img/**/*.{png,jpg,gif}']
            dest: '<%= distPath %>/'
          ]

    clean:
      css: ['<%= distPath %>/css']
      js:  ['<%= distPath %>/js']
      img: ['<%= distPath %>/img']
      dist: [
        '<%= distPath %>'
        '*.html'
        '<%= srcPath %>/css/style.css'
        '<%= srcPath %>/css/style.css.map'
        '<%= srcPath %>/js/main.js'
        '<%= srcPath %>/coffee/output/*.js'
      ]

    copy:
      fonts:
        expand: true,
        cwd: '<%= srcPath %>',
        src: ['css/fonts/**']
        dest: '<%= distPath %>/'

      js:
        expand: true,
        cwd: '<%= srcPath %>',
        src: ['js/**']
        dest: '<%= distPath %>/'
      # copy external css
      css:
        expand: true,
        cwd: '<%= srcPath %>',
        src: ['css/*.css', '!css/style.css']
        dest: '<%= distPath %>/'
      # copy Bower Components
      bowerComponents:
        files: [
          { ##! ClassList
            src: [ 'bower_components/classlist/classList.min.js' ]
            dest: 'src/js/vendor/classList.min.js'
            filter: 'isFile'
          }
          { ##! html5shiv
            src: [ 'bower_components/html5shiv/dist/html5shiv.min.js' ]
            dest: 'src/js/vendor/html5shiv.min.js'
            filter: 'isFile'
          }
          { ##! jQuery
            src: [ 'bower_components/jquery/dist/jquery.min.js' ]
            dest: 'src/js/vendor/jquery.min.js'
            filter: 'isFile'
          }
          { ##! Bootstrap
            expand: true
            cwd: 'bower_components/bootstrap-sass-official/assets/stylesheets/'
            src: [ 'bootstrap/**' ]
            dest: 'src/sass/'
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
            '*.html'
            'assets/**'
          ]
        ]

  grunt.registerTask 'mode', ( mode )->
    if mode == 'dev'
      grunt.task.run 'updatejson:staging:false'
      grunt.config.set( 'assetsPath', grunt.config.get('srcPath') )
      grunt.log.ok 'Develop mod aktifleştirildi.'
      grunt.task.run 'template:build'
      grunt.task.run 'replace:includes'
      grunt.task.run 'sass'
      grunt.task.run 'coffee'
      grunt.task.run 'concat:coffee'
    else if mode == 'live'
      grunt.task.run 'updatejson:staging:true'
      grunt.config.set( 'assetsPath', grunt.config.get('distPath') )
      grunt.log.ok 'Live mod aktifleştirişdi.'
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



  grunt.registerTask 'compressimg',
  [
    'clean:img'
    'imagemin'
  ]

  grunt.registerTask 'deploy',
  [
    'mode:live'
    'clean:css'
    'clean:js'
    'template:build'
    'replace:includes'
    'sass'
    'autoprefixer'
    'cssmin'
    'coffee'
    'concat'
    'copy:js'
    'uglify'
    'newer:imagemin'
    'copy:fonts'
    'copy:css'
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
  grunt.loadNpmTasks 'grunt-replace'
  grunt.loadNpmTasks 'grunt-modify-json'