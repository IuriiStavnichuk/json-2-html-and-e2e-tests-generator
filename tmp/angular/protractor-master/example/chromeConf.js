// An example configuration file.

var dt = new Date();
var formattedTime=dt.getFullYear() + "." + (1+dt.getMonth()) + "." + dt.getDate()+ "-" + dt.getHours()+ "." + dt.getMinutes();
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
//

    currentTime: "test",

    multiCapabilities: [{
        'browserName': 'firefox'
    }, {
        'browserName': 'internet explorer'
    }, {
        'browserName': 'chrome'
    }],


    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['example_spec.js'],

   // baseUrl: 'http://localhost:8000',

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};
