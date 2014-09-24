angular.module('payza.questionnaireCheckout', [])
.directive("questionnaireCheckout", ['$http',  function ($http) {
    return {
        restrict: "E",
        templateUrl: "../ng-partials/modules/QuestionnaireCheckout.html",
        replace: true,
        transclude: true,
        controller: ['$scope', function ($scope) {
            //link: ['$scope', function ($scope) {

            //testtt.$inject = ['$scope'];

            var objName;
            $scope.wasSubmitButtonClicked = false;
            $scope.objInit = function () {
                $scope.info = {};
                $scope.info.currentSection = 1;
                $scope.info.isValid = null;
                $scope.info.isValidSection1 = 0;
                $scope.info.isValidSection2 = 0;
                $scope.info.isValidSection3 = 0;
                $scope.info.isValidSection4 = 0;
                $scope.info.isValidSection5 = 0;
                $scope.info.isValidSectionDonations6 = 0;
                $scope.info.generalErrorMessages = null;
                $scope.info.idOfRecord = {};
                $scope.info.urlQuestionnaireTypeId = {};
                $scope.info.url = {};
                $scope.info.urlType = {};
                $scope.info.businessModel = {};
                $scope.info.revenueGenerationMethod = {};
                $scope.info.shippingCountryId = {};
                $scope.info.fraudPrevention = {};
                $scope.info.termsOfService = {};
                $scope.info.termsOfServiceLocation = {};
                $scope.info.refundPolicy = {};
                $scope.info.refundPolicyLocation = {};
                $scope.info.urlFieldMembersAreaTypeId = {};
                $scope.info.membersAreaDetails = {};
                $scope.info.averagePrice = {};
                $scope.info.previousUrlsId = {};

                $scope.info.urlFieldProductDeliveryMethodTypeIdList = {};
                $scope.info.urlFieldProductDeliveryMethodTypeIdList.value = [];
                $scope.info.urlFieldProductDeliveryMethodTypeIdList.online = {};
                $scope.info.urlFieldProductDeliveryMethodTypeIdList.regularPost = {};
                $scope.info.urlFieldProductDeliveryMethodTypeIdList.registeredMail = {};
                $scope.info.urlFieldProductDeliveryMethodTypeIdList.inPerson = {};

                $scope.info.urlFieldServiceProvisionMethodTypeIdList = {};
                $scope.info.urlFieldServiceProvisionMethodTypeIdList.value = [];
                $scope.info.urlFieldServiceProvisionMethodTypeIdList.inPerson = {};
                $scope.info.urlFieldServiceProvisionMethodTypeIdList.remotely = {};

                $scope.info.productDeliveryDelayTime = {};
                $scope.info.serviceProvisionDelayTime = {};
                $scope.info.urlFieldProductSourceTypeId = {};
                $scope.info.urlFieldServiceSourceTypeId = {};
                $scope.info.serviceSourceThirdPartyInfo = {};
                $scope.info.urlFieldSupplierTypeId = {};
                $scope.info.urlFieldPromotionMethodTypeIdList = {};
                $scope.info.urlFieldCustomerContactMethodTypeIdList = {};

                $scope.info.urlFieldDonorContactTypeId = {};
                $scope.info.averageDonationAmount = {};
                $scope.info.urlFieldRecurringDonationTypeId = {};
                $scope.info.monthlyDonationAmount = {};
                $scope.info.urlFieldDiscountTypeId = {};

                $scope.info.urlFieldSaleOriginTypeIdList = {};
                $scope.info.urlFieldSaleOriginTypeIdList.value = [];
                $scope.info.urlFieldSaleOriginTypeIdList.northAmerica = {};
                $scope.info.urlFieldSaleOriginTypeIdList.southAmerica = {};
                $scope.info.urlFieldSaleOriginTypeIdList.westernEurope = {};
                $scope.info.urlFieldSaleOriginTypeIdList.africa = {};
                $scope.info.urlFieldSaleOriginTypeIdList.asia = {};
                $scope.info.urlFieldSaleOriginTypeIdList.middleEast = {};
                $scope.info.urlFieldSaleOriginTypeIdList.oceania = {};

                $scope.info.urlFieldDonationOriginTypeIdList = {};
                $scope.info.urlFieldDonationOriginTypeIdList.value = [];
                $scope.info.urlFieldDonationOriginTypeIdList.northAmerica = {};
                $scope.info.urlFieldDonationOriginTypeIdList.southAmerica = {};
                $scope.info.urlFieldDonationOriginTypeIdList.westernEurope = {};
                $scope.info.urlFieldDonationOriginTypeIdList.africa = {};
                $scope.info.urlFieldDonationOriginTypeIdList.asia = {};
                $scope.info.urlFieldDonationOriginTypeIdList.middleEast = {};
                $scope.info.urlFieldDonationOriginTypeIdList.oceania = {};


                $scope.info.urlFieldInvoiceTypeId = {};

                $scope.info.urlFieldInvoiceSendingTypeIdList = {};
                $scope.info.urlFieldInvoiceSendingTypeIdList.value = [];
                $scope.info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice = {};
                $scope.info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice = {};

                $scope.info.monthlySaleAmount = {};
                $scope.info.urlFieldRecurringBillingTypeId = {};

            };

            $scope.resourceInit = function () {
                if (typeof $scope.currentLanguage === 'undefined') { $scope.currentLanguage = '\"en-US\"'; }
                switch ($scope.currentLanguage) {
                    case '\"en-US\"':
                        // for Checkout
                        $http.get('../ng-resources/WebsiteAddEdit/questionnaireCheckout_resources_en.json')
                            .success(function (data) {
                                $scope.resource = data;
                                if ($scope.info.urlQuestionnaireTypeId.value === 3) {                           //for Charity
                                    $scope.resource.noBusinessModel.title = $scope.resource.noBusinessModelForCharity.title;
                                    $scope.resource.revenueGenerationMethod.title = $scope.resource.revenueGenerationMethodForCharity.title;
                                    $scope.resource.revenueGenerationMethodCheck1.title = $scope.resource.revenueGenerationMethodCheck1ForCharity.title;
                                    $scope.resource.revenueGenerationMethodCheck2.title = $scope.resource.revenueGenerationMethodCheck2ForCharity.title;
                                    $scope.resource.revenueGenerationMethodCheck3.title = $scope.resource.revenueGenerationMethodCheck3ForCharity.title;
                                    $scope.resource.revenueGenerationMethodCheck4.title = $scope.resource.revenueGenerationMethodCheck4ForCharity.title;
                                }
                            })
                            .error(function (data, response) {
                                if (typeof data !== "undefined") {
                                    $scope.generalErrorMessages(data, response);
                                }
                            });
                        break;
                    case '\"fr-CA\"':
                        $http.get('../ng-resources/WebsiteAddEdit/questionnaireCheckout_resources_fr.json')
                            .success(function (data) {
                                $scope.resource = data;
                                if ($scope.info.urlQuestionnaireTypeId.value === 3) {                           //for Charity
                                    $scope.resource.isSite.title = $scope.resource.isSiteForCharity.title;
                                    $scope.resource.noBusinessModel.title = $scope.resource.noBusinessModelForCharity.title;
                                    $scope.resource.revenueGenerationMethod.title = $scope.resource.revenueGenerationMethodForCharity.title;
                                    $scope.resource.revenueGenerationMethodCheck1.title = $scope.resource.revenueGenerationMethodCheck1ForCharity.title;
                                    $scope.resource.revenueGenerationMethodCheck2.title = $scope.resource.revenueGenerationMethodCheck2ForCharity.title;
                                    $scope.resource.revenueGenerationMethodCheck3.title = $scope.resource.revenueGenerationMethodCheck3ForCharity.title;
                                    $scope.resource.revenueGenerationMethodCheck4.title = $scope.resource.revenueGenerationMethodCheck4ForCharity.title;
                                }
                            })
                            .error(function (data, response) {
                                if (typeof data !== "undefined") {
                                    $scope.generalErrorMessages(data, response);
                                }
                            });
                        break;
                }
            };

            $scope.htmlInit = function () {

                $scope.info.idOfRecord.value = angular.element("#id-of-page").val();

                angular.element("#submitDocTitle+fieldset").append(angular.element('#checkout-document-upload-form'));

                angular.element('#checkout-document-upload-form').css("display", "block");

                angular.element('#button-upload-website-review-documents').click(function () {
                    var idOfPage = angular.element('#id-of-page').val();
                    angular.element('#container-id-of-website-review-for-upload input').val(idOfPage);
                    angular.element('.js-unique-button-upload-postback').click();
                    return false;
                });

            };

            $scope.convertDataIntoAngularFormat = function () {

                $scope.introductionSection.serverValid = $scope.info.isValidSection1;
                $scope.donationRevenueDetails.serverValid = $scope.info.isValidSectionDonations6;
                $scope.productInformation.serverValid = $scope.info.isValidSection2;
                $scope.salesInformation.serverValid = $scope.info.isValidSection3;
                $scope.customerRelations.serverValid = $scope.info.isValidSection4;

                var objName;

                for (var level1Prop in $scope.info) {

                    var level2Prop = $scope.info[level1Prop];
                    
                    if (level1Prop !== "generalErrorMessages") {

                        if ($scope.info[level1Prop] === null) $scope.info[level1Prop] = {}; 
                        for (var level3Prop in $scope.info[level1Prop]) {
                            if (level3Prop !== "errorMessage" && level3Prop !== "value") {
                                if (level2Prop[level3Prop] === null) level2Prop[level3Prop] = {}; 
                            }
                        }
                    }
                }
             

                if (typeof $scope.info.urlFieldProductDeliveryMethodTypeIdList === 'undefined') { $scope.info.urlFieldProductDeliveryMethodTypeIdList = {}; }
                $scope.info.urlFieldProductDeliveryMethodTypeIdList.online = {};
                $scope.info.urlFieldProductDeliveryMethodTypeIdList.regularPost = {};
                $scope.info.urlFieldProductDeliveryMethodTypeIdList.registeredMail = {};
                $scope.info.urlFieldProductDeliveryMethodTypeIdList.inPerson = {};

                for (var i in $scope.info.urlFieldProductDeliveryMethodTypeIdList.value) {
                    switch ($scope.info.urlFieldProductDeliveryMethodTypeIdList.value[i]) {
                        case 3:
                            $scope.info.urlFieldProductDeliveryMethodTypeIdList.online.checked = 1;
                            $scope.info.urlFieldProductDeliveryMethodTypeIdList.online.value = 3;
                            break;
                        case 2:
                            $scope.info.urlFieldProductDeliveryMethodTypeIdList.regularPost.checked = 1;
                            $scope.info.urlFieldProductDeliveryMethodTypeIdList.regularPost.value = 2;
                            break;
                        case 1:
                            $scope.info.urlFieldProductDeliveryMethodTypeIdList.registeredMail.checked = 1;
                            $scope.info.urlFieldProductDeliveryMethodTypeIdList.registeredMail.value = 1;
                            break;
                        case 4:
                            $scope.info.urlFieldProductDeliveryMethodTypeIdList.inPerson.checked = 1;
                            $scope.info.urlFieldProductDeliveryMethodTypeIdList.inPerson.value = 4;
                            break;
                    }
                }

                if (typeof $scope.info.urlFieldServiceProvisionMethodTypeIdList === 'undefined') { $scope.info.urlFieldServiceProvisionMethodTypeIdList = {}; }
                $scope.info.urlFieldServiceProvisionMethodTypeIdList.inPerson = {};
                $scope.info.urlFieldServiceProvisionMethodTypeIdList.remotely = {};
                for (var i in $scope.info.urlFieldServiceProvisionMethodTypeIdList.value) {
                    switch ($scope.info.urlFieldServiceProvisionMethodTypeIdList.value[i]) {
                        case 1:
                            $scope.info.urlFieldServiceProvisionMethodTypeIdList.inPerson.checked = 1; $scope.info.urlFieldServiceProvisionMethodTypeIdList.inPerson.value = 1; break;
                        case 2:
                            $scope.info.urlFieldServiceProvisionMethodTypeIdList.remotely.checked = 1; $scope.info.urlFieldServiceProvisionMethodTypeIdList.remotely.value = 2; break;
                    }
                }

                if (typeof $scope.info.urlFieldCustomerContactMethodTypeIdList === 'undefined') { $scope.info.urlFieldCustomerContactMethodTypeIdList = {}; }
                $scope.info.urlFieldCustomerContactMethodTypeIdList.email = {};
                $scope.info.urlFieldCustomerContactMethodTypeIdList.phoneAndTelecomm = {};
                $scope.info.urlFieldCustomerContactMethodTypeIdList.social = {};
                $scope.info.urlFieldCustomerContactMethodTypeIdList.regularMail = {};
                $scope.info.urlFieldCustomerContactMethodTypeIdList.inPerson = {};
                $scope.info.urlFieldCustomerContactMethodTypeIdList.forumAndCommunity = {};
                $scope.info.urlFieldCustomerContactMethodTypeIdList.chatService = {};

                for (var i in $scope.info.urlFieldCustomerContactMethodTypeIdList.value) {
                    switch ($scope.info.urlFieldCustomerContactMethodTypeIdList.value[i]) {
                        case 1: $scope.info.urlFieldCustomerContactMethodTypeIdList.email.checked = 1; $scope.info.urlFieldCustomerContactMethodTypeIdList.email.value = 1; break;
                        case 5: $scope.info.urlFieldCustomerContactMethodTypeIdList.phoneAndTelecomm.checked = 1; $scope.info.urlFieldCustomerContactMethodTypeIdList.phoneAndTelecomm.value = 5; break;
                        case 2: $scope.info.urlFieldCustomerContactMethodTypeIdList.social.checked = 1; $scope.info.urlFieldCustomerContactMethodTypeIdList.social.value = 2; break;
                        case 6: $scope.info.urlFieldCustomerContactMethodTypeIdList.regularMail.checked = 1; $scope.info.urlFieldCustomerContactMethodTypeIdList.regularMail.value = 6; break;
                        case 3: $scope.info.urlFieldCustomerContactMethodTypeIdList.inPerson.checked = 1; $scope.info.urlFieldCustomerContactMethodTypeIdList.inPerson.value = 3; break;
                        case 7: $scope.info.urlFieldCustomerContactMethodTypeIdList.forumAndCommunity.checked = 1; $scope.info.urlFieldCustomerContactMethodTypeIdList.forumAndCommunity.value = 7; break;
                        case 4: $scope.info.urlFieldCustomerContactMethodTypeIdList.chatService.checked = 1; $scope.info.urlFieldCustomerContactMethodTypeIdList.chatService.value = 4; break;
                    }
                }

                if (typeof $scope.info.urlFieldSaleOriginTypeIdList === 'undefined') { $scope.info.urlFieldSaleOriginTypeIdList = {}; }
                $scope.info.urlFieldSaleOriginTypeIdList.northAmerica = {};
                $scope.info.urlFieldSaleOriginTypeIdList.southAmerica = {};
                $scope.info.urlFieldSaleOriginTypeIdList.westernEurope = {};
                $scope.info.urlFieldSaleOriginTypeIdList.easternEurope = {};
                $scope.info.urlFieldSaleOriginTypeIdList.africa = {};
                $scope.info.urlFieldSaleOriginTypeIdList.asia = {};
                $scope.info.urlFieldSaleOriginTypeIdList.middleEast = {};
                $scope.info.urlFieldSaleOriginTypeIdList.oceania = {};

                for (var i in $scope.info.urlFieldSaleOriginTypeIdList.value) {
                    switch ($scope.info.urlFieldSaleOriginTypeIdList.value[i]) {
                        case 1: $scope.info.urlFieldSaleOriginTypeIdList.northAmerica.checked = 1; $scope.info.urlFieldSaleOriginTypeIdList.northAmerica.value = 1; break;
                        case 2: $scope.info.urlFieldSaleOriginTypeIdList.southAmerica.checked = 1; $scope.info.urlFieldSaleOriginTypeIdList.southAmerica.value = 2; break;
                        case 3: $scope.info.urlFieldSaleOriginTypeIdList.westernEurope.checked = 1; $scope.info.urlFieldSaleOriginTypeIdList.westernEurope.value = 3; break;
                        case 5: $scope.info.urlFieldSaleOriginTypeIdList.africa.checked = 1; $scope.info.urlFieldSaleOriginTypeIdList.africa.value = 5; break;
                        case 6: $scope.info.urlFieldSaleOriginTypeIdList.asia.checked = 1; $scope.info.urlFieldSaleOriginTypeIdList.asia.value = 6; break;
                        case 7: $scope.info.urlFieldSaleOriginTypeIdList.middleEast.checked = 1; $scope.info.urlFieldSaleOriginTypeIdList.middleEast.value = 7; break;
                        case 8: $scope.info.urlFieldSaleOriginTypeIdList.oceania.checked = 1; $scope.info.urlFieldSaleOriginTypeIdList.oceania.value = 8; break;
                    }
                }

                if (typeof $scope.info.urlFieldDonationOriginTypeIdList === 'undefined') { $scope.info.urlFieldDonationOriginTypeIdList = {}; }
                $scope.info.urlFieldDonationOriginTypeIdList.northAmerica = {};
                $scope.info.urlFieldDonationOriginTypeIdList.southAmerica = {};
                $scope.info.urlFieldDonationOriginTypeIdList.westernEurope = {};
                $scope.info.urlFieldDonationOriginTypeIdList.africa = {};
                $scope.info.urlFieldDonationOriginTypeIdList.asia = {};
                $scope.info.urlFieldDonationOriginTypeIdList.middleEast = {};
                $scope.info.urlFieldDonationOriginTypeIdList.oceania = {};

                for (var i in $scope.info.urlFieldDonationOriginTypeIdList.value) {
                    switch ($scope.info.urlFieldDonationOriginTypeIdList.value[i]) {
                        case 1: $scope.info.urlFieldDonationOriginTypeIdList.northAmerica.checked = 1; $scope.info.urlFieldDonationOriginTypeIdList.northAmerica.value = 1; break;
                        case 2: $scope.info.urlFieldDonationOriginTypeIdList.southAmerica.checked = 1; $scope.info.urlFieldDonationOriginTypeIdList.southAmerica.value = 2; break;
                        case 3: $scope.info.urlFieldDonationOriginTypeIdList.westernEurope.checked = 1; $scope.info.urlFieldDonationOriginTypeIdList.westernEurope.value = 3; break;
                        case 5: $scope.info.urlFieldDonationOriginTypeIdList.africa.checked = 1; $scope.info.urlFieldDonationOriginTypeIdList.africa.value = 5; break;
                        case 6: $scope.info.urlFieldDonationOriginTypeIdList.asia.checked = 1; $scope.info.urlFieldDonationOriginTypeIdList.asia.value = 6; break;
                        case 7: $scope.info.urlFieldDonationOriginTypeIdList.middleEast.checked = 1; $scope.info.urlFieldDonationOriginTypeIdList.middleEast.value = 7; break;
                        case 8: $scope.info.urlFieldDonationOriginTypeIdList.oceania.checked = 1; $scope.info.urlFieldDonationOriginTypeIdList.oceania.value = 8; break;
                    }
                }

                if (typeof $scope.info.urlFieldInvoiceSendingTypeIdList === 'undefined') { $scope.info.urlFieldInvoiceSendingTypeIdList = {}; }
                $scope.info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice = {};
                $scope.info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice = {};
                for (var i in $scope.info.urlFieldInvoiceSendingTypeIdList.value) {
                    switch ($scope.info.urlFieldInvoiceSendingTypeIdList.value[i]) {
                        case 1:
                            $scope.info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice.checked = 1; $scope.info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice.value = 1; break;
                        case 2:
                            $scope.info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice.checked = 1; $scope.info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice.value = 2; break;
                    }
                }


                if (typeof $scope.info.urlFieldPromotionMethodTypeIdList === 'undefined') { $scope.info.urlFieldPromotionMethodTypeIdList = {}; }
                $scope.info.urlFieldPromotionMethodTypeIdList.email = {};
                $scope.info.urlFieldPromotionMethodTypeIdList.referral = {};
                $scope.info.urlFieldPromotionMethodTypeIdList.searchEngine = {};
                $scope.info.urlFieldPromotionMethodTypeIdList.regularMail = {};
                $scope.info.urlFieldPromotionMethodTypeIdList.social = {};
                $scope.info.urlFieldPromotionMethodTypeIdList.print = {};
                $scope.info.urlFieldPromotionMethodTypeIdList.affiliate = {};
                $scope.info.urlFieldPromotionMethodTypeIdList.televisionAndRadio = {};
                $scope.info.urlFieldPromotionMethodTypeIdList.webBanner = {};

                for (var i in $scope.info.urlFieldPromotionMethodTypeIdList.value) {
                    switch ($scope.info.urlFieldPromotionMethodTypeIdList.value[i]) {
                        case 1: $scope.info.urlFieldPromotionMethodTypeIdList.email.checked = 1; $scope.info.urlFieldPromotionMethodTypeIdList.email.value = 1; break;
                        case 6: $scope.info.urlFieldPromotionMethodTypeIdList.referral.checked = 1; $scope.info.urlFieldPromotionMethodTypeIdList.referral.value = 6; break;
                        case 2: $scope.info.urlFieldPromotionMethodTypeIdList.searchEngine.checked = 1; $scope.info.urlFieldPromotionMethodTypeIdList.searchEngine.value = 2; break;
                        case 7: $scope.info.urlFieldPromotionMethodTypeIdList.regularMail.checked = 1; $scope.info.urlFieldPromotionMethodTypeIdList.regularMail.value = 7; break;
                        case 3: $scope.info.urlFieldPromotionMethodTypeIdList.social.checked = 1; $scope.info.urlFieldPromotionMethodTypeIdList.social.value = 3; break;
                        case 8: $scope.info.urlFieldPromotionMethodTypeIdList.print.checked = 1; $scope.info.urlFieldPromotionMethodTypeIdList.print.value = 8; break;
                        case 4: $scope.info.urlFieldPromotionMethodTypeIdList.affiliate.checked = 1; $scope.info.urlFieldPromotionMethodTypeIdList.affiliate.value = 4; break;
                        case 9: $scope.info.urlFieldPromotionMethodTypeIdList.televisionAndRadio.checked = 1; $scope.info.urlFieldPromotionMethodTypeIdList.televisionAndRadio.value = 9; break;
                        case 5: $scope.info.urlFieldPromotionMethodTypeIdList.webBanner.checked = 1; $scope.info.urlFieldPromotionMethodTypeIdList.webBanner.value = 5; break;
                    }
                }
            };

            $scope.openSection = function (sectionIdForShowHide) {

                if (sectionIdForShowHide === null || sectionIdForShowHide === undefined || sectionIdForShowHide === '') { sectionIdForShowHide = "introductionSectionTitle"; }

                if (sectionIdForShowHide == 1 || sectionIdForShowHide == "1") { sectionIdForShowHide = "introductionSectionTitle"; }
                if (sectionIdForShowHide == 2 || sectionIdForShowHide == "2") { sectionIdForShowHide = "productInformationTitle"; }
                if (sectionIdForShowHide == 3 || sectionIdForShowHide == "3") { sectionIdForShowHide = "salesInformationTitle"; }
                if (sectionIdForShowHide == 4 || sectionIdForShowHide == "4") { sectionIdForShowHide = "customerRelationsTitle"; }
                if (sectionIdForShowHide == 5 || sectionIdForShowHide == "5") { sectionIdForShowHide = "submitDocTitle"; }
                if (sectionIdForShowHide == 6 || sectionIdForShowHide == "6") { sectionIdForShowHide = "donationRevenueDetailsTitle"; }

                var elementForShowHide = angular.element("#" + sectionIdForShowHide + "+fieldset");

                angular.element("fieldset:not(#" + sectionIdForShowHide + "+fieldset):not(:last)").slideUp();

                elementForShowHide.slideDown();


                switch (sectionIdForShowHide) {
                    case "introductionSectionTitle": $scope.info.currentSection = 1; break;
                    case "productInformationTitle": $scope.info.currentSection = 2; break;
                    case "salesInformationTitle": $scope.info.currentSection = 3; break;
                    case "customerRelationsTitle": $scope.info.currentSection = 4; break;
                    case "submitDocTitle": $scope.info.currentSection = 5; break;
                    case "donationRevenueDetailsTitle": $scope.info.currentSection = 6; break;
                }

                if (sectionIdForShowHide != "introductionSectionTitle") angular.element('html, body').animate({ scrollTop: 340 }, 'fast');
                $scope.loadingIndicatorLightboxVisible = 0;

            };

            $scope.convertBussinessModelToAngular = function () {

                var isConditionTrue;
                for (var i in $scope.previouslySubmittedWebsites) {

                    if ($scope.previouslySubmittedWebsites[i].data.length != 0 && $scope.previouslySubmittedWebsites[i].id == $scope.info.revenueGenerationMethod.value) {

                        $scope.previouslySubmittedWebsites[i].isVisible = true;

                        switch ($scope.previouslySubmittedWebsites[i].id) {
                            case 1:
                                $scope.previouslySubmittedWebsites[i].name = "Services";
                                break;
                            case 2:
                                $scope.previouslySubmittedWebsites[i].name = "Products";
                                break;
                            case 4:
                                $scope.previouslySubmittedWebsites[i].name = "Products and services";
                                break;
                        }

                        for (var ii in $scope.previouslySubmittedWebsites[i].data) {
                            $scope.previouslySubmittedWebsites[i].data[ii].isEnabled = true;
                        }

                        $scope.businessModelTitleIsVisible = 1;
                        isConditionTrue = 1;
                    } else {
                        $scope.previouslySubmittedWebsites[i].isVisible = false;
                        if (!isConditionTrue) $scope.businessModelTitleIsVisible = 0;
                    }
                }

            };

            $scope.prepareDataForServer = function () {

                if ($scope.info.urlQuestionnaireTypeId && typeof $scope.info.urlQuestionnaireTypeId.value !== 'undefined' && $scope.info.urlQuestionnaireTypeId.value) $scope.info.urlQuestionnaireTypeId.value = parseInt($scope.info.urlQuestionnaireTypeId.value);

                if ($scope.info.urlType !== null) {
                    if (typeof $scope.info.urlType.value !== 'undefined') { $scope.info.urlType.value = parseInt($scope.info.urlType.value); }
                }

                if ($scope.info.revenueGenerationMethod !== null) {
                    if (typeof $scope.info.revenueGenerationMethod.value !== 'undefined') { $scope.info.revenueGenerationMethod.value = parseInt($scope.info.revenueGenerationMethod.value); }
                }

                if ($scope.info.shippingCountryId !== null) {
                    if (typeof $scope.info.shippingCountryId.value !== 'undefined') { $scope.info.shippingCountryId.value = parseInt($scope.info.shippingCountryId.value); }
                }

                if ($scope.info.urlFieldMembersAreaTypeId !== null) {
                    if (typeof $scope.info.urlFieldMembersAreaTypeId.value !== 'undefined') { $scope.info.urlFieldMembersAreaTypeId.value = parseInt($scope.info.urlFieldMembersAreaTypeId.value); }
                }

                if ($scope.info.averagePrice !== null) {
                    if (typeof $scope.info.averagePrice.value !== 'undefined') { $scope.info.averagePrice.value = parseFloat($scope.info.averagePrice.value); }
                }

                if ($scope.info.urlFieldProductDeliveryMethodTypeIdList !== null) {
                    $scope.info.urlFieldProductDeliveryMethodTypeIdList.value = [];
                    if (typeof $scope.info.urlFieldProductDeliveryMethodTypeIdList.online.value !== 'undefined' && ($scope.info.urlFieldProductDeliveryMethodTypeIdList.online.value)) { $scope.info.urlFieldProductDeliveryMethodTypeIdList.value.push(parseInt($scope.info.urlFieldProductDeliveryMethodTypeIdList.online.value)); }
                    if (typeof $scope.info.urlFieldProductDeliveryMethodTypeIdList.regularPost.value !== 'undefined' && ($scope.info.urlFieldProductDeliveryMethodTypeIdList.regularPost.value)) { $scope.info.urlFieldProductDeliveryMethodTypeIdList.value.push(parseInt($scope.info.urlFieldProductDeliveryMethodTypeIdList.regularPost.value)); }
                    if (typeof $scope.info.urlFieldProductDeliveryMethodTypeIdList.registeredMail.value !== 'undefined' && ($scope.info.urlFieldProductDeliveryMethodTypeIdList.registeredMail.value)) { $scope.info.urlFieldProductDeliveryMethodTypeIdList.value.push(parseInt($scope.info.urlFieldProductDeliveryMethodTypeIdList.registeredMail.value)); }
                    if (typeof $scope.info.urlFieldProductDeliveryMethodTypeIdList.inPerson.value !== 'undefined' && ($scope.info.urlFieldProductDeliveryMethodTypeIdList.inPerson.value)) { $scope.info.urlFieldProductDeliveryMethodTypeIdList.value.push(parseInt($scope.info.urlFieldProductDeliveryMethodTypeIdList.inPerson.value)); }
                }

                if ($scope.info.urlFieldServiceProvisionMethodTypeIdList !== null) {
                    $scope.info.urlFieldServiceProvisionMethodTypeIdList.value = [];
                    if (typeof $scope.info.urlFieldServiceProvisionMethodTypeIdList.inPerson.value !== 'undefined' && ($scope.info.urlFieldServiceProvisionMethodTypeIdList.inPerson.value)) { $scope.info.urlFieldServiceProvisionMethodTypeIdList.value.push(parseInt($scope.info.urlFieldServiceProvisionMethodTypeIdList.inPerson.value)); }
                    if (typeof $scope.info.urlFieldServiceProvisionMethodTypeIdList.remotely.value !== 'undefined' && ($scope.info.urlFieldServiceProvisionMethodTypeIdList.remotely.value)) { $scope.info.urlFieldServiceProvisionMethodTypeIdList.value.push(parseInt($scope.info.urlFieldServiceProvisionMethodTypeIdList.remotely.value)); }
                }

                if ($scope.info.productDeliveryDelayTime !== null) {
                    if (typeof $scope.info.productDeliveryDelayTime.value !== 'undefined') { $scope.info.productDeliveryDelayTime.value = parseFloat($scope.info.productDeliveryDelayTime.value); }
                }
                if ($scope.info.serviceProvisionDelayTime !== null) {
                    if (typeof $scope.info.serviceProvisionDelayTime.value !== 'undefined') { $scope.info.serviceProvisionDelayTime.value = parseFloat($scope.info.serviceProvisionDelayTime.value); }
                }

                if ($scope.info.urlFieldProductSourceTypeId !== null) {
                    if (typeof $scope.info.urlFieldProductSourceTypeId.value !== 'undefined') { $scope.info.urlFieldProductSourceTypeId.value = parseInt($scope.info.urlFieldProductSourceTypeId.value); }
                }
                if ($scope.info.urlFieldServiceSourceTypeId !== null) {
                    if (typeof $scope.info.urlFieldServiceSourceTypeId.value !== 'undefined') { $scope.info.urlFieldServiceSourceTypeId.value = parseInt($scope.info.urlFieldServiceSourceTypeId.value); }
                }

                if ($scope.info.urlFieldDiscountTypeId !== null) {
                    if (typeof $scope.info.urlFieldDiscountTypeId.value !== 'undefined') { $scope.info.urlFieldDiscountTypeId.value = parseInt($scope.info.urlFieldDiscountTypeId.value); }
                }

                if ($scope.info.urlFieldSupplierTypeId !== null) {
                    if (typeof $scope.info.urlFieldSupplierTypeId.value !== 'undefined') { $scope.info.urlFieldSupplierTypeId.value = parseInt($scope.info.urlFieldSupplierTypeId.value); }
                }

                if ($scope.info.urlFieldDonorContactTypeId !== null && typeof $scope.info.urlFieldDonorContactTypeId !== 'undefined') {
                    if (typeof $scope.info.urlFieldDonorContactTypeId.value !== 'undefined') { $scope.info.urlFieldDonorContactTypeId.value = parseInt($scope.info.urlFieldDonorContactTypeId.value); }
                }
                if ($scope.info.averageDonationAmount !== null && typeof $scope.info.averageDonationAmount !== 'undefined') {
                    if (typeof $scope.info.averageDonationAmount.value !== 'undefined') { $scope.info.averageDonationAmount.value = parseFloat($scope.info.averageDonationAmount.value); }
                }
                if ($scope.info.urlFieldRecurringDonationTypeId !== null && typeof $scope.info.urlFieldRecurringDonationTypeId !== 'undefined') {
                    if (typeof $scope.info.urlFieldRecurringDonationTypeId.value !== 'undefined') { $scope.info.urlFieldRecurringDonationTypeId.value = parseInt($scope.info.urlFieldRecurringDonationTypeId.value); }
                }
                if ($scope.info.monthlyDonationAmount !== null && typeof $scope.info.monthlyDonationAmount !== 'undefined') {
                    if (typeof $scope.info.monthlyDonationAmount.value !== 'undefined') { $scope.info.monthlyDonationAmount.value = parseFloat($scope.info.monthlyDonationAmount.value); }
                }

                objName = $scope.info.urlFieldSaleOriginTypeIdList;
                if (objName) {
                    objName.value = [];

                    if (typeof objName.northAmerica.value !== 'undefined' && (objName.northAmerica.value)) { objName.value.push(parseInt(objName.northAmerica.value)); }
                    if (typeof objName.southAmerica.value !== 'undefined' && (objName.southAmerica.value)) { objName.value.push(parseInt(objName.southAmerica.value)); }
                    if (typeof objName.westernEurope.value !== 'undefined' && (objName.westernEurope.value)) { objName.value.push(parseInt(objName.westernEurope.value)); }
                    if (typeof objName.africa.value !== 'undefined' && (objName.africa.value)) { objName.value.push(parseInt(objName.africa.value)); }
                    if (typeof objName.asia.value !== 'undefined' && (objName.asia.value)) { objName.value.push(parseInt(objName.asia.value)); }
                    if (typeof objName.middleEast.value !== 'undefined' && (objName.middleEast.value)) { objName.value.push(parseInt(objName.middleEast.value)); }
                    if (typeof objName.oceania.value !== 'undefined' && (objName.oceania.value)) { objName.value.push(parseInt(objName.oceania.value)); }

                    delete objName.northAmerica;
                    delete objName.southAmerica;
                    delete objName.westernEurope;
                    delete objName.africa;
                    delete objName.asia;
                    delete objName.middleEast;
                    delete objName.oceania;
                }

                objName = $scope.info.urlFieldDonationOriginTypeIdList;

                if (objName) {

                    objName.value = [];

                    if (typeof objName.northAmerica.value !== 'undefined' && (objName.northAmerica.value)) { objName.value.push(parseInt(objName.northAmerica.value)); }
                    if (typeof objName.southAmerica.value !== 'undefined' && (objName.southAmerica.value)) { objName.value.push(parseInt(objName.southAmerica.value)); }
                    if (typeof objName.westernEurope.value !== 'undefined' && (objName.westernEurope.value)) { objName.value.push(parseInt(objName.westernEurope.value)); }
                    if (typeof objName.africa.value !== 'undefined' && (objName.africa.value)) { objName.value.push(parseInt(objName.africa.value)); }
                    if (typeof objName.asia.value !== 'undefined' && (objName.asia.value)) { objName.value.push(parseInt(objName.asia.value)); }
                    if (typeof objName.middleEast.value !== 'undefined' && (objName.middleEast.value)) { objName.value.push(parseInt(objName.middleEast.value)); }
                    if (typeof objName.oceania.value !== 'undefined' && (objName.oceania.value)) { objName.value.push(parseInt(objName.oceania.value)); }
                    delete objName.northAmerica;
                    delete objName.southAmerica;
                    delete objName.westernEurope;

                    delete objName.africa;
                    delete objName.asia;
                    delete objName.middleEast;
                    delete objName.oceania;

                }

                objName = $scope.info.urlFieldPromotionMethodTypeIdList;

                if (objName) {

                    objName.value = [];


                    if (typeof objName.email.value !== 'undefined' && (objName.email.value)) { objName.value.push(parseInt(objName.email.value)); }
                    if (typeof objName.referral.value !== 'undefined' && (objName.referral.value)) { objName.value.push(parseInt(objName.referral.value)); }
                    if (typeof objName.searchEngine.value !== 'undefined' && (objName.searchEngine.value)) { objName.value.push(parseInt(objName.searchEngine.value)); }
                    if (typeof objName.regularMail.value !== 'undefined' && (objName.regularMail.value)) { objName.value.push(parseInt(objName.regularMail.value)); }
                    if (typeof objName.social.value !== 'undefined' && (objName.social.value)) { objName.value.push(parseInt(objName.social.value)); }
                    if (typeof objName.print.value !== 'undefined' && (objName.print.value)) { objName.value.push(parseInt(objName.print.value)); }
                    if (typeof objName.affiliate.value !== 'undefined' && (objName.affiliate.value)) { objName.value.push(parseInt(objName.affiliate.value)); }
                    if (typeof objName.televisionAndRadio.value !== 'undefined' && (objName.televisionAndRadio.value)) { objName.value.push(parseInt(objName.televisionAndRadio.value)); }
                    if (typeof objName.webBanner.value !== 'undefined' && (objName.webBanner.value)) { objName.value.push(parseInt(objName.webBanner.value)); }

                    delete objName.email;
                    delete objName.referral;
                    delete objName.searchEngine;
                    delete objName.regularMail;
                    delete objName.social;
                    delete objName.print;
                    delete objName.affiliate;
                    delete objName.televisionAndRadio;
                    delete objName.webBanner;
                }

                objName = $scope.info.urlFieldCustomerContactMethodTypeIdList;
                if (objName) {

                    objName.value = [];

                    if (typeof objName.email.value !== 'undefined' && (objName.email.value)) { objName.value.push(parseInt(objName.email.value)); }
                    if (typeof objName.phoneAndTelecomm.value !== 'undefined' && (objName.phoneAndTelecomm.value)) { objName.value.push(parseInt(objName.phoneAndTelecomm.value)); }
                    if (typeof objName.social.value !== 'undefined' && (objName.social.value)) { objName.value.push(parseInt(objName.social.value)); }
                    if (typeof objName.regularMail.value !== 'undefined' && (objName.regularMail.value)) { objName.value.push(parseInt(objName.regularMail.value)); }
                    if (typeof objName.inPerson.value !== 'undefined' && (objName.inPerson.value)) { objName.value.push(parseInt(objName.inPerson.value)); }
                    if (typeof objName.forumAndCommunity.value !== 'undefined' && (objName.forumAndCommunity.value)) { objName.value.push(parseInt(objName.forumAndCommunity.value)); }
                    if (typeof objName.chatService.value !== 'undefined' && (objName.chatService.value)) { objName.value.push(parseInt(objName.chatService.value)); }

                    delete objName.email;
                    delete objName.phoneAndTelecomm;
                    delete objName.social;
                    delete objName.regularMail;
                    delete objName.inPerson;
                    delete objName.forumAndCommunity;
                    delete objName.chatService;
                }

                if ($scope.info.urlFieldInvoiceSendingTypeIdList !== null) {
                    $scope.info.urlFieldInvoiceSendingTypeIdList.value = [];

                    if (typeof $scope.info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice.value !== 'undefined' && ($scope.info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice.value)) { $scope.info.urlFieldInvoiceSendingTypeIdList.value.push(parseInt($scope.info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice.value)); }
                    if (typeof $scope.info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice.value !== 'undefined' && ($scope.info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice.value)) { $scope.info.urlFieldInvoiceSendingTypeIdList.value.push(parseInt($scope.info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice.value)); }
                }

                if ($scope.info.monthlySaleAmount !== null) {
                    if (typeof $scope.info.monthlySaleAmount.value !== 'undefined') { $scope.info.monthlySaleAmount.value = parseFloat($scope.info.monthlySaleAmount.value); }
                }
                if ($scope.info.urlFieldRecurringBillingTypeId !== null) {
                    if (typeof $scope.info.urlFieldRecurringBillingTypeId.value !== 'undefined') { $scope.info.urlFieldRecurringBillingTypeId.value = parseInt($scope.info.urlFieldRecurringBillingTypeId.value); }
                }

                if ($scope.info.urlQuestionnaireTypeId.value == 2) {
                    $scope.info.urlFieldDonorContactTypeId = null;
                    $scope.info.donorContactInfo = null;
                    $scope.info.averageDonationAmount = null;
                    $scope.info.urlFieldRecurringDonationTypeId = null;
                    $scope.info.monthlyDonationAmount = null;
                    $scope.info.urlFieldDonationOriginTypeIdList = null;
                }
            };

            $scope.updateObjectProperty = function (sourceObj, targetObj) {
                for (var key in sourceObj) {
                    if (sourceObj[key] !== null) { targetObj[key] = sourceObj[key]; }
                }
            }

            $scope.loadingIndicatorIconPositioning = function () {

                var documentHeight = $(window).height();

                var documentWidth = $(window).width();

                var elementWidth = $('#loading-indicator-lightbox')[0].offsetWidth;

                var viewportOffset = $('.panel-body')[0].getBoundingClientRect();

                var topOffset = (viewportOffset.top >= 0) ? viewportOffset.top : 0;

                var bottomOffset = (viewportOffset.bottom >= documentHeight) ? documentHeight : viewportOffset.bottom;

                var visibleWidth = (documentWidth > elementWidth) ? elementWidth : documentWidth - viewportOffset.left;

                $("#loading-indicator-lightbox").css({ "left": viewportOffset.left, "top": topOffset, "height": bottomOffset - topOffset, "width": visibleWidth })

            };

            $scope.generalErrorMessages = function (data, response) {

                $scope.merchantServicesBlockVisible = 0;

                switch (response) {
                    case 401:
                        window.location.href = '../Logout.aspx';
                        break;
                    case 500:
                        $scope.info.generalErrorMessages = (typeof data.Message != "undefined") ? data.Message : '' + (typeof data.errorMessage != "undefined") ? data.errorMessage : '';
                        break;
                    default:
                        $scope.info.generalErrorMessages = "An Error occurred, please refresh the page and try again.";
                }

            };

            $scope.revenueGenerationMethodConfirm = function (isConfirmed) {
                if (isConfirmed == true) {
                    $scope.revenueGenerationMethodPreviousValue = $scope.info.revenueGenerationMethod.value;

                    $scope.info.businessModel.value = null;
                    $scope.businessModelPreviousValue = null;
                }
                else {
                    $scope.info.revenueGenerationMethod.value = $scope.revenueGenerationMethodPreviousValue;
                }
            };

            $scope.turnConfirmBusinessmodelVisibility = function () { $scope.confirmBusinessmodelVisibility = 1; }

            $scope.getPreviousWebsiteReviewQuestionnaireConfirm = function (isConfirmed) {
                if (isConfirmed == true) {
                    $scope.getPreviousWebsiteReviewQuestionnaire($scope.info.businessModel.value);
                }
                else {
                    $scope.info.businessModel.value = $scope.businessModelPreviousValue;
                }
            };

            $scope.getPreviousWebsiteReviewQuestionnaire = function (idOfRecord) {

                $scope.loadingIndicatorLightboxVisible = 1;
                $scope.businessModelPreviousValue = idOfRecord;

                $http.get("../JSON/WebsiteApi/GetPreviousWebsiteQuestionnaire/" + idOfRecord)

                    .success(function (data) {

                        $scope.updateObjectProperty(data, $scope.info);

                        $scope.info.businessModel.value = $scope.businessModelPreviousValue;

                        $scope.info.previousUrlsId.value = $scope.businessModelPreviousValue;

                        $scope.convertDataIntoAngularFormat();

                        $scope.info.currentSection = document.getElementById('id-of-current-section').value;

                        $scope.revenueGenerationMethodPreviousValue = $scope.info.revenueGenerationMethod.value;

                        $scope.loadingIndicatorLightboxVisible = 0;

                    })
                    .error(function (data, response) {
                        $scope.generalErrorMessages(data, response);
                        $scope.loadingIndicatorLightboxVisible = 0;
                    })
            };

            $scope.saveForm = function (sectionTitle) {

                if (typeof $scope.info.businessModel != "undefined") $scope.info.previousUrlsId.value = $scope.info.businessModel.value;

                $scope.revenueGenerationMethodPreviousValue = $scope.info.revenueGenerationMethod.value;
                var functionArgumentsLength = arguments.length;

                $scope.loadingIndicatorLightboxVisible = 1;
                if ($scope.info.currentSection === null || $scope.info.currentSection === undefined || $scope.info.currentSection === '') { $scope.info.currentSection = 1; }

                $scope.prepareDataForServer();

                $http({
                    method: 'POST',
                    url: '../JSON/WebsiteApi/SaveWebsiteQuestionnaire',
                    data: $scope.info
                }).
                    success(function (response) {

                        $scope.info = response;

                        $scope.info.businessModel = {};
                        $scope.info.businessModel.value = $scope.businessModelPreviousValue;

                        angular.element("#id-of-page").val($scope.info.idOfRecord.value);
                        $scope.convertDataIntoAngularFormat();
                        $scope.loadingIndicatorLightboxVisible = 0;
                        if (functionArgumentsLength > 0 && $scope.info.actionWasSuccessful) {
                            $scope.openSection(sectionTitle);
                        } else {
                            angular.element('html, body').animate({ scrollTop: 340 }, 'fast');
                        }

                    }).
                    error(function (data, response) {
                        $scope.generalErrorMessages(data, response);
                        $scope.loadingIndicatorLightboxVisible = 0;
                    });
            };

            $scope.submitForm = function (formName, sectionForShow) {
                $scope.revenueGenerationMethodPreviousValue = $scope.info.revenueGenerationMethod.value;
                $scope.wasSubmitButtonClicked = 1;
                $scope.loadingIndicatorLightboxVisible = 1;

                switch (sectionForShow) {
                    case "productInformationTitle": if ($scope.info.urlQuestionnaireTypeId == 3) { $scope.info.currentSection = 6 } else { $scope.info.currentSection = 1 }; break;
                    case "salesInformationTitle": $scope.info.currentSection = 2; break;
                    case "customerRelationsTitle": $scope.info.currentSection = 3; break;
                    case "submitDocTitle": $scope.info.currentSection = 4; break;
                    case "donationRevenueDetailsTitle": $scope.info.currentSection = 1; break;
                    case "5": $scope.info.currentSection = 5; break;
                    default: $scope.info.currentSection = 1;
                }

                if ($scope.info.currentSection === null || $scope.info.currentSection === undefined || $scope.info.currentSection === '') { $scope.info.currentSection = 1; }

                $scope.prepareDataForServer();

                $http({
                    method: 'POST',
                    url: '../JSON/WebsiteApi/SubmitWebsiteQuestionnaire',
                    data: $scope.info
                }).
                    success(function (response) {
                        $scope.info = response;
                        $scope.convertDataIntoAngularFormat();

                        if (formName !== null && formName !== undefined && formName !== '') {

                            formName.serverValid = response.isValid;
                            if (formName.serverValid === true) {
                                angular.element("#" + formName.$name + "Title+fieldset").slideUp();
                                angular.element("#" + sectionForShow + "+fieldset").slideDown();
                            }
                        }

                        angular.element('html, body').animate({ scrollTop: 340 }, 'fast');
                        $scope.loadingIndicatorLightboxVisible = 0;

                        if ($scope.info.isValid !== false && sectionForShow == 5) {
                            window.location.href = '../Website/WebsiteAddEditResultRedirection.aspx'
                        }
                    }).
                    error(function (data, response) {
                        $scope.generalErrorMessages(data, response);
                        $scope.loadingIndicatorLightboxVisible = 0;
                    });

            };



            $scope.objInit();

            $scope.htmlInit();

            $scope.getCurrentCulture = function () {
                $http.get('../JSON/CultureApi/GetCurrentCulture')
                    .success(function (data) {
                        $scope.currentLanguage = data;
                        $scope.getWebsiteReviewQuestionnaire();
                    })
                    .error(function (data, response) {
                        $scope.generalErrorMessages(data, response);
                        $scope.getWebsiteReviewQuestionnaire();
                    });

            };

            $scope.getCurrentCulture();

            $scope.getWebsiteReviewQuestionnaire = function () {

                $http.get("../JSON/WebsiteApi/GetWebsiteQuestionnaire/" + $scope.info.idOfRecord.value)

                    .success(function (data) {

                        $scope.updateObjectProperty(data, $scope.info);

                        $scope.convertDataIntoAngularFormat();

                        $scope.resourceInit();

                        $scope.info.currentSection = document.getElementById('id-of-current-section').value;

                        angular.element("#loading-indicator-lightbox-for-heading").remove();

                        $scope.openSection($scope.info.currentSection);

                        $scope.revenueGenerationMethodPreviousValue = $scope.info.revenueGenerationMethod.value;

                        $scope.info.businessModel.value = $scope.info.previousUrlsId.value;

                        $scope.businessModelPreviousValue = $scope.info.businessModel.value;

                        $scope.getShippingCountries();
                    })
                    .error(function (data, response) {

                        $scope.resourceInit();

                        $scope.generalErrorMessages(data, response);
                        $scope.loadingIndicatorLightboxVisible = 0;

                    })
            };

            $scope.getShippingCountries = function () {
                $http.get('../JSON/WebsiteApi/GetShippingCountryList')
                    .success(function (data) {

                        $scope.shippingCountryId = {};
                        $scope.shippingCountryId.source = {};

                        for (var i in data) {
                            name = ('00' + i).slice(-3) + data[i].name;
                            $scope.shippingCountryId.source[name] = data[i].id;
                        }

                        $scope.getPreviouslySubmittedWebsites();

                    })
                    .error(function (data, response) {
                        $scope.generalErrorMessages(data, response);
                        $scope.loadingIndicatorLightboxVisible = 0;
                    })
            };

            $scope.getPreviouslySubmittedWebsites = function () {

                $http.get('../JSON/WebsiteApi/GetWebsiteSummaryList/')
                    .success(function (data) {



                        $scope.previouslySubmittedWebsites = data;

                        $scope.convertBussinessModelToAngular();

                        $scope.$watch('introductionSection.$invalid', function (newValue, oldValue, $scope) {
                            if (newValue !== oldValue) {
                                if ($scope.introductionSection.$invalid) {
                                    $scope.introductionSection.serverValid = false;
                                }
                            }

                        });
                        $scope.$watch('donationRevenueDetails.$invalid', function (newValue, oldValue, $scope) {
                            if (newValue !== oldValue) {
                                if ($scope.donationRevenueDetails.$invalid) {
                                    $scope.donationRevenueDetails.serverValid = false;
                                }
                            }
                        });
                        $scope.$watch('productInformation.$invalid', function (newValue, oldValue, $scope) {
                            if (newValue !== oldValue) {
                                if ($scope.productInformation.$invalid) {
                                    $scope.productInformation.serverValid = false;
                                }
                            }
                        });
                        $scope.$watch('salesInformation.$invalid', function (newValue, oldValue, $scope) {
                            if (newValue !== oldValue) {
                                if ($scope.salesInformation.$invalid) {
                                    $scope.salesInformation.serverValid = false;
                                }
                            }
                        });
                        $scope.$watch('customerRelations.$invalid', function (newValue, oldValue, $scope) {
                            if (newValue !== oldValue) {
                                if ($scope.customerRelations.$invalid) {
                                    $scope.customerRelations.serverValid = false;
                                }
                            }
                        });

                        $scope.$watch('info.revenueGenerationMethod.value', function (newValue, oldValue, $scope) {
                            if (newValue !== oldValue) {
                                $scope.convertBussinessModelToAngular();
                            }
                        });
                        $scope.merchantServicesBlockVisible = 1;

                        $scope.$watch('loadingIndicatorLightboxVisible', function (newValue, oldValue, $scope) {
                            if (newValue === 1) {
                                $scope.loadingIndicatorIconPositioning();
                            }
                        });

                    })
                    .error(function (data, response) {

                        $scope.generalErrorMessages(data, response);
                        $scope.loadingIndicatorLightboxVisible = 0;

                    })

            };
        }]
    };
}]);







