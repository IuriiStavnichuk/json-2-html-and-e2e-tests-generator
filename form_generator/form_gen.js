var fs = require("fs");
var data = fs.readFileSync( './form_generator/modelForFormGenerating.json');
var answers= JSON.parse(data);

var loadElement=function (type){

    switch (type) {
//        case "inputText":
//            element=
//                "<label for='firstName' class='ng-binding'>First name</label> "+
//                "<input type='text' name='firstName' id='firstName' class='form-control ng-pristine ng-invalid ng-invalid-required' tabindex='109' "+
//                "    data-ng-required='true' "+
//                "    data-ng-pattern='/^[a-zA-Z]+$/' "+
//                "    data-ng-model='signupForm.info.firstName.value' required='required'> ";
//               console.log ("element>>>", element);
//            break;
        case "inputText":
            element=
                (typeof model!== 'undefined' ?  '<label for="firstName" class="ng-binding"  data-ng-bind="resource.'+model+'.label"></label> ':'')+
                "<input type='text' class='form-control'"+
                (typeof model!== 'undefined' ?  ' data-ng-model=\"'+model+'\"':'')+
                (typeof value!== 'undefined' ?  ' data-ng-model=\"'+value+'\"':'')+
                (typeof name!== 'undefined' ?  ' name=\"'+name+ '\"':' name=\"'+id+ '\"' )+
                (typeof pattern!== 'undefined' ?  ' data-ng-pattern=\"'+pattern+ '\"':'' )+
                (typeof id!== 'undefined' ?  ' id=\"'+model+ '\"':'' )+
                (typeof forNgChange!== 'undefined' ?  ' data-ng-change=\"'+forNgChange+ '\"':'' )+
                (typeof isRequired!== 'undefined' ? ' data-ng-required=\"'+isRequired+ '\"':'')+
                (typeof tabindex!== 'undefined' ?  ' tabindex=\"'+tabindex+ '\"':'')+
                (typeof placeholder!== 'undefined' ? ' placeholder=\"{{'+'resource.'+model+'.placeholder'+ '}}\"':'' )+
                ">";
            break;
        case "radioCheckItem":
            element=
                "<div class='radio'" +
                    (typeof forNgShow!== 'undefined' ?  ' data-ng-show=\"'+forNgShow+'\"':'' )+
                    ">\n"+
                    "<input type='radio' " +
                    (typeof model!== 'undefined' ?  ' data-ng-model=\"'+model+'\"':'' )+
                    (typeof value!== 'undefined' ?  ' value=\"'+value+'\"':'' )+
                    (typeof id!== 'undefined' ?  ' name=\"'+id+ '\"':'' )+
                    (typeof forNgClick!== 'undefined' ?  ' data-ng-click=\"'+forNgClick+ '\"':'' )+
                    (typeof isRequired!== 'undefined' ? ' data-ng-required=\"'+isRequired+ '\"':'' )+
                    (typeof id!== 'undefined' ?  ' id=\"'+id+'\"':'' )+
                    ">\n<label"+
                    (typeof id!== 'undefined' ?  ' for=\"'+id+'\"':'' )+
                    (typeof title!== 'undefined' ?  ' data-ng-bind="'+title+'"':'' )+
                    "></label>\n"+
                    "</div>\n"
            break;
        case "groupedRadio":
            element=
                "<div class='field'" +
                    (typeof value!== 'undefined' ? ' data-ng-repeat=\"groups in '+value+'\" data-ng-show=\"groups.isVisible\"':'' )+
                    ">\n"+
                    "<h3  data-ng-bind='groups.name'></h3>\n"+
                    "<div class='radio' data-ng-repeat='radio in groups.data'" +
                    (typeof forNgShow!== 'undefined' ? ' data-ng-show=\"'+forNgShow+'\"':'' )+
                    ">\n"+
                    "<input type='radio' value='{{radio.id}}' data-ng-disabled='!radio.isEnabled'  data-ng-show='radio.name!=\"No data\"'  " +
                    (typeof model!== 'undefined' ?  ' data-ng-model=\"'+model+'\"':'' )+
                    (typeof id!== 'undefined' ?  ' name=\"'+id+'{{radio.id}}\"':'' )+
                    (typeof forNgClick!== 'undefined' ? ' data-ng-click=\'(info.idOfRecord.value==0||info.idOfRecord.value=="")?getPreviousWebsiteReviewQuestionnaire(radio.id):turnConfirmBusinessmodelVisibility()\'':' ' )+
                    (typeof isRequired!== 'undefined' ? ' data-ng-required=\"'+isRequired+ '\"':'' )+
                    (typeof id!== 'undefined' ?  ' id=\"'+id+'{{radio.id}}\"':'' )+
                    ">\n<label data-ng-bind='radio.name' data-ng-class='{disabled:!radio.isEnabled}'"+
                    (typeof id!== 'undefined' ?  ' for=\"'+id+'{{radio.id}}\"':'' )+
                    "></label>\n"+
                    "</div>\n"+

                    "</div>\n"
            break;
        case "checkBoxItem":
            element=
                "<div class='checkbox'>\n"+
                    "<input type='checkbox' " +
                    (typeof model!== 'undefined' ?  ' data-ng-model=\"'+model+'\"':'' )+
                    (typeof value!== 'undefined' ?  ' data-ng-true-value=\"'+value+'\"':'' )+
                    (typeof id!== 'undefined' ?  ' name=\"'+id+ '\"':'' )+
                    (typeof checked!== 'undefined' ?  ' data-ng-checked=\"'+checked+'\"':'' )+
                    (typeof isRequiredLevel3!== 'undefined' ? ' data-ng-required=\"'+isRequiredLevel3+ '\"':'' )+
                    (typeof id!== 'undefined' ?  ' id=\"'+id+'\"':'' )+
                    ">\n<label"+
                    (typeof id!== 'undefined' ?  ' for=\"'+id+'\"':'' )+
                    (typeof title!== 'undefined' ?  ' data-ng-bind="'+title+'"':'' )+
                    "></label>\n"+
                    "</div>\n"
            break;
        case "checkBoxTwoColumn":
            element=
                "<div class='checkbox two-column'>\n"+
                    "<input type='checkbox' " +
                    (typeof model!== 'undefined' ?  ' data-ng-model=\"'+model+'\"':'' )+
                    (typeof value!== 'undefined' ?  ' data-ng-true-value=\"'+value+'\"':'' )+
                    (typeof id!== 'undefined' ?  ' name=\"'+id+ '\"':'' )+
                    (typeof checked!== 'undefined' ?  ' data-ng-checked=\"'+checked+'\"':'' )+
                    (typeof isRequiredLevel3!== 'undefined' ? ' data-ng-required=\"'+isRequiredLevel3+ '\"':'' )+
                    (typeof id!== 'undefined' ?  ' id=\"'+id+'\"':'' )+
                    ">\n<label"+
                    (typeof id!== 'undefined' ?  ' for=\"'+id+'\"':'' )+
                    (typeof title!== 'undefined' ?  ' data-ng-bind="'+title+'"':'' )+
                    "></label>\n"+
                    "</div>\n"
            break;
        case "selectItem":
            element=
                "<select class='form-control'"+
                    (typeof model!== 'undefined' ?  ' data-ng-model=\"'+model+'\"':'' )+
                    (typeof id!== 'undefined' ?  ' id=\"'+id+ '\"':'' )+
                    (typeof value!== 'undefined' ?  ' data-ng-options=\"v as o.substring(3) for (o,v) in '+value+'\" ':'' )+
                    (typeof id!== 'undefined' ?  ' name=\"'+id+ '\"':'' )+
                    (typeof isRequired!== 'undefined' ? ' data-ng-required=\"'+isRequired+ '\"':'' )+
                    ">\n<option value=''>Select</option>\n</select>\n"
            break;
        case "textItem":
            element=(typeof errorMessage!== 'undefined'?"<div class='alert alert-error' data-ng-show='"+formName+"."+(typeof name!== 'undefined' ?name:id)+".$dirty&&"+formName+"."+(typeof name!== 'undefined'?name:id )+".$invalid'>\n<span data-ng-bind="+errorMessage+"></span>\n</div>\n":"");
            element=element+"<input type='text' class='form-control'"+
                    (typeof model!== 'undefined' ?  ' data-ng-model=\"'+model+'\"':'')+
                    (typeof value!== 'undefined' ?  ' data-ng-model=\"'+value+'\"':'')+
                    (typeof name!== 'undefined' ?  ' name=\"'+name+ '\"':' name=\"'+id+ '\"' )+
                    (typeof pattern!== 'undefined' ?  ' data-ng-pattern=\"'+pattern+ '\"':'' )+
                    (typeof id!== 'undefined' ?  ' id=\"'+id+ '\"':'' )+
                    (typeof forNgChange!== 'undefined' ?  ' data-ng-change=\"'+forNgChange+'\"':'' )+
                    (typeof isRequired!== 'undefined' ? ' data-ng-required=\"'+isRequired+ '\"':'')+
                    (typeof tabindex!== 'undefined' ?  ' tabindex=\"'+tabindex+'\"':'')+
                    ">\n"+
                    (typeof placeholder!== 'undefined' ? '<span class="help-block">{{'+placeholder+ '}}</span>\n':'' )
            break;
        case "textareaItem":
            element=
                "<textarea class='form-control' rows=\"2\" cols=\"20\""+
                    (typeof model!== 'undefined' ?  ' data-ng-model=\"'+model+'\"':'' )+
                    (typeof value!== 'undefined' ?  ' data-ng-model=\"'+value+'\"':'' )+
                    (typeof id!== 'undefined' ?  ' name=\"'+id+ '\"':'' )+
                    (typeof id!== 'undefined' ?  ' id=\"'+id+ '\"':'' )+
                    (typeof isRequired!== 'undefined' ? ' data-ng-required=\"'+isRequired+ '\"':'' )+
                    (typeof tabindex!== 'undefined' ?  ' tabindex=\"'+tabindex+'\"':'' )+
                    "></textarea>\n"
            break;
        case "uploadTool":
            element=
                "<div id='checkout-submit-form'></div>\n"
            break;
        case "navItem":
            element=
                "<div class='nav'>\n" +
                    '<a class="btn btn-info" ' +
                    (typeof forNgClick!== 'undefined' ?  ' data-ng-click=\"'+forNgClick+'\"':'' )+
//                    ' data-ng-disabled='+formName+'.$invalid' +
                    '>Save</a>\n</div>\n<hr>\n'
            break;
        case "button":
            element=
                "<div class='nav'>\n" +
                    '<a class="btn btn-info" ' +
                    (typeof forNgClick!== 'undefined' ?  ' data-ng-click=\"'+forNgClick+'\"':'' )+
                    (typeof forNgInit!== 'undefined' ?  ' data-ng-init=\"'+forNgInit+'\"':'' ) +
                    '>' +
                    (typeof buttonTitle!== 'undefined' ? ''+buttonTitle+'':'' )+
                    '</a>\n'+
                    '</div>\n'

            break;
        case "submitButton":
            element=
                "       <a class='btn btn-info ng-binding' id='btnSubmitSignupForm' data-ng-click='submitData(signupForm.info)'>Save and continue</a>\n "+
                "       <a href='#' class='btn btn-link ng-binding' data-ng-click='hideElements()'>Cancel</a> "
            break;
        case "logicElement":
            element=
                "<textarea rows='2' cols='20'"+
                    (typeof model!== 'undefined' ?  ' data-ng-model=\"'+model+'\"':'' )+
                    (typeof id!== 'unimages/backgrounds/noise.pngdefined' ?  ' name=\"'+id+ '\"':'' )+
                    (typeof isRequired!== 'undefined' ? ' data-ng-required=\"'+isRequired+ '\"':'' )+
                    "></textarea>\n"
    }
}

