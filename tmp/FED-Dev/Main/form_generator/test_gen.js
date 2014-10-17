var fs = require("fs"),element;
var data = fs.readFileSync( './form_generator/modelForFormGenerating.json');
var data= JSON.parse(data);


var loadElement=function (type){
    switch (type) {

        case "string":
            element=
                "describe('Test "+model+" field of the form "+formName+"', function() { \n"+
                "    it('it required \"string\" but we put \"number\" so it should show error message', function() { \n"+
                "        element(by.model('"+model+"')).clear(); \n"+
                "        element(by.model('"+model+"')).sendKeys('98756756547567567'); \n"+
                "        element(by.id('btnSubmitSignupForm')).click(); \n"+
                "        browser.sleep(800); \n"+
                "        expect(element(by.id('alert-error-"+model+"')).getText()).toBe('errorMessage test'); \n"+
                "        browser.takeScreenshot().then( function (png) { prepaireInfoForScreenshot(png); } ); \n"+
                "    }); \n"+
                "}); \n"+
                "describe('Test 22 "+model+" field of the form "+formName+"', function() { \n"+
                "    it('it required \"string\" and we put \"string\" so it should not show error message', function() { \n"+
                "        element(by.model('"+model+"')).clear(); \n"+
                "        element(by.model('"+model+"')).sendKeys('fghfhfghffhdf'); \n"+
                "        element(by.id('btnSubmitSignupForm')).click(); \n"+
                "        browser.sleep(1000); \n"+
                "    expect(element(by.id('alert-error-"+model+"')).isPresent()).toBeFalsy(); \n"+
//                "    var logout =  by.id('alert-error-"+model+"');  \n"+
//                "    expect(browser.isElementPresent(logout)).toBeFalsy();\n"+
                "    browser.takeScreenshot().then( function (png) { prepaireInfoForScreenshot(png); } ); \n"+
                "    }); \n"+
                "}); \n"
            break;
        case "number":
            element=
                "describe('Test "+model+" field of the form "+formName+"', function() { \n"+
                "    it('it required \"number\" but we put \"string\" so it should show error message', function() { \n"+
                "        element(by.model('"+model+"')).clear(); \n"+
                "        element(by.model('"+model+"')).sendKeys('test test test test'); \n"+
                "        element(by.id('btnSubmitSignupForm')).click(); \n"+
                "        browser.sleep(800); \n"+
                "        expect(element(by.id('alert-error-"+model+"')).getText()).toBe('Age errorMessage'); \n"+
                "        browser.takeScreenshot().then( function (png) { prepaireInfoForScreenshot(png); } ); \n"+
                "    }); \n"+
                "});\n"+
                "describe('Test "+model+" field of the form "+formName+"', function() { \n"+
                "    it('it required \"number\" and we put \"number\" so it should not show error message', function() { \n"+
                "        element(by.model('"+model+"')).clear(); \n"+
                "        element(by.model('"+model+"')).sendKeys('19'); \n"+
                "        element(by.id('btnSubmitSignupForm')).click(); \n"+
                "        browser.sleep(1000); \n"+
                    "        expect(element(by.id('alert-error-"+model+"')).isPresent()).toBeFalsy(); \n"+
                "        browser.takeScreenshot().then( function (png) { prepaireInfoForScreenshot(png); } ); \n"+
                "    }); \n"+
                "});\n"
            break;
        case "email":
            element=
                "describe('Test "+model+" field of the form "+formName+"', function() { \n"+
                "    it('it required \"email\" but we put \"number\" so it should show error message', function() { \n"+
                "        element(by.model('"+model+"')).sendKeys('34535365'); \n"+
                "        element(by.id('btnSubmitSignupForm')).click(); \n"+
                "        browser.sleep(800); \n"+
                "        expect(element(by.id('alert-error-"+model+"')).getText()).toBe('Email errorMessage'); \n"+
                "        browser.takeScreenshot().then( function (png) { prepaireInfoForScreenshot(png); } ); \n"+
                "    }); \n"+
                "});\n"+
                "describe('Test "+model+" field of the form "+formName+"', function() { \n"+
                "    it('it required \"email\" and we put \"email\" so it should not show error message', function() { \n"+
                "        element(by.model('"+model+"')).clear(); \n"+
                "        element(by.model('"+model+"')).sendKeys('dgdfgfdg@fgdfgdfggdg.gff'); \n"+
                "        element(by.id('btnSubmitSignupForm')).click(); \n"+
                "        browser.sleep(2000); \n"+
                    "        expect(element(by.id('alert-error-"+model+"')).isPresent()).toBeFalsy(); \n"+
                "        browser.takeScreenshot().then( function (png) { prepaireInfoForScreenshot(png); } ); \n"+
                "    }); \n"+
                "});\n"
            break;
        default :
            element="";
    }
}

var info={},id=0,template="";

for (var i in data){
    id++;
    formName=data[i].level1[0].formName;

    for (var ii in data[i].level1[0].level2){
        id++;
        for (var iii in data[i].level1[0].level2[ii].level3){
            id++;
            type=data[i].level1[0].level2[ii].level3[iii].type;
            model=data[i].level1[0].level2[ii].level3[iii].model;
            title=data[i].level1[0].level2[ii].level3[iii].title;
            width=data[i].level1[0].level2[ii].level3[iii].width;
            if (typeof width== 'undefined') width= 'col-sm-12';
            buttonTitle=data[i].level1[0].level2[ii].level3[iii].titleButton;
            name=data[i].level1[0].level2[ii].level3[iii].name;
            fieldName=data[i].level1[0].level2[ii].level3[iii].fieldName;
            isRequiredLevel3=data[i].level1[0].level2[ii].level3[iii].isRequired;
            value=data[i].level1[0].level2[ii].level3[iii].value;
            checked=data[i].level1[0].level2[ii].level3[iii].checked;
            forNgInit=data[i].level1[0].level2[ii].level3[iii].forNgInit;
            forNgClick=data[i].level1[0].level2[ii].level3[iii].forNgClick;
            forNgChange=data[i].level1[0].level2[ii].level3[iii].forNgChange;
            pattern=data[i].level1[0].level2[ii].level3[iii].pattern;
            forNgShow=data[i].level1[0].level2[ii].level3[iii].forNgShow;
            errorMessage=data[i].level1[0].level2[ii].level3[iii].errorMessage;
            placeholder=data[i].level1[0].level2[ii].level3[iii].placeholder;
            testType=data[i].level1[0].level2[ii].level3[iii].testType;
            loadElement(testType);
//            console.log ("-----------------------data[i]>>>", data[i].level1[0].level2[ii]);
//            console.log ("testType>>>", testType);
//            console.log ("element>>>", element);
            template=template+element;
        }
    }
}

//fs.readFile('./test.js', function(err, data) {
//    if (!err) {
//        data = data.toString();
//        var linesArray = data.split('\n');
//        linesArray.splice(28,10000);
//        var basicFunctions = linesArray.join('\n');
//        var fs = require('fs');
//        fs.writeFile("./test.js", basicFunctions+'\n\n'+template , function(err) {
//            if(err) {
//                console.log(err);
//            } else {
//                console.log("Step 2. The TEST was generated!");
//            }
//        });
//    } else {
//        console.log(err);
//    }
//});

fs.writeFile("./form_generator/test_body.js", template , function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("Step 2. The TEST was generated!");
    }
});



