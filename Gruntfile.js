module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    meta: {
      banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
    },

    clean: {
      dev: {
        src: ['dev']
      },
      dist: {
        src: ['dist']
      }
    },

    concat: {
      js: {
        src: [
          'vendor/js/**/*.js',
          'src/js/app.js',
          'src/js/app.routing.js',
          'src/js/Directives/*.js',
          'src/js/Services/*.js',
          'src/js/Controllers/*.js',
        ],
        exclude:[

        ],
        dest: 'dev/app.js',
        separator: ";"
      },

      css: {
        src: ['vendor/css/**/*.css', 'src/css/**/*.css'],
        dest: 'dev/app.css'
      }
    },

    cssmin: {
      compress: {
        files: {
          "dist/app.min.css": "<%= concat.css.dest %>"
        }
      }
    },

    uglify: {
      js: {
        src: '<%= concat.js.dest %>',
        dest: 'dist/app.min.js'
      }
    },

    watch: {
      gruntfile: ['Gruntfile.js'],
      js: {
        files: ["<%= concat.js.src %>"],
        tasks: ["concat:js",'copy']
      },
      css: {
        files: ["<%= concat.css.src %>"],
        tasks: ["concat:css",'copy']
      },
      homepage: {
        files: ["<%= homepage.template %>"],
        tasks: ["homepage:dev",'copy']
      }
    },

    dev_server: {
      base: "dev",
      web: {
        port: 4200
      }
    },
    copy: {
      main: {
        files:[
          {
            expand: true,
            flatten: true,
            src: ['src/app/Home/**'],
            dest: 'dev/app/Home/',
            filter: 'isFile'
          },
          {
            expand: true,
            flatten: true,
            src: ['src/app/Common/**'],
            dest: 'dev/app/Common/',
            filter: 'isFile'
          },
          {
            expand: true,
            flatten: true,
            src: ['src/assets/**'],
            dest: 'dev/assets/',
            filter: 'isFile'
          }
          //add Views here
        ]
      },
    },
    homepage: {
      template: "src/index.html",
      dev: {
        dest: "dev/index.html",
        context: {
          js: "app.js",
          css: "app.css",
        }
      },
      dist: {
        dest: 'dist/index.html',
        context: {
          js: 'app.min.js',
          css: 'app.min.css'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadTasks("tasks");

  grunt.registerTask('serve', ['dev_server', 'clean', 'concat', 'copy', 'homepage:dev', 'watch']);
  grunt.registerTask('dist', ['clean', 'concat', 'uglify', 'cssmin', 'homepage:dist']);
  grunt.registerTask('default', 'dev');
};