info={};
debugMode=0;
id=0;

template=""
//    "<div class='panel-body' data-ng-show='merchantServicesBlockVisible' data-ng-init='merchantServicesBlockVisible=0'>\n" +
//    "<div class='loading-indicator-lightbox'></div>\n"+
//    "<div class='row wizard-row'>\n" +
//         "<div class='col-sm-8'><p>{{resource.page.text}}</p></div>\n"+
//         "<div class='col-sm-6'>\n";

template=template+(debugMode==1 ?"<input type='checkbox' data-ng-model='debugMode' name='debug' value='0'>&nbsp;<label>Debug mode</label>&nbsp;&nbsp;\n":'' )
template=template+(debugMode==1 ?"<input type='radio' data-ng-model='currentLanguage' value='\"en-US\"' data-ng-init='info.questionnaireModeId.value=en-US' name='currentLanguage' required='required'><label>En</label>&nbsp":'' )
template=template+(debugMode==1 ?"<input type='radio' data-ng-model='currentLanguage' value='\"fr-CA\"' name='currentLanguage' required='required'>&nbsp;<label>Fr</label><br>\n":'' )

template=template+(debugMode==1 ?"<input type='radio' data-ng-model='info.urlQuestionnaireTypeId.value' value='2' data-ng-init='info.urlQuestionnaireTypeId.value=2' name='questionnaireTypeId'><label>checkout</label>&nbsp":'' )
template=template+(debugMode==1 ?"<input type='radio' data-ng-model='info.urlQuestionnaireTypeId.value' value='3' name='questionnaireTypeId'>&nbsp;<label>charity&nbsp&nbsp&nbsp&nbsp urlQuestionnaireTypeId&nbsp&nbsp</label><span data-ng-bind='info.urlQuestionnaireTypeId.value'></span><br>\n\n":'' )

