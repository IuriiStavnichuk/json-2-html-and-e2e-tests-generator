module.exports = function (grunt) {
    grunt.initConfig({
        execute: {
            target: {
                src: [
                    "./form_generator/form_gen.js",
                    "./form_generator/test_gen.js"
                ]
            }
        },
        concat: {
            generate_testHtml_page: {
                src: [
                    "./form_generator/test_header.htm",
                    "./form_generator/test_form.htm",
                    "./form_generator/test_footer.htm"
                ],
                dest: 'test.htm'
            },
            generate_testJs: {
                src: [
                    "./form_generator/test_header.js",
                    "./form_generator/test_body.js"
                ],
                dest: 'test.js'
            }
        },
        protractor: {
            options: {
                keepAlive: true,
                singleRun: false,
                configFile: "protractorConf.js"
            },
            run: {

            }
        },
        concurrent: {
            protractor_test: ['protractor:run']
        }
    });

    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.registerTask('default', ['execute','concat','concurrent:protractor_test']);

};