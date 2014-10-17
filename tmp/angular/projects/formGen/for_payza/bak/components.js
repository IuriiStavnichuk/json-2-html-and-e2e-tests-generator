var demo = angular.module( "Demo", [] );

demo.directive("payzaForm", function ($compile) {
    return {
        restrict: "E",
        replace:true,
        // transclude: true,
        compile: function($scope, element, attrs) {

            return function($scope, element, attrs) {
                $scope.template="";$scope.id=0;

                for (var i in $scope.answers){
                    $scope.id++;
                    $scope.formName=$scope.answers[i].level1[0].formName;
                    $scope.template=$scope.template+'<form name='+$scope.formName+' novalidate >';
                    $scope.template=$scope.template+'<h5>'+$scope.answers[i].level1[0].title+'</h5>\n<fieldset>\n';

                    for (var ii in $scope.answers[i].level1[0].level2){
                        $scope.id++;
                        $scope.title=$scope.answers[i].level1[0].level2[ii].title;
                        $scope.visibility=$scope.answers[i].level1[0].level2[ii].visibility;
                        $scope.isRequired=$scope.answers[i].level1[0].level2[ii].isRequired;
                        $scope.template=$scope.template+'<div class="field radio-check-field" ' +
                            (typeof $scope.visibility!== 'undefined' ?  ' ng-show='+$scope.visibility+'':'' )+' >\n'+
                            (typeof $scope.title!== 'undefined' ?  '<p>'+$scope.title+'</p>\n':'' );

                        for (var iii in $scope.answers[i].level1[0].level2[ii].level3){
                            $scope.id++;

                            $scope.type=$scope.answers[i].level1[0].level2[ii].level3[iii].type;
                            $scope.model=$scope.answers[i].level1[0].level2[ii].level3[iii].model;
                            $scope.title=$scope.answers[i].level1[0].level2[ii].level3[iii].title;
                            $scope.fieldName=$scope.answers[i].level1[0].level2[ii].level3[iii].fieldName;
                            $scope.value=$scope.answers[i].level1[0].level2[ii].level3[iii].value;
                            $scope.modelsToChange=$scope.answers[i].level1[0].level2[ii].level3[iii].modelsToChange;
                            $scope.visibility=$scope.answers[i].level1[0].level2[ii].level3[iii].visibility;

                            $scope.generateElement($scope.type);

                            $scope.template=$scope.template+$scope.element;
                        }
                        $scope.template=$scope.template+'</div>\n';

                    }
                    $scope.template=$scope.template+'<hr>\n</form>\n</fieldset>\n';
                }
                $scope.template=angular.element($scope.template);

                element.append($scope.template);
                var templateFn = $compile($scope.template);
                templateFn($scope);
            }
        }
    };
})

