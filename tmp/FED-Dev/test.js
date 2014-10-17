var fs = require('fs');
function prepaireInfoForScreenshot(png) {
    var browserName="";
    var formattedTime="";
    var url_="";
    browser.getCapabilities().then(function (capabilities) {
        browserName = capabilities.caps_.browserName;
        formattedTime = capabilities.currentTime;
    });
    browser.getCurrentUrl().then(function (currentUrl) {
        url_= currentUrl.split('/').pop();
        url_=url_.replace(".",'_'); url_=url_.replace("#",'');
        var dt = new Date();
        var formattedTime=dt.getFullYear() + "." + (1+dt.getMonth()) + "." + dt.getDate()+ "-" + dt.getHours()+ "." + dt.getMinutes();
        var folderName = 'screenshots/'+formattedTime;
        fs.mkdir( folderName , 0777, true, function (err) { if (err) { console.log(err);} else { console.log('Directory created >>>'); } });
        var folderName = 'screenshots/'+formattedTime+'/'+url_;
        fs.mkdir( folderName , 0777, true, function (err) { if (err) { console.log(err);} else { console.log('Directory created >>>'); } });
        writeScreenShot(png, folderName+'/'+browserName+'.png');
    });
}
function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(buf = new Buffer(data, 'base64'));
    stream.end();
}
var browser = protractor.getInstance();
browser.get('http://localhost:63342/ProtractorTest/test.htm');

describe('Test firstName field of the form testForm', function() { 
    it('it should show error message', function() { 
        element(by.model('firstName')).sendKeys('756756547567567'); 
        element(by.id('btnSubmitSignupForm')).click(); 
        browser.sleep(2000); 
        expect(element(by.id('alert-error-firstName')).getText()).toBe('errorMessage test'); 
        browser.takeScreenshot().then( function (png) { prepaireInfoForScreenshot(png); } ); 
    }); 
});