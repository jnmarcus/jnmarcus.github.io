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

    'gh-pages': {
      options: {
        base: 'pub',
        // branch: 'gh-pages',
        add: true,
        dotfiles: true,
        branch: 'test-grunt',
        repo: 'https://github.com/jnmarcus/jnmarcus.github.io.git',
        message: 'grunt',
      },
      src: 'dist/**/*',
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

  // grunt.registerTask('css-pub', ['css', 'css-copy']); --DOESN'T WORK!!

  grunt.registerTask('dist-css', ['newer:less', 'newer:copy', 'watch']);

  grunt.registerTask('pub-css', ['newer:less', 'newer:copy:css']);

  grunt.registerTask('pub-push', ['pub-css', 'gh-pages']);

  // Default task.
  grunt.registerTask('default', ['less', 'watch:less']);



};
