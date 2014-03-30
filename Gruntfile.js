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
      noMinify: {
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

    watch: {
      all: {
        files: ['less/**/*.less'],
        tasks: ['less'],
        options: {
          spawn: false,
        },
      },
    },
  });

  //TASKS
  // Default task.
  grunt.registerTask('default', ['less', 'watch']);

};