template=template+(debugMode==1 ?"<input type='radio' data-ng-model='info.questionnaireMode.value' value='1' data-ng-init='info.questionnaireMode.value=1' name='questionnaireMode'><label>first time</label>&nbsp":'' )
template=template+(debugMode==1 ?"<input type='radio' data-ng-model='info.questionnaireMode.value' value='2' name='questionnaireMode'>&nbsp;<label>subsequent time &nbsp&nbsp&nbsp&nbsp questionnaireMode &nbsp&nbsp</label><span data-ng-bind='info.questionnaireMode.value'></span><br>\n\n":'' )
template=template+(debugMode==1 ?"Is Section Client valid 1 <span data-ng-bind='introductionSection.$valid'></span> 6 <span data-ng-bind='donationRevenueDetails.$valid'></span> 2 <span data-ng-bind='productInformation.$valid'></span> 3 <span data-ng-bind='salesInformation.$valid'></span> 4 <span data-ng-bind='customerRelations.$valid'></span></br>\n\n":'' )
template=template+(debugMode==1 ?"Is Section Server valid 1 <span data-ng-bind='introductionSection.serverValid'></span> 6 <span data-ng-bind='donationRevenueDetails.serverValid'></span> 2 <span data-ng-bind='productInformation.serverValid'></span> 3 <span data-ng-bind='salesInformation.serverValid'></span> 4 <span data-ng-bind='customerRelations.serverValid'></span>\n\n":'' )

