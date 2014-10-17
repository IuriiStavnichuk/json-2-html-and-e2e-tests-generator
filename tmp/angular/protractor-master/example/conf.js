exports.config = {
    //seleniumAddress: 'http://localhost:4444/wd/hub',

    // Spec patterns are relative to this directory.
    specs: [
        'example_spec.js'
    ],


    chromeOnly: true,

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:8000'

};