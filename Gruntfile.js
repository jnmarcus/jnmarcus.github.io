module.exports = function(grunt) {
  'use strict';

  // Load grunt tasks automatically
  require('matchdep').filterDev('grunt-!(cli)').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration.
    less: {
      css: {
        options: {
          sourceMap: true,
          sourceMapFilename: 'custom-bootstrap.map'
        },
        files: {
          'dist/css/custom-bootstrap.css': ['less/custom-bootstrap.less'],
        },
      },
      minify: {
        options: {
          cleancss: true,
        },
        files: {
          'dist/css/custom-bootstrap.min.css': ['less/custom-bootstrap.less'],
        },
      }
    },

    copy: {
      css: {
        src: 'dist/css/custom-bootstrap.min.css',
        dest: 'pub/dist/css/custom-bootstrap.min.css',
      },
    },

    jekyll: {
      serve: {
        options: {
          bundleExec: true,
          src: '.',
          dest: './_gh-pages',
          config: '_config.yml',
          serve: true,
        server_port : 8000,
        auto : true,
        exclude: ['node_modules', 'less', 'app', 'test', 'Gemfile', 'Gemfile.lock', 'README.md', 'package.json', 'package-old.json', 'Gruntfile.js', 'Gruntfile-old.js', 'custom-bootstrap.map', 'site'],
        }, 
      },
      dev: {
        options: {
          src: '.',
          dest: './_gh-pages',
        },
      }, 

      // server : {
      //   src : 'templates',
      //   dest: 'dev',
      //   server : true,
      //   server_port : 4000,
      //   auto : true
      // },
      // dist: {                             // Target
      //   options: {                           // Target options
      //     dest: '<%= dist %>',
      //     config: '_config.yml,_config.build.yml'
      //   }
      // },
      // serve: {                               // Another target
      //   options: {
      //     dest: '.jekyll',
      //     drafts: true
      //   },
      // },
    },

    'gh-pages': {
      options: {
        // dotfiles: true,
        add: true,
      },
      //push to gh-pages
      'gh-pages': {
        options: {
          base: 'pub',
          branch: 'gh-pages',
          // repo: 'https://github.com/jnmarcus/jnmarcus.github.io.git',
          message: 'grunt',
        },
        src: ['dist/**/*'],
      },
      //push to test branch, test-grunt
      'test-grunt': {
        options: {
          base: 'pub',
          branch: 'test-grunt',
          // repo: 'https://github.com/jnmarcus/jnmarcus.github.io.git', 
          message: 'grunt',
        },
        src: ['dist/**/*']  
      },
    },

    watch: {
      //watch 'less/' directory for changes; if changed, recompile and re-minify custom-boostrap.less 
      less: {
        files: ['less/**/*.less'],
        tasks: ['less'],
        options: {
          // spawn: false,
          reload: true,
        },
      },
      // watch for changes to minified files in the 'dist/' directory; if changed, copy the files that changed to the 'pub/dist/' directory
      dist: {
        files: ['dist/css/**/*.min.css'],
        tasks: ['copy'],
        options: {
          spawn: false,
          event: ['changed'],
        },
      },

      jekyll: {
        files: [
                '_includes/*.html',
                '_layouts/*.html',
                '_config.yml',
                'index.html'
            ],
        tasks: ['jekyll:serve'],
        options: {
            interrupt: true,
            // atBegin: true
        },
      },

      // push: {
      //   files: ['dist/css/custom-bootstrap.min.css'],
      //   tasks: ['copy'],
      //   options: {
      //     spawn: false,
      //     event: ['changed'],
      //   },
      // },
    },
  });

  //TASKS

  grunt.registerTask('css', ['newer:less', 'watch:less']);

  grunt.registerTask('css-copy', ['copy:css', 'watch:dist']);

  grunt.registerTask('css-pub', ['css', 'css-copy']);

  // grunt.registerTask('dist-css', ['newer:less', 'newer:copy', 'watch']);

  grunt.registerTask('pub-css', ['newer:less', 'newer:copy:css']);

  grunt.registerTask('watch-all', ['less', 'newer:copy:css', 'jekyll', 'watch']);

  grunt.registerTask('pub-push', ['pub-css', 'gh-pages']);

  // Default task.
  grunt.registerTask('default', ['less', 'watch:less']);



};
