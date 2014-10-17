//  protractor example/chromeConf.js
var fs = require('fs');

function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(buf = new Buffer(data, 'base64'));
    stream.end();
}

describe('angularjs homepage', function() {
//  it('test First Name', function() {
//      browser.get('http://localhost/SignupRedesign/signup/signup.aspx#');
//
//      element(by.model('signupForm.info.firstName.value')).sendKeys('123');
//
//      var varToTest = element(by.id('emailAddressAlert'));
//
//      setTimeout(function () {expect(varToTest.getText()).toEqual('error First name')}, 20000)
//     // expect(varToTest.getText()).toEqual('error First name')
//
//  }  );

    it('test2 First name', function() {
       browser.get('http://localhost/SignupRedesign/signup/signup2.aspx#');
        //browser.get('http://localhost:63342/protractor-master/testapp/index.html#/form');

        //element(by.model('signupForPersonalVisibility')).sendKeys('true');

        element(by.model('signupForm.info.firstName.value')).sendKeys("fghfghfgfdhf");
        browser.sleep(3000);
        expect(element(by.id('firstNameAlert')).getCssValue('display')).toEqual('none');

       browser.debugger()

        browser.takeScreenshot().then(function (png) {
            var dt = new Date();
            var formattedTime=dt.getFullYear() + "-" + (1+dt.getMonth()) + "-" + dt.getDate()+ "-" + dt.getHours()+ "." + dt.getMinutes() + "." + dt.getSeconds();
            writeScreenShot(png, 'screenshots/exception'+formattedTime+'.png');
        });

       // expect($('<div style="display: none; margin: 10px;"></div>')).toHaveCss({display: "none", margin: "10px"})
       // expect(varToTest).toEqual('block')

    }  );

});
