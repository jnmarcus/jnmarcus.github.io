module.exports = function(grunt) {
  'use strict';

  // Load grunt tasks automatically
  require('matchdep').filterDev('grunt-!(cli)').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    // Project settings
    config: {
        // Configurable paths
        pub: 'pub',
        dist: './dev/dist',
        jekyllBuild: './dev/_pub',
        ghPagesBuild: 'gh-pages',
        dev: './dev'
    },
    dev: {
        styles: './dev/styles',
        scripts: './dev/scripts',
        pub: './dev/_pub',
        dist: './dev/dist'
    },

    // TASK CONFIGURATION

//    concat: {
//      options: {
//        banner: '<%= banner %>',
//        stripBanners: true
//      },
//      dist: {
//        src: ['lib/<%= pkg.name %>.js'],
//        dest: 'dist/<%= pkg.name %>.js'
//      }
//    },
//    uglify: {
//      options: {
//        banner: '<%= banner %>'
//      },
//      dist: {
//        src: '<%= concat.dist.dest %>',
//        dest: 'dist/<%= pkg.name %>.min.js'
//      }
//    },
//    jshint: {
//      options: {
//        curly: true,
//        eqeqeq: true,
//        immed: true,
//        latedef: true,
//        newcap: true,
//        noarg: true,
//        sub: true,
//        undef: true,
//        unused: true,
//        boss: true,
//        eqnull: true,
//        browser: true,
//        globals: {}
//      },
//      gruntfile: {
//        src: 'Gruntfile.js'
//      },
//      lib_test: {
//        src: ['lib/**/*.js', 'test/**/*.js']
//      }
//    },
//    qunit: {
//      files: ['test/**/*.html']
//    },

    less: {   //WORKS!
      css: {  //compile to CSS 
        options: {  //output sourcemap
          strictMath: false,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'main.css.map',
          sourceMapFilename: '<%= config.dev %>/dist/css/main.css.map'
        },
        files: {
          '<%= config.dev %>/styles/css/main.css': ['<%= config.dev %>/styles/less/main.less'],
        },
      },
      minify: { //minify CSS file
        options: {
          cleancss: true,
        },
        files: [
          {src: '<%= config.dev %>/styles/css/main.css', dest: '<%= config.dev %>/styles/css/main.min.css'},
          {src: '<%= config.dev %>/styles/css/main.css', dest: '<%= config.dev %>/dist/css/main.min.css'}
        ],
      },
    },

//    clean: {
//      buildDist: {
//        src: [ '<%= config.jekyllBuild %>/dist' ]
//      },
//    },

    copy: {  //WORKS!!
      styles: {   //'dev/styles/css/' to 'dist/css/' and 'jekyll/dist/css'
        files: [
          { expand: true, cwd: '<%= dev.styles %>/', src: ['css/*'], dest: '<%= dev.dist %>/'},
          { expand: true, cwd: '<%= dev.styles %>/', src: ['css/*'], dest: '<%= config.dev %>/jekyll/dist/'}
        ],
      },  
      fonts: {    //'dist/fonts/' to everywhere
        files: [
          { expand: true, cwd: '<%= config.dist %>/', src: ['fonts/**'], dest: '<%= config.dev %>/jekyll/dist/'},
          { expand: true, cwd: '<%= config.dist %>/', src: ['fonts/**'], dest: '<%= config.ghPagesBuild %>/dist/'},
        ],
      },
      scripts: {   //'dist/js/' to 'jekyll/dist/js'
        expand: true,
        cwd: '<%= config.dist %>/',
        src: ['js/**'],
        dest: '<%= config.dev %>/jekyll/dist/'
      }, 
      toJekyllDist: {  //'dev/dist/' to 'dev/jekyll/'
        expand: true,
        cwd: '<%= config.dev %>/',
        src: ['dist/**/*'],
        dest: 'dev/jekyll/'
      },
      minifiedAssets: {   //only minified assets to 'gh-pages/dist/' directories
        files: [
          //minified styles
          {src: '<%= config.jekyllBuild %>/dist/css/main.min.css', dest: '<%= config.ghPagesBuild %>/dist/css/main.min.css'},
          //minified javascript
          // {src: 'js/**.min.js', dest: '<%= config.ghPagesBuild %>/dist/js/'},
        ],
      },
      css: {  
        files: {
          src: 'dist/css/main.min.css',
          dest: 'gh-pages/dist/css/main.min.css'
        },
      },
      staticBuildFiles: { //static jekyll build files to staging directory 'gh-pages/' 
        files: [
          //static homepage
          {src: '<%= config.jekyllBuild %>/index.html', dest: '<%= config.ghPagesBuild %>/index.html'},
          //static about page
          {src: '<%= config.jekyllBuild %>/about.html', dest: '<%= config.ghPagesBuild %>/about/index.html'},
          //static portfolio projects page
          // {src: '<%= config.jekyllBuild %>/portfolio-projects.html', dest: '<%= config.ghPagesBuild %>/portfolio-projects/index.html'},
          //static contact page
          // {src: '<%= config.jekyllBuild %>/contact.html', dest: '<%= config.ghPagesBuild %>/contact/index.html'},
        ],
      },
      siteHTML: {
        files: [
          //static homepage
          { src: '<%= config.jekyllBuild %>/index.html', dest: './index.html'},
          //static about page
          { expand: true, cwd: '<%= config.jekyllBuild %>/', src: ['about/*.html'], dest: './'},
          //static work page
          // { expand: true, cwd: '<%= config.jekyllBuild %>/', src: ['work/*.html'], dest: './'},
          //static contact page
//          { expand: true, cwd: '<%= config.jekyllBuild %>/', src: ['contact/*.html'], dest: './'},
        ],
      },
      distToPub: {  //'dev/_pub/dist' to './dist'
        expand: true,
        cwd: '<%= config.dev %>/_pub/',
        src: ['dist/**/*'],
        dest: './'
      },
      pubToRoot: {  //'dev/_pub/' to './'
        expand: true,
        cwd: '<%= config.dev %>/',
        src: ['_pub/**/*'],
        dest: './'
      }
    },

    jekyll: {   //WORKS!!
      options: {
        bundleExec: true,
        src: './dev/jekyll'
      },
      serve: {
        options: {
          dest: '<%= config.jekyllBuild %>',
          config: './_config.yml',
          serve: true, //+
          server_port: 8000, //+
          watch: true, //+
          drafts: true,
          exclude: ['node_modules', 'less', 'gh-pages', 'Gemfile', 'Gemfile.lock', 'README.md', 'package.json', 'Gruntfile.js','custom-bootstrap.map', '.grunt', 'about', 'test']
        },
      },
      build: {
        options: {
          dest: '<%= config.jekyllBuild %>',
          drafts: true,
          exclude: ['node_modules', 'less', 'gh-pages', 'Gemfile', 'Gemfile.lock', 'README.md', 'package.json', 'Gruntfile.js','custom-bootstrap.map', '.grunt', 'about', 'test']
        },
      },
    },

    'gh-pages': {   //WORKS!!
      'gh-pages': {     //push to gh-pages
        options: {
          base: '<%= config.ghPagesBuild %>',
          branch: 'gh-pages',
          message: 'grunt'
        },
        src: ['**/*']
      },
      'test-grunt': {   //push to test branch, test-grunt
        options: {
          base: '<%= config.ghPagesBuild %>',
          branch: 'test-grunt',
          message: 'grunt testing 123'
        },
        src: ['**/*']  
      },
    },

    watch: {
      less: {   //Recompile and minify CSS files when changes to LESS files are made -- WORKS!
        files: ['dev/styles/less/**/*.less'],
        tasks: ['less', 'copy:styles'],
      },
      dist: {
        files: ['dev/dist/**/*'],
        tasks: ['newer:copy:toJekyllDist']
      },
//      distBuild: {
//        files: ['jekyll/dist/**/*'],
//        tasks: ['clean:buildDist', 'copy:toBuildDist'],
//      },
      pub:{
        files: ['./dev/_pub/**/*'],
        tasks: ['newer:copy:siteHTML', 'newer:copy:distToPub'],
      },
//      src: {
//        files: '<%= jshint.src.src %>',
//        tasks: ['jshint:src', 'qunit'],
//      },
//      test: {
//        files: '<%= jshint.test.src %>',
//        tasks: ['jshint:test', 'qunit'],
//      },
    },

    concurrent: {
      target1: {
          tasks: ['newer:less', 'newer:copy:styles', 'watch:less'],
          options: {
              logConcurrentOutput: true
          },
      },
      target2: ['jekyll:serve'],
      target3: ['watch:less', 'watch:jekyll']
    },
  });

  //TASKS
  //WORKS -->
  // Jekyll Serve - copies 'dev/dist/' to 'dev/_pub', then builds jekyll files
  grunt.registerTask('serve', ['copy:toJekyllDist','jekyll:serve']);

  //WORKS -->
  //Watch LESS files for changes, compile to CSS, and minify. Copy CSS from 'dist/css/' to 'jekyll/dist/css/'
  grunt.registerTask('styles-dev', ['less', 'newer:copy:styles']);

  //Copy generated HTML & minified css to root
  grunt.registerTask('copyToRoot', ['less:minify', 'copy:siteHTML']);

  //WORKS -->
  //Build site for development: builds, but doesn't serve jekyll files, compiles and minifies CSS
  grunt.registerTask('build', ['styles-dev', 'jekyll:build' ]);

  //WORKS -->
  //Copy minified assets + static jekyll build files to 'gh-pages/' directories
  grunt.registerTask('stage', ['copy:minifiedAssets', 'copy:staticBuildFiles']);

  //WORKS -->
  //commit and push all changes in 'gh-pages/' directory to gh-pages branch
  grunt.registerTask('deploy', ['gh-pages:gh-pages']);

  //EXTRAS
  //Cleans 'jekyll/_site/dist/' (meant to be used WHILE a jekyll server is running)
  grunt.registerTask('rebuild-dist', ['newer:clean:buildDist', 'copy:toBuildDist']);

  grunt.registerTask('styles', ['styles-dev', 'rebuild-dist']);

  //WORKS -->
  //Copy all contents of 'dist/' to 'jekyll/dist/' -- NOTE: 'dist/fonts/' contents go everywhere
  grunt.registerTask('dist', ['copy:styles', 'copy:fonts', 'copy:scripts']);

  //TEST TASKS
  grunt.registerTask('test-copy', ['copy:test']);

  // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

  //Grunt Dev --run jekyll server, build jekyll static files, watch less files, compile to css

};