demo.controller( "DemoController", function( $rootScope, $scope ) {

    $scope.generateElement=function (type){
        switch (type) {
            case "alertBox":
                $scope.element=
                    '<div class="alert alert-info">\n'+
                        '<span class="field-label">'+(typeof $scope.title!== 'undefined' ?  $scope.title:'' )+'</span>\n'+
                        '</div>\n';
                break;
            case "radioCheckItemInline":
                $scope.element=
                    ">>>{{introductionSection.urlType.$error.required}}" +
                        "<div class='radio-check-item inline'>\n"+
                        "<input type='radio' " +
                        (typeof $scope.model!== 'undefined' ?  ' ng-model='+$scope.model+'':'' )+
                        (typeof $scope.value!== 'undefined' ?  ' value='+$scope.value+'':'' )+
                        (typeof $scope.modelsToChange!== 'undefined' ?  ' ng-click='+$scope.modelsToChange+'':'' )+
                        (typeof $scope.isRequired!== 'undefined' ? ' required' :'' )+
                        // for (var i in $scope.modelsToChange){}
                        //(typeof $scope.modelsToChange!== 'undefined' ?  ' ng-click="turnModelsToFalse('+$scope.modelsToChange+')"':'' )+
                        //(typeof $scope.visibility!== 'undefined' ?  ' ng-show='+$scope.visibility+'':'' )+        (typeof $scope.modelsToChange!== 'undefined' ?  ' ng-click="$scope.turnModelsToFalse('+$scope.modelsToChange+')"':'' )+
                        (typeof $scope.fieldName!== 'undefined' ?  ' name='+$scope.fieldName+'':'' )+
                        (typeof $scope.id!== 'undefined' ?  ' id='+$scope.id+'':'' )+
                        ">\n<label"+
                        (typeof $scope.id!== 'undefined' ?  ' for='+$scope.id+'>':'' )+
                        (typeof $scope.title!== 'undefined' ?  $scope.title:'' )+
                        "</label>\n"+
                        "</div>\n"
                break;
            case "radioCheckItem":
                $scope.element=
                    "<div class='radio-check-item'>\n"+
                        "<input type='radio' " +
                        (typeof $scope.model!== 'undefined' ?  ' ng-model='+$scope.model+'':'' )+
                        (typeof $scope.value!== 'undefined' ?  ' value='+$scope.value+'':'' )+
                        (typeof $scope.modelsToChange!== 'undefined' ?  ' ng-click='+$scope.modelsToChange+'':'' )+
                        (typeof $scope.isRequired!== 'undefined' ? ' required' :'' )+
                        (typeof $scope.fieldName!== 'undefined' ?  ' name='+$scope.fieldName+'':'' )+
                        (typeof $scope.id!== 'undefined' ?  ' id='+$scope.id+'':'' )+
                        ">\n<label"+
                        (typeof $scope.id!== 'undefined' ?  ' for='+$scope.id+'>':'' )+
                        (typeof $scope.title!== 'undefined' ?  $scope.title:'' )+
                        "</label>\n"+
                        "</div>\n"
                break;
            case "checkBoxItem":
                $scope.element=
                    "<div class='radio-check-item'>\n"+
                        "<input type='checkbox' " +
                        (typeof $scope.model!== 'undefined' ?  ' ng-model='+$scope.model+'':'' )+
                        (typeof $scope.value!== 'undefined' ?  ' value='+$scope.value+'':'' )+
                        (typeof $scope.isRequired!== 'undefined' ? ' required' :'' )+
                        //(typeof $scope.visibility!== 'undefined' ?  ' ng-show='+$scope.visibility+'':'' )+
                        (typeof $scope.id!== 'undefined' ?  ' id='+$scope.id+'':'' )+
                        ">\n<label"+
                        (typeof $scope.id!== 'undefined' ?  ' for='+$scope.id+'>':'' )+
                        (typeof $scope.title!== 'undefined' ?  $scope.title:'' )+
                        "</label>\n"+
                        "</div>\n"
                break;
            case "selectItem":
                $scope.element=
//                    "<div class='field'>\n"+
                    "<select"+
                        (typeof $scope.model!== 'undefined' ?  ' ng-model='+$scope.model+'':'' )+
                        (typeof $scope.value!== 'undefined' ?  ' ng-options=\"v as o for (o,v) in '+$scope.value+'\" ':'' )+
                        (typeof $scope.isRequired!== 'undefined' ? ' required' :'' )+
                        "><option value=''>Select</option></select>\n"
//                        "</div>\n"
                break;
            case "textItem":
                $scope.element=
                    "<input type='text'"+
                        (typeof $scope.model!== 'undefined' ?  'ng-model='+$scope.model+'':'' )+
                        (typeof $scope.value!== 'undefined' ?  ' ng-model='+$scope.value+'':'' )+
                        (typeof $scope.id!== 'undefined' ?  ' id='+$scope.id+ '':'' )+
                        (typeof $scope.isRequired!== 'undefined' ? ' required' :'' )+
                        (typeof $scope.tabindex!== 'undefined' ?  ' tabindex='+$scope.tabindex+'':'' )+
                        ">\n"
                break;
            case "textareaItem":
                $scope.element=
                    "<textarea rows='2' cols='20'"+
                        (typeof $scope.model!== 'undefined' ?  'ng-model='+$scope.model+'':'' )+
                        (typeof $scope.value!== 'undefined' ?  ' ng-model='+$scope.value+'':'' )+
                        (typeof $scope.id!== 'undefined' ?  ' id='+$scope.id+ '':'' )+
                        (typeof $scope.isRequired!== 'undefined' ? ' required' :'' )+
                        (typeof $scope.tabindex!== 'undefined' ?  ' tabindex='+$scope.tabindex+'':'' )+
                        "></textarea>\n"
                break;
            case "navItem":
                $scope.element=
                    "<div class='nav'>" +
                        '<a class=btn-link ng-click=postIntroductionSection() ng-disabled='+$scope.formName+'.$invalid' +
                        ">Next Step</a>"
//                        "<a class='btn-link' ng-click='postIntroductionSection()'>Save</a>"+
//                        "<span>or</span>"+
//                        "<a>Cancel</a>"+
                        "</div>"
                break;
            case "uploadTool":
                $scope.element=
                    "<div><p>"+
                        (typeof $scope.title!== 'undefined' ?  'ng-model='+$scope.title+'':'' )
                "</p></div>\n"
        }
    }

    $scope.logic = {
        shippingCountryId:1,
        urlFieldServiceProvisionMethodTypeIdList:1,
        urlFieldMembersAreaTypeId:0
    }
    $scope.info = {
        isSite: {title:"Do you have a website for this business?"},

        url:{ title:"Please provide your website address:" },
        businessModel:{ title:"Does this website fall under the same business model and product/service as?" },
        revenueGenerationMethod:{ title:"What sort of business do you conduct?" },
        urlType:{ title:"Do you own and control the website?" },
        urlFieldMembersAreaTypeId:{ title:"Does your website have a members' area?" },
        membersAreaDetails:{ title:"Please provide the necessary information to access the members' area:" },
        averagePrice:{ title:"What is the average product price (USD)?" },
        shippingCountryId:{ title:"Which country is your product shipped from?" },
        urlFieldProductDeliveryMethodTypeIdList:{ title:"How do you deliver the product?" },
        urlFieldServiceProvisionMethodTypeIdList:{ title:"How do you provide the service?:" },
        productDeliveryDelayTime:{ title:"On average, how many days after the transaction is the product received by your customer?" },
        serviceProvisionDelayTime:{ title:"On average, how many days after the transaction is the product received by your customer?" },
        urlFieldProductSourceTypeId:{ title:"The product you are selling is:" },
        urlFieldServiceSourceTypeId:{ title:"The service is provided by:" },
        serviceSourceThirdPartyInfo:{ title:"Please provide third party description and role in providing service:" },
        urlFieldSupplierTypeId:{ title:"Are you an authorized distributor/supplier?" },
        customerSupportInfo:{ title:"How do customers contact you? Please list all methods:" },
        urlFieldSaleOriginTypeIdList:{ title:"Where do most of your sales originate from:" },
        urlFieldInvoiceTypeId:{ title:"Do you provide an invoice for the sale?" },
        urlFieldInvoiceSendingTypeIdList:{ title:"How will you send an invoice?" },
        proofOfPaymentInfo:{ title:"What proof of payment is provided to the customer?" },
        monthlySaleAmount:{ title:"What is the estimated monthly sales amount you want to process through Payza?" },
        urlFieldRecurringBillingTypeId:{ title:"Do you offer recurring billing?" },
        termsOfService:{ title:"What are your terms of service?" },
        termsOfServiceLocation:{ title:"Where are your terms of service located?" },
        refundPolicy:{ title:"What is your refund policy?" },
        refundPolicyLocation:{ title:"Where is your refund policy located?" },
        fraudPrevention:{ title:"What are your fraud prevention policies?" }
    }
    $rootScope.answers=[
        { level1: [
            { title:"Introduction section", formName: "introductionSection",
                level2:[
                    { visibility:"logic.alertYouNeedSite",
                        level3:[
                            { type:"alertBox", title: "You need a website to continue"}
                        ]
                    },
                    { title:$scope.info.isSite.title, isRequired:1,
                        level3:[
                            { type:"radioCheckItemInline", model:"logic.isSite", title: "Yes", value:1, modelsToChange:"logic.alertYouNeedSite=false"},                  // LOGIC
                            { type:"radioCheckItemInline", model:"logic.isSite", title: "No", value:0, modelsToChange:"logic.noBusinessModel=false;logic.urlFieldMembersAreaTypeId=false;logic.alertYouNeedSite=true"}
                        ]
                    },
                    { title:$scope.info.url.title, visibility:"logic.isSite", isRequired:1,
                        level3:[
                            { type:"textItem", model:"info.url.value"}
                        ]
                    },
                    { title:$scope.info.businessModel.title, visibility:"logic.isSite", isRequired:1,
                        level3:[
                            { type:"selectItem", model:"info.businessModel.value", value: "{ site1.com:1, site2.com:2, site3.com:3}", visibility:1}
                        ]
                    },
                    { visibility:"logic.isSite", isRequired:1,
                        level3:[
                            { type:"radioCheckItemInline", model:"logic.noBusinessModel", title: "Yes", value:0, modelsToChange:"logic.urlFieldMembersAreaTypeId=false;introductionSection.urlType.$error={'required':false}"},        // LOGIC
                            { type:"radioCheckItemInline", model:"logic.noBusinessModel", title: "No", value:1, modelsToChange:"introductionSection.urlType.$error=true"}
                        ]
                    },
                    {title:$scope.info.revenueGenerationMethod.title, visibility:"logic.noBusinessModel",
                        level3:[
                            { type:"radioCheckItem", model:"info.revenueGenerationMethod.value", title: "I sell products", value:2, modelsToChange:"logic.shippingCountryId=1;logic.urlFieldServiceProvisionMethodTypeIdList=0"},
                            { type:"radioCheckItem", model:"info.revenueGenerationMethod.value", title: "I offer services", value:1, modelsToChange:"logic.shippingCountryId=0;logic.urlFieldServiceProvisionMethodTypeIdList=1"},
                            { type:"radioCheckItem", model:"info.revenueGenerationMethod.value", title: "I sell products and offer services", value:4, modelsToChange:"logic.shippingCountryId=1;logic.urlFieldServiceProvisionMethodTypeIdList=1"}
                        ]
                    },
                    {title:$scope.info.urlType.title, visibility:"logic.noBusinessModel", isRequired:1,
                        level3:[
                            { type:"radioCheckItemInline", model:"info.urlType.value", fieldName:"urlType", title: "Yes", value:1} ,
                            { type:"radioCheckItemInline", model:"info.urlType.value", fieldName:"urlType", title: "No", value:2}
                        ]
                    },
                    {title:$scope.info.urlFieldMembersAreaTypeId.title, visibility:"logic.noBusinessModel",
                        level3:[
                            { type:"radioCheckItemInline", model:"logic.urlFieldMembersAreaTypeId", title: "Yes", value:1},            // LOGIC
                            { type:"radioCheckItemInline", model:"logic.urlFieldMembersAreaTypeId", title: "No", value:0}        // 2
                        ]
                    },
                    {title:$scope.info.membersAreaDetails.title, visibility:"logic.urlFieldMembersAreaTypeId",
                        level3:[
                            { type:"textareaItem", model:"info.membersAreaDetails.value"}
                        ]
                    },
                    {
                        level3:[
                            { type:"navItem", model:"info.introductionSection.value"}
                        ]
                    }
                ]
            }
        ]},
        { level1: [
            { title:"Product Information", formName: "productInformation",
                level2:[
                    {title:$scope.info.averagePrice.title, isRequired:1,
                        level3:[
                            { type:"textItem", model:"info.averagePrice.value" }
                        ]
                    },
                    {title:$scope.info.shippingCountryId.title, visibility: "logic.shippingCountryId", isRequired:1,
                        level3:[
                            { type:"selectItem", model:"info.shippingCountryId.value", value: "{ USA:1, CANADA:2, Brazil:3}"}
                        ]
                    },
                    {title:$scope.info.urlFieldProductDeliveryMethodTypeIdList.title, visibility: "logic.shippingCountryId", isRequired:1,
                        level3:[
                            { type:"checkBoxItem", model:"info.urlFieldProductDeliveryMethodTypeIdList.online.value", title: "Online", value:3} ,
                            { type:"checkBoxItem", model:"info.urlFieldProductDeliveryMethodTypeIdList.regularPost.value", title: "Regular Post", value:2},
                            { type:"checkBoxItem", model:"info.urlFieldProductDeliveryMethodTypeIdList.registeredMail.value", title: "Registered Mail", value:1},
                            { type:"checkBoxItem", model:"info.urlFieldProductDeliveryMethodTypeIdList.inPerson.value", title: "In person", value:4}
                        ]
                    },
                    {title:$scope.info.urlFieldServiceProvisionMethodTypeIdList.title, visibility: "logic.urlFieldServiceProvisionMethodTypeIdList", isRequired:1,
                        level3:[
                            { type:"radioCheckItemInline", model:"info.urlFieldServiceProvisionMethodTypeIdList.value", title: "In person", value:1} ,
                            { type:"radioCheckItemInline", model:"info.urlFieldServiceProvisionMethodTypeIdList.value", title: "Remotely", value:0}
                        ]
                    },
                    {title:$scope.info.productDeliveryDelayTime.title, visibility: "logic.shippingCountryId", isRequired:1,
                        level3:[
                            { type:"textItem", model:"info.productDeliveryDelayTime.value" }
                        ]
                    },
                    {title:$scope.info.serviceProvisionDelayTime.title, visibility: "logic.urlFieldServiceProvisionMethodTypeIdList", isRequired:1,
                        level3:[
                            { type:"textItem", model:"info.serviceProvisionDelayTime.value" }
                        ]
                    },
                    {title:$scope.info.urlFieldProductSourceTypeId.title, visibility: "logic.shippingCountryId", isRequired:1,
                        level3:[
                            { type:"radioCheckItem", model:"info.urlFieldProductSourceTypeId.value", title: "Manufactured by you", value:1} ,
                            { type:"radioCheckItem", model:"info.urlFieldProductSourceTypeId.value", title: "Personal property", value:2}
                        ]
                    },
                    {title:$scope.info.urlFieldServiceSourceTypeId.title, visibility: "logic.urlFieldServiceProvisionMethodTypeIdList", isRequired:1,
                        level3:[
                            { type:"radioCheckItemInline", model:"info.urlFieldServiceSourceTypeId.value", title: "You", value:1, modelsToChange:"logic.serviceSourceThirdPartyInfo=0"} ,
                            { type:"radioCheckItemInline", model:"info.urlFieldServiceSourceTypeId.value", title: "Third Party", value:2, modelsToChange:"logic.serviceSourceThirdPartyInfo=1"}
                        ]
                    },
                    {title:$scope.info.serviceSourceThirdPartyInfo.title, visibility: "logic.serviceSourceThirdPartyInfo", isRequired:1,
                        level3:[
                            { type:"textItem", model:"info.serviceSourceThirdPartyInfo.value" }
                        ]
                    },
                    {title:$scope.info.urlFieldSupplierTypeId.title, isRequired:1,
                        level3:[
                            { type:"radioCheckItemInline", model:"info.urlFieldSupplierTypeId.value", title: "Yes", value:1} ,      //TODO  [if selected, display "Please Provide supporting documents at the end of the questionnaire"]
                            { type:"radioCheckItemInline", model:"info.urlFieldSupplierTypeId.value", title: "No", value:2}
                        ]
                    },
                    {
                        level3:[
                            { type:"navItem", model:"info.productInformation.value"}
                        ]
                    }
                ]
            }
        ]},
        { level1: [
            { title:"Sales Information", formName: "salesInformation",
                level2:[
                    {title:$scope.info.customerSupportInfo.title, isRequired:1,
                        level3:[
                            { type:"textareaItem", model:"info.customerSupportInfo.value", isRequired:1 }
                        ]
                    },
                    {title:$scope.info.urlFieldSaleOriginTypeIdList.title,isRequired:1,
                        level3:[
                            { type:"checkBoxItem", model:"info.urlFieldSaleOriginTypeIdList.northAmerica.value", title: "North America", value:1} ,
                            { type:"checkBoxItem", model:"info.urlFieldSaleOriginTypeIdList.europe.value", title: "Europe", value:2},
                            { type:"checkBoxItem", model:"info.urlFieldSaleOriginTypeIdList.africa.value", title: "Africa", value:3},
                            { type:"checkBoxItem", model:"info.urlFieldSaleOriginTypeIdList.asia.value", title: "Asia", value:4}
                        ]
                    },
                    {title:$scope.info.urlFieldInvoiceTypeId.title,isRequired:1,
                        level3:[
                            { type:"radioCheckItemInline", model:"info.urlFieldInvoiceTypeId.value", title: "Yes", value:1, modelsToChange:"logic.urlFieldInvoiceSendingTypeIdList=1"} ,
                            { type:"radioCheckItemInline", model:"info.urlFieldInvoiceTypeId.value", title: "No", value:2, modelsToChange:"logic.urlFieldInvoiceSendingTypeIdList=0"}
                        ]
                    },
                    {title:$scope.info.urlFieldInvoiceSendingTypeIdList.title, visibility: "logic.urlFieldInvoiceSendingTypeIdList", isRequired:1,
                        level3:[
                            { type:"checkBoxItem", model:"info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice.value", title: "Payza email invoice", value:1},
                            { type:"checkBoxItem", model:"info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice.value", title: "Mail personalized invoice", value:2}
                        ]
                    },
                    {title:$scope.info.proofOfPaymentInfo.title, isRequired:1,
                        level3:[
                            { type:"textareaItem", model:"info.proofOfPaymentInfo.value" }
                        ]
                    },
                    {title:$scope.info.monthlySaleAmount.title, isRequired:1,
                        level3:[
                            { type:"textItem", model:"info.monthlySaleAmount.value" }
                        ]
                    },
                    {title:$scope.info.urlFieldRecurringBillingTypeId.title, isRequired:1,
                        level3:[
                            { type:"radioCheckItemInline", model:"info.urlFieldRecurringBillingTypeId.value", title: "Yes", value:1 } ,
                            { type:"radioCheckItemInline", model:"info.urlFieldRecurringBillingTypeId.value", title: "No", value:2}
                        ]
                    },
                    {
                        level3:[
                            { type:"navItem", model:"info.salesInformation.value"}
                        ]
                    }
                ]
            }

        ]},
        { level1: [
            { title:"Customer Relations", formName: "customerRelations",
                level2:[
                    {title:$scope.info.termsOfService.title, isRequired:1,
                        level3:[
                            { type:"textareaItem", model:"info.termsOfService.value"}
                        ]
                    },
                    {title:$scope.info.termsOfServiceLocation.title,isRequired:1,
                        level3:[
                            { type:"textItem", model:"info.termsOfServiceLocation.value" }
                        ]
                    },
                    {title:$scope.info.refundPolicy.title,isRequired:1,
                        level3:[
                            { type:"textareaItem", model:"info.refundPolicy.value" }
                        ]
                    },
                    {title:$scope.info.refundPolicyLocation.title,isRequired:1,
                        level3:[
                            { type:"textItem", model:"info.refundPolicyLocation.value" }
                        ]
                    },
                    {title:$scope.info.fraudPrevention.title,isRequired:1,
                        level3:[
                            { type:"textareaItem", model:"info.fraudPrevention.value" }
                        ]
                    },
                    {
                        level3:[
                            { type:"navItem", model:"info.customerRelations.value" }
                        ]
                    }
                ]
            }
        ]},
        { level1: [
            { title:"Submit Documents",
                level2:[
                    {title:"Upload Tool",
                        level3:[
                            { type:"uploadTool", model:"info.uploadTool.value" }
                        ]
                    }
                ]
            },
            {
                level3:[
                    { type:"navItem", model:"info.membersAreaDetails.value"}
                ]
            }

        ]}
    ]

});

