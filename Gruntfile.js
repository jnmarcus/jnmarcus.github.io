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
        dist: 'dist',
        jekyllBuild: './jekyll/_site',
        ghPagesBuild: 'gh-pages'
    },

    // TASK CONFIGURATION

    less: {   //WORKS!
      css: {  //compile to CSS 
        options: {  //output sourcemap
          sourceMap: true,
          sourceMapFilename: 'custom-bootstrap.map'
        },
        files: {
          'dist/css/custom-bootstrap.css': ['less/custom-bootstrap.less'],
        },
      },
      minify: { //minify CSS file
        options: {
          cleancss: true,
        },
        files: {
          'dist/css/custom-bootstrap.min.css': ['less/custom-bootstrap.less'],
        },
      },
    },

    clean: {
      buildDist: {
        src: [ '<%= config.jekyllBuild %>/dist' ]
      },
    },

    copy: {  //WORKS!!
      styles: {   //'dist/css/' to 'jekyll/dist/css'
        expand: true,
        cwd: '<%= config.dist %>/',
        src: ['css/**/*'],
        dest: 'jekyll/dist/'
      },  
      fonts: {    //'dist/fonts/' to everywhere
        files: [
          { expand: true, cwd: '<%= config.dist %>/', src: ['fonts/**'], dest: 'jekyll/dist/'},
          { expand: true, cwd: '<%= config.dist %>/', src: ['fonts/**'], dest: '<%= config.ghPagesBuild %>/dist/'},
        ],
      },
      scripts: {   //'dist/js/' to 'jekyll/dist/js'
        expand: true,
        cwd: '<%= config.dist %>/',
        src: ['js/**'],
        dest: 'jekyll/dist/',
      }, 
      toBuildDist: {  //'jekyll/dist/' to 'jekyll/_site/dist/'
        expand: true,
        cwd: 'jekyll/',
        src: ['dist/**/*'],
        dest: '<%= config.jekyllBuild %>/'
      },
      minifiedAssets: {   //only minified assets to 'gh-pages/dist/' directories
        files: [
          //minified styles
          {src: '<%= config.jekyllBuild %>/dist/css/custom-bootstrap.min.css', dest: '<%= config.ghPagesBuild %>/dist/css/custom-bootstrap.min.css'},
          //minified javascript
          // {src: 'js/**.min.js', dest: '<%= config.ghPagesBuild %>/dist/js/'},
        ],
      },
      css: {  
        files: {
          src: 'dist/css/custom-bootstrap.min.css', 
          dest: 'gh-pages/dist/css/custom-bootstrap.min.css'
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
    },

    jekyll: {   //WORKS!!
      options: {
        bundleExec: true,
        src: './jekyll'
      },
      serve: {
        options: {
          dest: '<%= config.jekyllBuild %>',
          config: './_config.yml',
          serve: true, //+
          server_port: 8000, //+
          watch: true, //+
          drafts: true,
          exclude: ['node_modules', 'less', 'gh-pages', 'Gemfile', 'Gemfile.lock', 'README.md', 'package.json', 'package-old.json', 'Gruntfile.js', 'Gruntfile-old.js', 'custom-bootstrap.map', '.grunt', 'about', 'test']
        },
      },
      build: {
        options: {
          dest: '<%= config.jekyllBuild %>',
          drafts: true,
          exclude: ['node_modules', 'less', 'gh-pages', 'Gemfile', 'Gemfile.lock', 'README.md', 'package.json', 'package-old.json', 'Gruntfile.js', 'Gruntfile-old.js', 'custom-bootstrap.map', '.grunt', 'about', 'test']
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
        files: ['less/**/*.less'],
        tasks: ['less', 'copy:styles'],
      },
      distBuild: {
        files: ['jekyll/dist/**/*'],
        tasks: ['clean:buildDist', 'copy:toBuildDist'],
      },
      build:{
        files: [
                './jekyll/_includes/*.html',
                './jekyll/_layouts/*.html',
                './jekyll/*.html',
                './jekyll/_drafts/*.html'
            ],
        tasks: ['copy:staticBuildFiles'],
      },
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
  // Jekyll Serve
  grunt.registerTask('exec-serve', ['jekyll:serve']);

  //WORKS -->
  //Watch LESS files for changes, compile to CSS, and minify. Copy CSS from 'dist/css/' to 'jekyll/dist/css/'
  grunt.registerTask('styles-dev', ['less', 'newer:copy:styles']);

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

  //Grunt Dev --run jekyll server, build jekyll static files, watch less files, compile to css

};
