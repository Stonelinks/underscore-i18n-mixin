'use strict';
module.exports = function(grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // read package.json
    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({

        pkg: pkg,

        watch: {

            options: {
                livereload: 12345
            },

            // build the website if anything changes
            src: {
                files: [
                    './**/*.js',
                    './**/*.html'
                ],
                // tasks: ['jekyll']
            }
        },

        // testing server
        connect: {

            options: {
                hostname: '*',
                port: 1234,
                livereload: 12345,
                // base: '_site'
            },

            testserver: {}
        }
    });

    grunt.registerTask('default', function() {

        grunt.option('force', true);

        grunt.task.run([
            'connect',
            'watch'
        ]);
    });
};
