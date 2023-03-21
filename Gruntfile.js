module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            development: {
                files: {
                    'dist/css/styles.css': 'src/styles/styles.styl'
                }
            },
        },
        cssmin: {
            target: {
                files: {
                    'dist/css/styles.min.css': ['dist/css/styles.css']
                }
            }
        },
        clean: ['dist/css/styles.css', 'dist/css/styles.css.map'],
        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: ['src/styles/styles.styl'],
                tasks: ['less', 'cssmin', 'clean'],
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less', 'cssmin', 'clean', 'watch']);
};