for (var i in answers){
    id++;
    formName=answers[i].level1[0].formName;
    idForTitle=answers[i].level1[0].id;
    formId=answers[i].level1[0].formId;
    forNgClass=answers[i].level1[0].forNgClass;
    forNgClick=answers[i].level1[0].forNgClick;
    formforNgShow=answers[i].level1[0].forNgShow;
    title=answers[i].level1[0].title;

    if (formName!== "") {
         template=template+'<form name='+formName+(typeof formforNgShow!== 'undefined' ? ' data-ng-show=\"'+formforNgShow+'\"':'' )+' novalidate>\n';
    }

    if (title!== "") {
    template=template+'<h2'+
        (typeof idForTitle!== 'undefined' ? ' id=\"'+idForTitle+'\"':'' )+
        (typeof forNgClass!== 'undefined' ? ' data-ng-class=\"'+forNgClass+'\"':'' )+
        (typeof forNgClick!== 'undefined' ?  ' data-ng-click=\"'+forNgClick+'\"':'' )+
        ' data-ng-bind=\"'+title+'\"'+
        '></h2>\n';
    }

    for (var ii in answers[i].level1[0].level2){
        id++;
        title=answers[i].level1[0].level2[ii].title;
        forNgShowLevel2=answers[i].level1[0].level2[ii].forNgShow;

        forNgInitTitleLevel2=answers[i].level1[0].level2[ii].forNgInitTitleLevel2;
        forNgShowTitleLevel2=answers[i].level1[0].level2[ii].forNgShowTitleLevel2;
        isRequired=answers[i].level1[0].level2[ii].isRequired;

        model=answers[i].level1[0].level2[ii].level3[0].model;

        message=answers[i].level1[0].level2[ii].message;
        messageforNgShow=answers[i].level1[0].level2[ii].messageforNgShow;

        template=template+'<div class="form-group">\n'


       // template=template+'<div class="form-group"' +
//            (typeof forNgShowLevel2!== 'undefined' ?  ' data-ng-show=\"'+forNgShowLevel2+'\"':'')+'>\n'+
//            (typeof title!== 'undefined' ?  '<label ' +
//                (typeof forNgShowTitleLevel2!== 'undefined' ?  ' data-ng-show=\"'+forNgShowTitleLevel2+'\"  ':'')+
//                (typeof forNgInitTitleLevel2!== 'undefined' ?  ' data-ng-init=\"'+forNgInitTitleLevel2+'\"  ':'')+
//                'data-ng-bind="'+title+'"></label>\n':'' );

        template=template+
            (typeof model!== 'undefined'&&model.indexOf("info.")>-1&&typeof model.replace(".value",".errorMessage")!=='undefined' ?  "<div class='alert alert-error' data-ng-show='"+model.replace(".value",".errorMessage")+"'>\n<span data-ng-bind='"+model.replace(".value",".errorMessage")+"'></span>\n</div>\n":"" );

        for (var iii in answers[i].level1[0].level2[ii].level3){
            id++;
            type=answers[i].level1[0].level2[ii].level3[iii].type;
            model=answers[i].level1[0].level2[ii].level3[iii].model;
            title=answers[i].level1[0].level2[ii].level3[iii].title;
            width=answers[i].level1[0].level2[ii].level3[iii].width;
            if (typeof width== 'undefined') width= 'col-sm-12';
            buttonTitle=answers[i].level1[0].level2[ii].level3[iii].titleButton;
            name=answers[i].level1[0].level2[ii].level3[iii].name;
            fieldName=answers[i].level1[0].level2[ii].level3[iii].fieldName;
            isRequiredLevel3=answers[i].level1[0].level2[ii].level3[iii].isRequired;
            value=answers[i].level1[0].level2[ii].level3[iii].value;
            checked=answers[i].level1[0].level2[ii].level3[iii].checked;
            forNgInit=answers[i].level1[0].level2[ii].level3[iii].forNgInit;
            forNgClick=answers[i].level1[0].level2[ii].level3[iii].forNgClick;
            forNgChange=answers[i].level1[0].level2[ii].level3[iii].forNgChange;
            pattern=answers[i].level1[0].level2[ii].level3[iii].pattern;
            forNgShow=answers[i].level1[0].level2[ii].level3[iii].forNgShow;
            errorMessage=answers[i].level1[0].level2[ii].level3[iii].errorMessage;
            placeholder=answers[i].level1[0].level2[ii].level3[iii].placeholder;

            loadElement(type);

            template=template+"<div class='row'>\n"+
                    "<div class="+width+">\n"+
                       element+
                    "\n</div>\n"+
                "</div>\n"+
                (debugMode==1 ? '<hr style="margin:0; border-top: 0 solid #fff;">\n<div class="debugMessage" data-ng-show="debugMode"><span data-ng-click="showDiv=!showDiv" data-ng-bind="showDiv?\'[ + ] \':\'[ - ] \'"></span> '+model+'- &nbsp;&nbsp;' +
                    '<span data-ng-bind="'+model+'"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;isValid-\n'+
                    '<span data-ng-bind="'+formName+'.'+id+'.$valid" data-ng-class="{ success:'+formName+'.'+id+'.$valid, error:'+formName+'.'+id+'.$invalid }"></span>\n'+
                    '<div data-ng-show="showDiv">isRequiredIF- <span>'+isRequired+'</span><br>\n'+
                    'isVisibleIF- <span>'+forNgShowLevel2+'</span><br>\n' +
                    'isChecked- <span>'+checked+'</span></div>\n' +
                    '</div>\n':'' )
        }
        template=template+'</div>\n';
//        template=template+
//            (typeof message!== 'undefined' ?  "<div class='field radio-check-field'>\n<div class='alert alert-info' data-ng-show='"+messageforNgShow+"'>\n<span data-ng-bind='"+message+"'></span>\n</div>\n</div>\n":"" );
    }

    if (formName!== "") {
        template=template+'</form>\n';
    }
}
//template=template+'</div>\n</div>\n';

var fs = require('fs');
fs.writeFile("./form_generator/test_form.htm", template , function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("Step 1. The FORM for testing was generated!");
    }
});

