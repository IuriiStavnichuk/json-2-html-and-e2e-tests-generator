//  protractor example/chromeConf.js
var fs = require('fs');

function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(buf = new Buffer(data, 'base64'));
    stream.end();
}

var dt = new Date();
//var formattedTime=dt.getFullYear() + "." + (1+dt.getMonth()) + "." + dt.getDate()+ "-" + dt.getHours()+ "." + dt.getMinutes() + "." + dt.getSeconds();
var formattedTime=dt.getFullYear() + "." + (1+dt.getMonth()) + "." + dt.getDate()+ "-" + dt.getHours()+ "." + dt.getMinutes();

describe('angularjs homepage', function() {
//  it('test First Name', function() {
//      browser.get('http://localhost/SignupRedesign/signup/signup.aspx#');
//
//      element(by.model('signupForm.info.firstName.value')).sendKeys('123');
//
//      var varToTest = element(by.id('emailAddressAlert'));
//
//      setTimeout(function () {expect(varToTest.getText()).toEqual('error First name')}, 20000)
//
//      expect(varToTest.getText()).toEqual('error First name')
//  });

    it('test First name', function() {

        var browser = protractor.getInstance();

        browser.get('http://localhost/SignupRedesign/signup/signup.aspx#');

        element(by.model('signupForm.info.firstName.value')).sendKeys("fghfghfgf567567568h");
        browser.sleep(5000);
        expect(element(by.id('firstNameAlert')).getCssValue('display')).toEqual('block');


        browser.takeScreenshot().then(function (png) {
            var browserName="";
            var formattedTime="";
            var url_="";

            browser.getCapabilities().then(function (capabilities) {
                browserName = capabilities.caps_.browserName;
                formattedTime = capabilities.currentTime;
                console.log ("browser >>>", browser );
            });
            browser.getCurrentUrl().then(function (currentUrl) {

                url_= currentUrl.split('/').pop();
                url_=url_.replace(".",'_');  url_=url_.replace("#",'');

                var folderName = 'screenshots/'+formattedTime;

                    fs.mkdir( folderName , 0777, true, function (err) { if (err) { console.log(err);} else { console.log('Directory created >>>'); } });

                var folderName = 'screenshots/'+formattedTime+'/'+url_;

                    fs.mkdir( folderName , 0777, true, function (err) { if (err) { console.log(err);} else { console.log('Directory created >>>'); } });



                writeScreenShot(png, folderName+'/'+browserName+'.png');

            });

        });

    } );

});

//browser.debugger()
