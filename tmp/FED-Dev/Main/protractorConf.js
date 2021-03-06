// An example configuration file.
exports.config = {

    //Do not start a Selenium Standalone sever - only run this using chrome.
    //chromeOnly: true,
    //chromeDriver: '../selenium/chromedriver',

//    Capabilities to be passed to the webdriver instance.
//    capabilities: {
//        'browserName': 'internet explorer'
//    },
//    capabilities: {
//        'browserName': 'firefox'
//    },
//        capabilities: {
//        'browserName': 'chrome'
//    },

    multiCapabilities: [
//    {
//        'browserName': 'firefox'
//    },
//    {
//        'browserName': 'internet explorer'
//    },
      {
        'browserName': 'chrome'
    }],

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['test.js'],

    baseUrl: 'http://localhost:8000',

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};
