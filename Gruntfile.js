var mozjpeg = require('imagemin-mozjpeg');

module.exports = function (grunt) {

    grunt.initConfig({

        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'assets/_js',
                    src: '**/*.js',
                    dest: 'public/assets/js/'
                }]
            }
        }, // uglify

        sass: {
            dist: {
                options: {style: 'normal'},
                files: [{
                    expand: true,
                    cwd: 'assets/_sass',
                    src: ['*.scss'],
                    dest: 'public/assets/css/',
                    ext: '.css'
                }]
            }
        }, // sass

        htmlmin: {
            dist: {
                options: {
                    removeComments: true
                    //collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'public/'
                }]
            }
        }, // htmlmin

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'assets/_css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/assets/css',
                    ext: '.min.css'
                }]
            }
        }, // cssmin

        imagemin: {                          // Task,
            dynamic: {                         // Another target
                options: {                       // Target options
                    optimizationLevel: 1,
                    svgoPlugins: [{removeViewBox: false}],
                    use: [mozjpeg()]
                },
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'img/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'public/img/'                  // Destination path prefix
                }]
            }
        }, // imagemin

        browserSync: {
            default_options: {
                bsFiles: {
                    src: [
                        "./public/assets/css/*.css",
                        "./public/*.html"
                    ]
                },
                options: {
                    watchTask: true,
                    reloadDelay: 500,
                    server: {
                        baseDir: "./public/"
                    }
                }
            }
        }, //browserSync

        watch: {
            dist: {
                files: [
                    'assets/_js/**/*',
                    'assets/_sass/**/*',
                    'img/**/*',
                    './*'
                ],
                tasks: ['uglify', 'sass', 'htmlmin', 'cssmin', 'imagemin']
            }
        } // watch

    });


    // Plugins do Grunt
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // Tarefas default
    grunt.registerTask('default');

    // Tarefa para Watch
    grunt.registerTask('w', ['watch']);

    // Tarefa para Server + Watch
    grunt.registerTask('s', ['browserSync', 'watch']);


};
