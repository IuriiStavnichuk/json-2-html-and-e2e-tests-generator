var demo = angular.module( "Demo", [] );

demo.directive("payzaForm", function ($compile, $http, $rootScope) {
    return {
        restrict: "E",
        replace:true,
        transclude: true,
        scope: {
            modelName:'=',
            debugMode:'='
        },
        compile: function($scope, element, attrs) {
            return function($scope, element, attrs) {
                //$scope.modelName='modelForCheckout.json';


                $http.get($scope.modelName).success(function(data) {
                    //$rootScope.answers=data;
                    $scope.info={};
//                    $scope.info.businessModel={};
//                    $scope.info.businessModel.source={ "site1.com":1, "site2.com":2, "site3.com":3, "site4.com":4 };
                    $scope.answers=data;
                    $scope.template="";$scope.id=0;

                    $scope.template=$scope.template+($scope.debugMode==1 ?"<input type='checkbox' ng-model='debugMode' name='debug' value='0'>&nbsp;<label>Debug mode</label>&nbsp;&nbsp;\n":'' )
                    $scope.template=$scope.template+($scope.debugMode==1 ?"<input type='radio' ng-model='currentLanguage' value='en-US' ng-init='info.questionnaireModeId.value=en-US' name='currentLanguage' required='required'><label>En</label>&nbsp":'' )
                    $scope.template=$scope.template+($scope.debugMode==1 ?"<input type='radio' ng-model='currentLanguage' value='fr-CA' name='currentLanguage' required='required'>&nbsp;<label>Fr</label><br>\n":'' )

                    $scope.template=$scope.template+($scope.debugMode==1 ?"<input type='radio' ng-model='info.urlQuestionnaireTypeId.value' value='2' ng-init='info.urlQuestionnaireTypeId.value=2' name='questionnaireTypeId'><label>checkout</label>&nbsp":'' )
                    $scope.template=$scope.template+($scope.debugMode==1 ?"<input type='radio' ng-model='info.urlQuestionnaireTypeId.value' value='3' name='questionnaireTypeId'>&nbsp;<label>charity&nbsp&nbsp&nbsp&nbsp urlQuestionnaireTypeId&nbsp&nbsp</label><span ng-bind='info.urlQuestionnaireTypeId.value'></span><br>\n\n":'' )

                    $scope.template=$scope.template+($scope.debugMode==1 ?"<input type='radio' ng-model='info.questionnaireMode.value' value='1' ng-init='info.questionnaireMode.value=1' name='questionnaireMode'><label>first time</label>&nbsp":'' )
                    $scope.template=$scope.template+($scope.debugMode==1 ?"<input type='radio' ng-model='info.questionnaireMode.value' value='2' name='questionnaireMode'>&nbsp;<label>subsequent time &nbsp&nbsp&nbsp&nbsp questionnaireMode &nbsp&nbsp</label><span ng-bind='+info.questionnaireMode.value'></span></div><br>\n\n":'' )

                    for (var i in $scope.answers){
                        $scope.id++;
                        $scope.formName=$scope.answers[i].level1[0].formName;
                        $scope.idForTitle=$scope.answers[i].level1[0].id;
                        $scope.forNgClass=$scope.answers[i].level1[0].forNgClass;
                        $scope.forNgClick=$scope.answers[i].level1[0].forNgClick;
                        $scope.formVisibility=$scope.answers[i].level1[0].visibility;
                        $scope.title=$scope.answers[i].level1[0].title;
                        $scope.template=$scope.template+'<form name='+$scope.formName+' ' +
                            (typeof $scope.formVisibility!== 'undefined' ?  ' ng-show='+$scope.formVisibility+'':'' )+' novalidate >\n';
                        $scope.template=$scope.template+'<h5'+
                            (typeof $scope.idForTitle!== 'undefined' ? ' id='+$scope.idForTitle+'':'' )+
                            (typeof $scope.forNgClass!== 'undefined' ? ' ng-class={active:'+$scope.forNgClass+'}':'' )+
                            (typeof $scope.forNgClick!== 'undefined' ?  ' ng-click='+$scope.forNgClick+'':'' )+
                            (typeof $scope.title!== 'undefined' ? ' ng-bind="'+$scope.title+'"':'' )+
                            '></h5>\n<fieldset>\n';

                        for (var ii in $scope.answers[i].level1[0].level2){
                            $scope.id++;
                            $scope.title=$scope.answers[i].level1[0].level2[ii].title;
                            $scope.visibilityLevel2=$scope.answers[i].level1[0].level2[ii].visibility;
                            $scope.isRequired=$scope.answers[i].level1[0].level2[ii].isRequired;
                            $scope.template=$scope.template+'<div class="field radio-check-field" ' +
                                (typeof $scope.visibilityLevel2!== 'undefined' ?  ' ng-show='+$scope.visibilityLevel2+'':'' )+' >\n'+
                                (typeof $scope.title!== 'undefined' ?  '<p ng-bind="'+$scope.title+'"></p>\n':'' );


                            for (var iii in $scope.answers[i].level1[0].level2[ii].level3){
                                $scope.id++;

                                $scope.type=$scope.answers[i].level1[0].level2[ii].level3[iii].type;
                                $scope.model=$scope.answers[i].level1[0].level2[ii].level3[iii].model;
                                $scope.title=$scope.answers[i].level1[0].level2[ii].level3[iii].title;
                                $scope.name=$scope.answers[i].level1[0].level2[ii].level3[iii].name;
                                $scope.fieldName=$scope.answers[i].level1[0].level2[ii].level3[iii].fieldName;
                                $scope.isRequiredLevel3=$scope.answers[i].level1[0].level2[ii].level3[iii].isRequired;
                                $scope.value=$scope.answers[i].level1[0].level2[ii].level3[iii].value;
                                $scope.checked=$scope.answers[i].level1[0].level2[ii].level3[iii].checked;
                                $scope.forNgClick=$scope.answers[i].level1[0].level2[ii].level3[iii].forNgClick;
                                $scope.forNgChange=$scope.answers[i].level1[0].level2[ii].level3[iii].forNgChange;
                                $scope.pattern=$scope.answers[i].level1[0].level2[ii].level3[iii].pattern;
                                $scope.visibility=$scope.answers[i].level1[0].level2[ii].level3[iii].visibility;

                                // $scope.errorMessage=$scope.answers[i].level1[0].level2[ii].level3[iii].errorMessage;

                                $scope.generateElement($scope.type);

                                $scope.template=$scope.template+$scope.element+
                                    (typeof $scope.model!== 'undefined'&&$scope.model.indexOf("info.")>-1 ?  "<p class='global-message msg-fail' ng-show='"+$scope.model.replace(".value",".errorMessage")+"' ng-bind='"+$scope.model.replace(".value",".errorMessage")+"'>Error message</p>\n":"" )+

                                    ($scope.debugMode==1 ? '<hr style="margin:0; border-top: 0 solid #fff;">\n<div class="debugMessage" ng-show="debugMode"><span ng-click="showDiv=!showDiv" ng-bind="showDiv?\'[ + ] \':\'[ - ] \'"></span> '+$scope.model+'- &nbsp;&nbsp;' +
                                        '<span ng-bind="'+$scope.model+'"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;isValid-\n'+
                                        '<span ng-bind="'+$scope.formName+'.'+$scope.id+'.$valid" ng-class="{ success:'+$scope.formName+'.'+$scope.id+'.$valid, error:'+$scope.formName+'.'+$scope.id+'.$invalid }"></span>\n'+
                                        '<div ng-show="showDiv">isRequiredIF- <span>'+$scope.isRequired+'</span><br>\n'+
                                        'isVisibleIF- <span>'+$scope.visibilityLevel2+'</span></div>\n' +
                                        '</div>\n':'' )

                            }
                            $scope.template=$scope.template+'</div>\n';
                        }
                        $scope.template=$scope.template+'</fieldset>\n</form>\n';

                    }

                    $scope.template=angular.element($scope.template);

                    element.append($scope.template);

                    var templateFn = $compile($scope.template);
                    templateFn($scope);

                });

                $scope.generateElement=function (type){
                    switch (type) {
                        case "alertBox":
                            $scope.element=
                                '<div class="alert alert-info">\n'+(typeof $scope.title!=='undefined' ?  $scope.title:'' )+'</span>\n</div>\n';
                            break;
                        case "radioCheckItemInline":
                            $scope.element=
                                "<div class='radio-check-item inline'" +
                                    (typeof $scope.visibility!== 'undefined' ?  ' ng-show='+$scope.visibility+'':'' )+
                                    ">\n"+
                                    "<input type='radio' " +
                                    (typeof $scope.model!== 'undefined' ?  ' ng-model='+$scope.model+'':'' )+
                                    (typeof $scope.value!== 'undefined' ?  ' value='+$scope.value+'':'' )+
                                    (typeof $scope.id!== 'undefined' ?  ' name='+$scope.id+ '':'' )+
                                    (typeof $scope.forNgClick!== 'undefined' ?  ' ng-click='+$scope.forNgClick+'':'' )+
                                    (typeof $scope.isRequired!== 'undefined' ? ' ng-required='+$scope.isRequired+ '':'' )+
                                    //for (var i in $scope.forNgClick){}
                                    //(typeof $scope.forNgClick!== 'undefined' ?  ' ng-click="turnModelsToFalse('+$scope.forNgClick+')"':'' )+
                                    //(typeof $scope.visibility!== 'undefined' ?  ' ng-show='+$scope.visibility+'':'' )+ (typeof $scope.forNgClick!== 'undefined' ?  ' ng-click="$scope.turnModelsToFalse('+$scope.forNgClick+')"':'' )+
                                    // (typeof $scope.fieldName!== 'undefined' ?  ' name='+$scope.fieldName+'':'' )+
                                    (typeof $scope.id!== 'undefined' ?  ' id='+$scope.id+'':'' )+
                                    ">\n<label"+
                                    (typeof $scope.id!== 'undefined' ?  ' for='+$scope.id+'':'' )+
                                    (typeof $scope.title!== 'undefined' ? ' ng-bind="'+$scope.title+'"':'' )+
                                    "></label>\n"+
                                    "</div>\n"
                            break;
                        case "radioCheckItem":
                            $scope.element=
                                "<div class='radio-check-item'" +
                                    (typeof $scope.visibility!== 'undefined' ?  ' ng-show='+$scope.visibility+'':'' )+
                                    ">\n"+
                                    "<input type='radio' " +
                                    (typeof $scope.model!== 'undefined' ?  ' ng-model='+$scope.model+'':'' )+
                                    (typeof $scope.value!== 'undefined' ?  ' value='+$scope.value+'':'' )+
                                    (typeof $scope.id!== 'undefined' ?  ' name='+$scope.id+ '':'' )+
                                    (typeof $scope.forNgClick!== 'undefined' ?  ' ng-click='+$scope.forNgClick+'':'' )+
                                    (typeof $scope.isRequired!== 'undefined' ? ' ng-required='+$scope.isRequired+ '':'' )+
                                    //(typeof $scope.fieldName!== 'undefined' ?  ' name='+$scope.fieldName+'':'' )+
                                    (typeof $scope.id!== 'undefined' ?  ' id='+$scope.id+'':'' )+
                                    ">\n<label"+
                                    (typeof $scope.id!== 'undefined' ?  ' for='+$scope.id+'':'' )+
                                    //(typeof $scope.title!== 'undefined' ?  $scope.title:'' )+
                                    (typeof $scope.title!== 'undefined' ?  ' ng-bind="'+$scope.title+'"':'' )+
                                    "></label>\n"+
                                    "</div>\n"
                            break;
                        case "groupedRadio":
                            $scope.element=
                                "<div class='radio-group'" +
                                    (typeof $scope.value!== 'undefined' ? 'lg-repeat=\"groups in '+$scope.value+'\"':'' )+
                                    ">\n"+
                                    "<strong><p ng-bind='groups.name'></p></strong>\n"+
                                    "<div class='radio-check-item' lg-repeat='radio in groups.data'" +
                                        (typeof $scope.visibility!== 'undefined' ? ' ng-show='+$scope.visibility+'':'' )+
                                        ">\n"+
                                        "<input type='radio' value='radio.id'" +
                                        (typeof $scope.model!== 'undefined' ?  ' ng-model='+$scope.model+'':'' )+
                                        (typeof $scope.id!== 'undefined' ?  ' name='+$scope.id+ '':'' )+
                                        (typeof $scope.forNgClick!== 'undefined' ? ' ng-click='+$scope.forNgClick+'':'' )+
                                        (typeof $scope.isRequired!== 'undefined' ? ' ng-required='+$scope.isRequired+ '':'' )+
                                        (typeof $scope.id!== 'undefined' ?  ' id='+$scope.id+'':'' )+
                                        ">\n<label ng-bind='radio.name'"+
                                        (typeof $scope.id!== 'undefined' ?  ' for='+$scope.id+'':'' )+
                                        "></label>\n"+
                                    "</div>\n"+

                                "</div>\n"
                            break;
                        case "checkBoxItem":
                            $scope.element=
                                "<div class='radio-check-item'>\n"+
                                    "<input type='checkbox' " +
                                    (typeof $scope.model!== 'undefined' ?  ' ng-model='+$scope.model+'':'' )+
                                    (typeof $scope.value!== 'undefined' ?  ' ng-true-value='+$scope.value+'':'' )+
                                    (typeof $scope.id!== 'undefined' ?  ' name='+$scope.id+ '':'' )+
                                    (typeof $scope.checked!== 'undefined' ?  ' ng-checked='+$scope.checked+'':'' )+
                                    (typeof $scope.isRequiredLevel3!== 'undefined' ? ' ng-required='+$scope.isRequiredLevel3+ '':'' )+
                                    (typeof $scope.id!== 'undefined' ?  ' id='+$scope.id+'':'' )+
                                    ">\n<label"+
                                    (typeof $scope.id!== 'undefined' ?  ' for='+$scope.id+'':'' )+
                                    (typeof $scope.title!== 'undefined' ?  ' ng-bind="'+$scope.title+'"':'' )+
                                    "></label>\n"+
                                    "</div>\n"
                            break;
                        case "selectItem":
                            $scope.element=
                                "<select"+
                                    (typeof $scope.model!== 'undefined' ?  ' ng-model='+$scope.model+'':'' )+
                                    (typeof $scope.id!== 'undefined' ?  ' id='+$scope.id+ '':'' )+
                                    (typeof $scope.value!== 'undefined' ?  ' ng-options=\"v as o for (o,v) in '+$scope.value+'\" ':'' )+
                                    (typeof $scope.id!== 'undefined' ?  ' name='+$scope.id+ '':'' )+
                                    (typeof $scope.isRequired!== 'undefined' ? ' ng-required='+$scope.isRequired+ '':'' )+
                                    ">\n<option value=''>Select</option>\n</select>\n"
                            break;
                        case "textItem":
                            $scope.element=
                                "<input type='text'"+
                                    (typeof $scope.model!== 'undefined' ?  'ng-model='+$scope.model+'':'')+
//                                  (typeof $scope.id!== 'undefined' ?  ' name='+$scope.id+ '':'' )+
                                    (typeof $scope.value!== 'undefined' ?  ' ng-model='+$scope.value+'':'')+
                                    (typeof $scope.name!== 'undefined' ?  ' name='+$scope.name+ '':' name='+$scope.id+ '' )+
                                    (typeof $scope.id!== 'undefined' ?  ' id='+$scope.id+ '':'' )+
//                                    (typeof $scope.pattern!== 'undefined' ?  ' ng-pattern='+$scope.pattern+ '':'' )+       //TODO RETURN BACK
                                    (typeof $scope.forNgChange!== 'undefined' ?  ' ng-change='+$scope.forNgChange+'':'' )+
                                    (typeof $scope.isRequired!== 'undefined' ? ' ng-required='+$scope.isRequired+ '':'')+
                                    (typeof $scope.tabindex!== 'undefined' ?  ' tabindex='+$scope.tabindex+'':'')+
                                ">\n"
                            // "<p class='global-message msg-fail' ng-show='"+$scope.formName+"."+$scope.id+".$dirty&&"+$scope.formName+"."+$scope.id+".$error.pattern' ng-bind='"+$scope.errorMessage+"'>Error message</span></div>"+
                            // "<p class='global-message msg-fail' ng-show='"+$scope.model.replace(".value",".errorMessage")+"' ng-bind='"+$scope.model.replace(".value",".errorMessage")+"'>Error message</span></div>"+
                            //($scope.debugMode==1 ? '<div class="debugMessage" ng-show="debugMode">'+$scope.model+'- <span ng-bind="'+$scope.model+'"></span></div>':'' )
                            break;
                        case "textareaItem":
                            $scope.element=
                                "<textarea rows='2' cols='20'"+
                                    (typeof $scope.model!== 'undefined' ?  'ng-model='+$scope.model+'':'' )+
                                    (typeof $scope.value!== 'undefined' ?  ' ng-model='+$scope.value+'':'' )+
                                    (typeof $scope.id!== 'undefined' ?  ' name='+$scope.id+ '':'' )+
                                    (typeof $scope.id!== 'undefined' ?  ' id='+$scope.id+ '':'' )+
                                    (typeof $scope.isRequired!== 'undefined' ? ' ng-required='+$scope.isRequired+ '':'' )+
                                    (typeof $scope.tabindex!== 'undefined' ?  ' tabindex='+$scope.tabindex+'':'' )+
                                    "></textarea>\n"
                            break;
                        case "uploadTool":
                            $scope.element=
                                "<div>\n<p>"+
                                    (typeof $scope.title!== 'undefined' ?  ' ng-model='+$scope.title+'':'' )+
                                    "</p>\n</div>\n"
                            break;
                        case "navItem":
                            $scope.element=
                                "<div class='nav'>\n" +
                                    '<a class=btn-link ' +
                                    (typeof $scope.forNgClick!== 'undefined' ?  ' ng-click='+$scope.forNgClick+'':'' )+
                                    ' ng-disabled='+$scope.formName+'.$invalid' +
                                    '>Next Step</a>\n</div>\n<hr>\n'
                            break;
                        case "submitButton":
                            $scope.element=
                                "<div class='nav'>\n" +
                                    '<a class=btn-link ' +
                                    (typeof $scope.forNgClick!== 'undefined' ?  ' ng-click='+$scope.forNgClick+'':'' )+
                                    ' ng-disabled='+$scope.formName+'.$invalid' +
                                    '>Submit</a>\n</div>\n'
                            break;
                        case "logicElement":
                            $scope.element=
                                "<textarea style='width:0;height:0' rows='2' cols='20'"+
                                    (typeof $scope.model!== 'undefined' ?  ' ng-model='+$scope.model+'':'' )+
                                    (typeof $scope.id!== 'undefined' ?  ' name='+$scope.id+ '':'' )+
                                    (typeof $scope.isRequired!== 'undefined' ? ' ng-required='+$scope.isRequired+ '':'' )+
                                    "></textarea>\n"
                    }
                }
            }
        }
    };
})

