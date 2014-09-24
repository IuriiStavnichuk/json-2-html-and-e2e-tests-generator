exports.config = {

    multiCapabilities: [

        {
            'browserName': 'chrome'
        }],

    specs: ['test.js'],

    baseUrl: 'http://localhost:8000',

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};
