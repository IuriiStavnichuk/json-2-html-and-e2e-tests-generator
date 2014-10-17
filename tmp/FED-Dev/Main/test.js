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
    it('it required "string" but we put "number" so it should show error message', function() { 
        element(by.model('firstName')).clear(); 
        element(by.model('firstName')).sendKeys('98756756547567567'); 
        element(by.id('btnSubmitSignupForm')).click(); 
        browser.sleep(800); 
        expect(element(by.id('alert-error-firstName')).getText()).toBe('errorMessage test'); 
        browser.takeScreenshot().then( function (png) { prepaireInfoForScreenshot(png); } ); 
    }); 
}); 
describe('Test 22 firstName field of the form testForm', function() { 
    it('it required "string" and we put "string" so it should not show error message', function() { 
        element(by.model('firstName')).clear(); 
        element(by.model('firstName')).sendKeys('fghfhfghffhdf'); 
        element(by.id('btnSubmitSignupForm')).click(); 
        browser.sleep(1000); 
    expect(element(by.id('alert-error-firstName')).isPresent()).toBeFalsy(); 
    browser.takeScreenshot().then( function (png) { prepaireInfoForScreenshot(png); } ); 
    }); 
}); 
describe('Test customerAge field of the form testForm', function() { 
    it('it required "number" but we put "string" so it should show error message', function() { 
        element(by.model('customerAge')).clear(); 
        element(by.model('customerAge')).sendKeys('test test test test'); 
        element(by.id('btnSubmitSignupForm')).click(); 
        browser.sleep(800); 
        expect(element(by.id('alert-error-customerAge')).getText()).toBe('Age errorMessage'); 
        browser.takeScreenshot().then( function (png) { prepaireInfoForScreenshot(png); } ); 
    }); 
});
describe('Test customerAge field of the form testForm', function() { 
    it('it required "number" and we put "number" so it should not show error message', function() { 
        element(by.model('customerAge')).clear(); 
        element(by.model('customerAge')).sendKeys('19'); 
        element(by.id('btnSubmitSignupForm')).click(); 
        browser.sleep(1000); 
        expect(element(by.id('alert-error-customerAge')).isPresent()).toBeFalsy(); 
        browser.takeScreenshot().then( function (png) { prepaireInfoForScreenshot(png); } ); 
    }); 
});
describe('Test customerEmail field of the form testForm', function() { 
    it('it required "email" but we put "number" so it should show error message', function() { 
        element(by.model('customerEmail')).sendKeys('34535365'); 
        element(by.id('btnSubmitSignupForm')).click(); 
        browser.sleep(800); 
        expect(element(by.id('alert-error-customerEmail')).getText()).toBe('Email errorMessage'); 
        browser.takeScreenshot().then( function (png) { prepaireInfoForScreenshot(png); } ); 
    }); 
});
describe('Test customerEmail field of the form testForm', function() { 
    it('it required "email" and we put "email" so it should not show error message', function() { 
        element(by.model('customerEmail')).clear(); 
        element(by.model('customerEmail')).sendKeys('dgdfgfdg@fgdfgdfggdg.gff'); 
        element(by.id('btnSubmitSignupForm')).click(); 
        browser.sleep(2000); 
        expect(element(by.id('alert-error-customerEmail')).isPresent()).toBeFalsy(); 
        browser.takeScreenshot().then( function (png) { prepaireInfoForScreenshot(png); } ); 
    }); 
});
