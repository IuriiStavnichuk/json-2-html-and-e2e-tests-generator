module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        protractor: {
            options: {
                keepAlive: true,
                singleRun: false,
                configFile: "chromeConf.js"
            },
            run_chrome: {
                options: {
                    args: {
                        browser: "chrome"
                    }
                }
            },
            run_firefox: {
                options: {
                    args: {
                        browser: "firefox"
                    }
                }
            },
            run: {

            }
        },
//        concurrent: {
//            protractor_test: ['protractor:run_firefox', 'protractor-chrome']
//        }
        concurrent: {
            protractor_test: ['protractor:run']
        }


    });

    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-concurrent');

//    grunt.registerTask('protractor-chrome', ['protractor:run_chrome']);
//    grunt.registerTask('protractor-firefox', ['protractor:run_firefox']);
//
//    grunt.registerTask('protractor-e2e', ['concurrent:protractor_test']);

    grunt.registerTask('default', ['concurrent:protractor_test']);


};