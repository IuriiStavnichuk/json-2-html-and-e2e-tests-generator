module.exports = function (grunt) {
    grunt.initConfig({

        // define source files and their destinations
        concat: {
            vendor: {
                src: [
                    "js/vendor/jquery-1.8.2.min.js",
                    "js/vendor/jquery-plugins/jquery.counter.min.js",
                    "js/vendor/jquery-plugins/jquery.dateentry.min.js",
                    "js/vendor/jquery-plugins/jquery.daterangepicker.min.js",
                    "js/vendor/jquery-plugins/jquery.inputfit.min.js",
                    "js/vendor/jquery-plugins/jquery.mCustomScrollbar.min.js",
                    "js/vendor/jquery-plugins/jquery.mousewheel.min.js",
                    "js/vendor/jquery-ui-1.8.24.min.js",
                    "js/vendor/d3.v3/d3.v3.min.js",
                    "js/vendor/angular-1.2.2/angular.min.js",
                    "js/vendor/angular-1.2.2/angular-cookies.min.js",
                    "js/vendor/angular-1.2.2/angular-route.min.js",
                    "js/vendor/angular-1.2.2/angular-resource.min.js",
                    "js/vendor/angular-1.2.2/angular-sanitize.min.js",
                    "js/vendor/ui-bootstrap-0.10.0/ui-bootstrap-custom-0.10.0.min.js",
                    "js/vendor/ui-bootstrap-0.10.0/ui-bootstrap-custom-tpls-0.10.0.min.js",
                    "js/main.min.js"
                ],
                dest: 'js/mwa_vendor.js'
            },
            application: {
                src: [
                    "js/app/ui.js",
                    "js/app/cedric.js",
                    "js/app/modules/accountActivities.js",
                    "js/app/pages/accountOverview.js",
                    "js/app/modules/donutChart.js",
                    "js/app/modules/questionnaireCheckout.js",
                    "js/app/app.js",
                    "js/lib/payza/util/alias.js",
                    "js/lib/payza/util/debounce.js",
                    "js/lib/payza/util/menu.js",
                    "js/lib/payza/util/optionsToJSON.js",
                    "js/lib/payza/env/browser.js",
                    "js/lib/payza/forms/onlyDigits.js",
                    "js/lib/payza/plugins/accordion.js",
                    "js/lib/payza/plugins/behaviorTrigger.js",
                    "js/lib/payza/plugins/bootstrap.js",
                    "js/lib/payza/plugins/fancyTable.js",
                    "js/lib/payza/plugins/highlight.js",
                    "js/lib/payza/plugins/modal.js",
                    "js/lib/payza/plugins/moreLess.js",
                    "js/lib/payza/plugins/notably.js",
                    "js/lib/payza/plugins/passwordMeter.js",
                    "js/lib/payza/plugins/placement.js",
                    "js/lib/payza/plugins/subNav.js",
                    "js/lib/payza/plugins/tooltip.js",
                    "js/lib/payza/main.js"
                ],
                dest: 'js/mwa_application.js'
            }
        },
        uglify: {
            files: {
                src: [
                    'js/mwa_application.js'
                ],
                dest: 'js',
                expand: true,    // allow dynamic building
                flatten: true,   // remove all unnecessary nesting
                ext: '.min.js'   // replace .js to .min.js
            }
        },
        watch: {
            js:  { files: 'js/*.js', tasks: [ 'concat','uglify' ] }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [  'concat','uglify' ]);
};