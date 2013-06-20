module.exports = function (grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: grunt.file.read('banner.txt'),
    gruntFile: 'Gruntfile.js',
    sourceAll: 'src/**/*.js',
    testAll: 'src/**/*.js',

    // Task configuration.

    jsbeautifier: {
      files: [
        '<%= sourceAll %>',
        '<%= testAll %>',
        '<%= gruntFile %>'
      ],
      options: {
        indent_size: 2,
        indent_char: ' ',
        indent_level: 0,
        indent_with_tabs: false,
        preserve_newlines: true,
        max_preserve_newlines: 2,
        jslint_happy: true,
        brace_style: 'collapse',
        keep_array_indentation: false,
        keep_function_indentation: false,
        space_before_conditional: false,
        break_chained_methods: true,
        eval_code: false,
        wrap_line_length: 0,
        unescape_strings: false
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        node: true,
        jquery: true,
        globals: {
          d3: true
        }
      },
      files: [
        '<%= sourceAll %>',
        '<%= testAll %>',
        '<%= gruntFile %>'
      ]
    },

    qunit: {
      files: [
        'test/**/*.html'
      ]
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
        mangle: true,
        compress: true,
        wrap: 'BootstrapD3'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },

    watch: {
      files: [
        '<%= sourceAll %>',
        '<%= testAll %>',
        '<%= gruntFile %>'
      ],
      tasks: [
        'jsbeautifier',
        'jshint'
      ]
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsbeautifier');

  // Default task.
  grunt.registerTask('default', [
    'jsbeautifier',
    'jshint',
    //'qunit', 
    'concat',
    'uglify'
  ]);

  grunt.registerTask('test', [
    'jsbeautifier',
    'jshint',
    'qunit'
  ]);

  grunt.registerTask('develop', [
    'watch'
  ]);

};