demo.controller( "DemoController", function( $rootScope, $scope, $locale ) {


    $scope.submitForValidation=function() {
        // $scope.info.url["errorMessage"]="Error "

//        $scope.info = {
//        url:{errorMessage:"Error" },
//        membersAreaDetails:{errorMessage:"Error" },
//        averagePrice:{errorMessage:"Error" },
//        productDeliveryDelayTime:{errorMessage:"Error" },
//        serviceProvisionDelayTime:{errorMessage:"Error" },
//        serviceSourceThirdPartyInfo:{errorMessage:"Error" },
//        customerSupportInfo:{errorMessage:"Error" },
//        proofOfPaymentInfo:{errorMessage:"Error" },
//        monthlySaleAmount:{errorMessage:"Error" },
//        termsOfService:{errorMessage:"Error" },
//        termsOfServiceLocation:{errorMessage:"Error" },
//        refundPolicy:{errorMessage:"Error" },
//        refundPolicyLocation:{errorMessage:"Error" },
//        fraudPrevention:{errorMessage:"Error" }
//        }
    }

//    $scope.postIntroductionSection=function() {
//        console.log("----------------------------->>>")
//        var objName;
//        for (var key in $scope.info) {
//            console.log(key, ":", $scope.info[key]  )
//            objName= "$scope.info."+ key;
//
//            for (var key2 in eval(objName)) {
////                console.log("objName>>>", objName)
////                console.log("eval(objName)>>>", eval(objName))
//                valName=objName+'["'+key2+'"]';
//                //console.log("valName>>>", valName)
//                console.log("               ",key2, ":", eval(valName)  )
//            }
//        }
//    }

    $scope.logic = {
        shippingCountryId:1,
        urlFieldServiceProvisionMethodTypeIdList:1,
        urlFieldMembersAreaTypeId:0,
        introductionButton:1
    }



//    $rootScope.answers=[
//        { level1: [
//            { title:"Introduction section", formName: "introductionSection", id: "introductionSectionTitle", forNgClass:"true", forNgClick:"openSection(introductionSection,'introductionSectionTitle')",
//                level2:[
//                    { visibility:"logic.isSite==0",
//                        level3:[
//                            { type:"alertBox", title: "You need a website to continue"}
//                        ]
//                    },
//                    { title:$scope.resource.isSite.title, isRequired:1,
//                        level3:[
//                            { type:"radioCheckItemInline", model:"logic.isSite", title: "Yes", value:1 },                // LOGIC
//                            { type:"radioCheckItemInline", model:"logic.isSite", title: "No", value:0}
//                        ]
//                    },
//                    {visibility:0,isRequired:"logic.isSite==0",
//                        level3:[
//                            { type:"logicElement", model:"logic.Helper"}
//                        ]
//                    },
//                    { title:$scope.resource.url.title, visibility:"logic.isSite", isRequired:1,
//                        level3:[
//                            { type:"textItem", model:"info.url.value", pattern:"/(?:(?:ht|f)tps?://)?(?:[\\-\\w]+:[\\-\\w]+@)?(?:[0-9a-z][\\-0-9a-z]*[0-9a-z]\\.)+[a-z]{2,6}(?::\\d{1,5})?(?:[?/\\\\#][?!^$.(){}:|=[\\]+\\-/\\\\*;&~#@,%\\w?-??-?]*)?/" }
//                        ]
//                    },
//                    { title:$scope.resource.businessModel.title, visibility:"logic.isSite", isRequired:1,
//                        level3:[
//                            { type:"selectItem", model:"info.businessModel.value", value: "{ site1.com:1, site2.com:2, site3.com:3}"}
//                        ]
//                    },
//                    { visibility:"logic.isSite==1", isRequired: 1,
//                        level3:[
//                            { type:"radioCheckItemInline", model:"logic.noBusinessModel", title: "Yes", value:0},        // LOGIC
//                            { type:"radioCheckItemInline", model:"logic.noBusinessModel", title: "No", value:1}
//                        ]
//                    },
//                    {title:$scope.resource.revenueGenerationMethod.title, visibility:"logic.isSite==1&&logic.noBusinessModel==1", isRequired: "logic.noBusinessModel==1",
//                        level3:[
//                            { type:"radioCheckItem", model:"info.revenueGenerationMethod.value", title: "I sell products", value:2},
//                            { type:"radioCheckItem", model:"info.revenueGenerationMethod.value", title: "I offer services", value:1},
//                            { type:"radioCheckItem", model:"info.revenueGenerationMethod.value", title: "I sell products and offer services", value:4}
//                        ]
//                    },
//                    {title:$scope.resource.urlType.title, visibility:"logic.isSite==1&&logic.noBusinessModel==1", isRequired: "logic.noBusinessModel==1",
//                        level3:[
//                            { type:"radioCheckItemInline", model:"info.urlType.value", fieldName:"urlType", title: "Yes", value:1},
//                            { type:"radioCheckItemInline", model:"info.urlType.value", fieldName:"urlType", title: "No", value:2}
//                        ]
//                    },
//                    {title:$scope.resource.urlFieldMembersAreaTypeId.title, visibility:"logic.isSite==1&&logic.noBusinessModel==1", isRequired: "logic.noBusinessModel==1",
//                        level3:[
//                            { type:"radioCheckItemInline", model:"info.urlFieldMembersAreaTypeId.value", title: "Yes", value:1},            // LOGIC
//                            { type:"radioCheckItemInline", model:"info.urlFieldMembersAreaTypeId.value", title: "No", value:2}              // 2
//                        ]
//                    },
//                    {title:$scope.resource.membersAreaDetails.title, visibility:"logic.isSite==1&&info.urlFieldMembersAreaTypeId.value==1&&logic.noBusinessModel==1", isRequired: "logic.isSite==1&&info.urlFieldMembersAreaTypeId.value==1&&logic.noBusinessModel==1",
//                        level3:[
//                            { type:"textareaItem", model:"info.membersAreaDetails.value" }
//                        ]
//                    },
//                    {
//                        level3:[
//                            { type:"navItem", forNgClick:"introductionSection.$invalid||submitForValidation(introductionSection,'productInformationTitle')"}
//                        ]
//                    }
//                ]
//            }
//        ]},
//        { level1: [
//            { title:"Product Information", formName: "productInformation", id: "productInformationTitle", forNgClass:"introductionSection.$serverValid", forNgClick:"introductionSection.$serverValid&&openSection(introductionSection,'productInformationTitle')",
//                level2:[
//                    {title:$scope.resource.averagePrice.title, isRequired:1,
//                        level3:[
//                            { type:"textItem", model:"info.averagePrice.value", pattern:"/^[0-9]*[.]?[0-9]+$/" }
//                        ]
//                    },
//                    {title:$scope.resource.shippingCountryId.title, visibility: "info.revenueGenerationMethod.value==2||info.revenueGenerationMethod.value==4", isRequired:"info.revenueGenerationMethod.value==2||info.revenueGenerationMethod.value==4",
//
//                        level3:[
//                            { type:"selectItem", model:"info.shippingCountryId.value", value: "{ USA:1, CANADA:2, Brazil:3}"}
//                        ]
//                    },
//                    {title:$scope.resource.urlFieldProductDeliveryMethodTypeIdList.title, visibility: "info.revenueGenerationMethod.value==2||info.revenueGenerationMethod.value==4",
//                        level3:[
//                            { type:"checkBoxItem", model:"info.urlFieldProductDeliveryMethodTypeIdList.online.value", title: "Online", value:3} ,
//                            { type:"checkBoxItem", model:"info.urlFieldProductDeliveryMethodTypeIdList.regularPost.value", title: "Regular Post", value:2},
//                            { type:"checkBoxItem", model:"info.urlFieldProductDeliveryMethodTypeIdList.registeredMail.value", title: "Registered Mail", value:1},
//                            { type:"checkBoxItem", model:"info.urlFieldProductDeliveryMethodTypeIdList.inPerson.value", title: "In person", value:4}
//                        ]
//                    },
//                    {visibility:0,isRequired:"(info.revenueGenerationMethod.value==2||info.revenueGenerationMethod.value==4)&&!info.urlFieldProductDeliveryMethodTypeIdList.online.value&&!info.urlFieldProductDeliveryMethodTypeIdList.regularPost.value&&!info.urlFieldProductDeliveryMethodTypeIdList.registeredMail.value&&!info.urlFieldProductDeliveryMethodTypeIdList.inPerson.value",
//                        level3:[
//                            { type:"logicElement", model:"logic.Helper"}
//                        ]
//                    },
//                    {title:$scope.resource.urlFieldServiceProvisionMethodTypeIdList.title, visibility: "info.revenueGenerationMethod.value==1||info.revenueGenerationMethod.value==4",
//                        level3:[
//                            { type:"checkBoxItem", model:"info.urlFieldServiceProvisionMethodTypeIdList.inPerson.value", title: "In person", value:1} ,
//                            { type:"checkBoxItem", model:"info.urlFieldServiceProvisionMethodTypeIdList.remotely.value", title: "Remotely", value:0}
//                        ]
//                    },
//                    {visibility:0,isRequired:"(info.revenueGenerationMethod.value==1||info.revenueGenerationMethod.value==4)&&!info.urlFieldServiceProvisionMethodTypeIdList.inPerson.value&&!info.urlFieldServiceProvisionMethodTypeIdList.remotely.value",
//                        level3:[
//                            { type:"logicElement", model:"logic.Helper"}
//                        ]
//                    },
//                    {title:$scope.resource.urlFieldProductDeliveryMethodTypeIdList.title, visibility: "info.revenueGenerationMethod.value==2||info.revenueGenerationMethod.value==4", isRequired:"info.revenueGenerationMethod.value==2||info.revenueGenerationMethod.value==4",
//                        level3:[
//                            { type:"textItem", model:"info.productDeliveryDelayTime.value", pattern:"/^[0-9]*$/" }
//                        ]
//                    },
//                    {title:$scope.resource.serviceProvisionDelayTime.title, visibility: "info.revenueGenerationMethod.value==1||info.revenueGenerationMethod.value==4",isRequired: "info.revenueGenerationMethod.value==1||info.revenueGenerationMethod.value==4",
//                        level3:[
//                            { type:"textItem", model:"info.serviceProvisionDelayTime.value", pattern:"/^[0-9]*$/"}
//                        ]
//                    },
//                    {title:$scope.resource.urlFieldProductSourceTypeId.title, visibility: "info.revenueGenerationMethod.value==2||info.revenueGenerationMethod.value==4",isRequired:"info.revenueGenerationMethod.value==2||info.revenueGenerationMethod.value==4",
//                        level3:[
//                            { type:"radioCheckItem", model:"info.urlFieldProductSourceTypeId.value", title: "Manufactured by you", value:1} ,
//                            { type:"radioCheckItem", model:"info.urlFieldProductSourceTypeId.value", title: "Personal property", value:2}
//                        ]
//                    },
//                    {title:$scope.resource.urlFieldServiceSourceTypeId.title, visibility: "info.revenueGenerationMethod.value==1||info.revenueGenerationMethod.value==4",isRequired:"info.revenueGenerationMethod.value==1||info.revenueGenerationMethod.value==4",
//                        level3:[
//                            { type:"radioCheckItem", model:"info.urlFieldServiceSourceTypeId.value", title: "You", value:1} ,
//                            { type:"radioCheckItem", model:"info.urlFieldServiceSourceTypeId.value", title: "Third Party", value:2}
//                        ]
//                    },
//                    {title:$scope.resource.serviceSourceThirdPartyInfo.title, visibility: "(info.revenueGenerationMethod.value==1||info.revenueGenerationMethod.value==4)&&info.urlFieldServiceSourceTypeId.value==2", isRequired: "(info.revenueGenerationMethod.value==1||info.revenueGenerationMethod.value==4)&&info.urlFieldServiceSourceTypeId.value==2",
//                        level3:[
//                            { type:"textareaItem", model:"info.serviceSourceThirdPartyInfo.value" }
//                        ]
//                    },
//                    {title:$scope.resource.urlFieldSupplierTypeId.title,isRequired:1,
//                        level3:[
//                            { type:"radioCheckItemInline", model:"info.urlFieldSupplierTypeId.value", title: "Yes", value:1} ,      //TODO  [if selected, display "Please Provide supporting documents at the end of the questionnaire"]
//                            { type:"radioCheckItemInline", model:"info.urlFieldSupplierTypeId.value", title: "No", value:2}
//                        ]
//                    },
////                    {visibility:0,isRequired:"introductionSection.$invalid",                                            //deactivate Next section until all conditions above trigger to ON
////                        level3:[
////                            { type:"logicElement", model:"logic.Helper"}
////                        ]
////                    },
//                    {
//                        level3:[
//                            { type:"navItem", forNgClick:"productInformation.$invalid||submitForValidation(productInformation,'salesInformationTitle')"}
//                        ]
//                    }
//                ]
//            }
//        ]},
//        { level1: [
//            { title:"Sales Information", formName: "salesInformation", id: "salesInformationTitle",forNgClass:"introductionSection.$serverValid&&productInformation.$serverValid",  forNgClick:"productInformation.$serverValid&&openSection(productInformation,'salesInformationTitle')",
//                level2:[
//                    {title:$scope.resource.customerSupportInfo.title, isRequired:1,
//                        level3:[
//                            { type:"textareaItem", model:"info.customerSupportInfo.value"}
//                        ]
//                    },
//                    {title:$scope.resource.urlFieldSaleOriginTypeIdList.title,
//                        level3:[
//                            { type:"checkBoxItem", model:"info.urlFieldSaleOriginTypeIdList.northAmerica.value", title: "North America", value:1} ,
//                            { type:"checkBoxItem", model:"info.urlFieldSaleOriginTypeIdList.europe.value", title: "Europe", value:2},
//                            { type:"checkBoxItem", model:"info.urlFieldSaleOriginTypeIdList.africa.value", title: "Africa", value:3},
//                            { type:"checkBoxItem", model:"info.urlFieldSaleOriginTypeIdList.asia.value", title: "Asia", value:4}
//                        ]
//                    },
//                    {visibility:0,isRequired:"!info.urlFieldSaleOriginTypeIdList.northAmerica.value&&!info.urlFieldSaleOriginTypeIdList.europe.value&&!info.urlFieldSaleOriginTypeIdList.africa.value&&!info.urlFieldSaleOriginTypeIdList.asia.value",
//                        level3:[
//                            { type:"textareaItem", model:"logic.Helper"}
//                        ]
//                    },
//                    {title:$scope.resource.urlFieldInvoiceTypeId.title,isRequired:1,
//                        level3:[
//                            { type:"radioCheckItemInline", model:"info.urlFieldInvoiceTypeId.value", title: "Yes", value:1} ,
//                            { type:"radioCheckItemInline", model:"info.urlFieldInvoiceTypeId.value", title: "No", value:2}
//                        ]
//                    },
//                    {title:$scope.resource.urlFieldInvoiceSendingTypeIdList.title, visibility: "info.urlFieldInvoiceTypeId.value==1",
//                        level3:[
//                            { type:"checkBoxItem", model:"info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice.value", title: "Payza email invoice", value:1},
//                            { type:"checkBoxItem", model:"info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice.value", title: "Mail personalized invoice", value:2}
//                        ]
//                    },
//                    {visibility:0,isRequired: "info.urlFieldInvoiceTypeId.value==1&&!info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice.value&&!info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice.value",
//                        level3:[
//                            { type:"logicElement", model:"logic.Helper"}
//                        ]
//                    },
//                    {title:$scope.resource.proofOfPaymentInfo.title, isRequired:1,
//                        level3:[
//                            { type:"textareaItem", model:"info.proofOfPaymentInfo.value" }
//                        ]
//                    },
//                    {title:$scope.resource.monthlySaleAmount.title, isRequired:1,
//                        level3:[
//                            { type:"textItem", model:"info.monthlySaleAmount.value" }
//                        ]
//                    },
//                    {title:$scope.resource.urlFieldRecurringBillingTypeId.title, isRequired:1,
//                        level3:[
//                            { type:"radioCheckItemInline", model:"info.urlFieldRecurringBillingTypeId.value", title: "Yes", value:1 } ,
//                            { type:"radioCheckItemInline", model:"info.urlFieldRecurringBillingTypeId.value", title: "No", value:2}
//                        ]
//                    },
////                    {visibility:0,isRequired:"productInformation.$invalid",
////                        level3:[
////                            { type:"textareaItem", model:"logic.Helper"}
////                        ]
////                    },
//                    {
//                        level3:[
//                            { type:"navItem", forNgClick:"salesInformation.$invalid||submitForValidation(salesInformation,'customerRelationsTitle')"}
//                        ]
//                    }
//                ]
//            }
//
//        ]},
//        { level1: [
//            { title:"Customer Relations", formName: "customerRelations",  id: "customerRelationsTitle",forNgClass:"introductionSection.$serverValid&&productInformation.$serverValid&&salesInformation.$serverValid", forNgClick:"salesInformation.$serverValid&&openSection(salesInformation,'customerRelationsTitle')",
//                level2:[
//                    {title:$scope.resource.termsOfService.title, isRequired:1,
//                        level3:[
//                            { type:"textareaItem", model:"info.termsOfService.value"}
//                        ]
//                    },
//                    {title:$scope.resource.termsOfServiceLocation.title,isRequired:1,
//                        level3:[
//                            { type:"textItem", model:"info.termsOfServiceLocation.value" }
//                        ]
//                    },
//                    {title:$scope.resource.refundPolicy.title,isRequired:1,
//                        level3:[
//                            { type:"textareaItem", model:"info.refundPolicy.value" }
//                        ]
//                    },
//                    {title:$scope.resource.refundPolicyLocation.title,isRequired:1,
//                        level3:[
//                            { type:"textItem", model:"info.refundPolicyLocation.value" }
//                        ]
//                    },
//                    {title:$scope.resource.fraudPrevention.title,isRequired:1,
//                        level3:[
//                            { type:"textareaItem", model:"info.fraudPrevention.value" }
//                        ]
//                    },
//                    {visibility:0,isRequired:"salesInformation.$invalid",
//                        level3:[
//                            { type:"textareaItem", model:"logic.Helper"}
//                        ]
//                    }
//                    ,
//                    {
//                        level3:[
//                            { type:"navItem", forNgClick:"customerRelations.$invalid||submitForValidation(customerRelations,'customerRelationsTitle')" }
//                        ]
//                    }
//                ]
//            }
//        ]},
//        { level1: [
//            { title:"Submit Documents", formName: "submitDoc", id: "submitDocTitle", forNgClass:"info.urlFieldSupplierTypeId.value==1", forNgClick:"info.urlFieldSupplierTypeId.value==1&&openSection(submitDoc,'submitDocTitle')",
//                level2:[
//                    {visibility:0,
//                        level3:[
//                            { type:"textareaItem", model:"logic.Helper"}
//                        ]
//                    },
//                    {title:"Upload Tool",
//                        level3:[
//                            { type:"uploadTool" }
//                        ]
//                    }
//                ]
//            },
//            {
//                level3:[
//                    { type:"navItem"}
//                ]
//            }
//        ]},
//        { level1: [
//            { title:"",id: "submitButton", formName: "submitButton", forNgClass:"true",
//                level2:[
//                    {visibility:0,isRequired:"!introductionSection.$serverValid||!salesInformation.$serverValid||!productInformation.$serverValid||!customerRelations.$serverValid",
//                        level3:[
//                            { type:"logicElement", model:"logic.Helper"}
//                        ]
//                    },
//                    {title:"",
//                        level3:[
//                            { type:"submitButton", forNgClick:"submitForm()"}
//                        ]
//                    }
//                ]
//            }
//        ]}
//    ]

//    var json_text = JSON.stringify($rootScope.answers, null, 2);
//    console.log("$scope.json_text>>>", json_text);

});

