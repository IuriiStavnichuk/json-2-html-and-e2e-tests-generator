angular.module('payza.questionnaireCheckout', [])
    .directive("questionnaireCheckout", function ($http, $q) {
        return {
            restrict: "E",
            templateUrl: "ng-partials/modules/QuestionnaireCheckout.html",
            replace: true,
            transclude: true,
            link: function ($scope) {

                console.time("loading time");

                $scope.objInit = function () {
                    $scope.info = {};
                    $scope.info.currentSection = 1;
                    $scope.info.isValid = null;
                    $scope.info.isValidSection1 = null;
                    $scope.info.isValidSection2 = null;
                    $scope.info.isValidSection3 = null;
                    $scope.info.isValidSection4 = null;
                    $scope.info.isValidSection5 = null;
                    $scope.info.isValidSectionDonations6 = null;
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
                    //$scope.info.customerSupportInfo = {};
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
                    $scope.info.urlFieldSaleOriginTypeIdList.easternEurope = {};
                    $scope.info.urlFieldSaleOriginTypeIdList.africa = {};
                    $scope.info.urlFieldSaleOriginTypeIdList.asia = {};
                    $scope.info.urlFieldSaleOriginTypeIdList.middleEast = {};
                    $scope.info.urlFieldSaleOriginTypeIdList.oceania = {};

                    $scope.info.urlFieldDonationOriginTypeIdList = {};
                    $scope.info.urlFieldDonationOriginTypeIdList.value = [];
                    $scope.info.urlFieldDonationOriginTypeIdList.northAmerica = {};
                    $scope.info.urlFieldDonationOriginTypeIdList.southAmerica = {};
                    $scope.info.urlFieldDonationOriginTypeIdList.westernEurope = {};
                    $scope.info.urlFieldDonationOriginTypeIdList.easternEurope = {};
                    $scope.info.urlFieldDonationOriginTypeIdList.africa = {};
                    $scope.info.urlFieldDonationOriginTypeIdList.asia = {};
                    $scope.info.urlFieldDonationOriginTypeIdList.middleEast = {};
                    $scope.info.urlFieldDonationOriginTypeIdList.oceania = {};


                    $scope.info.urlFieldInvoiceTypeId = {};

                    $scope.info.urlFieldInvoiceSendingTypeIdList = {};
                    $scope.info.urlFieldInvoiceSendingTypeIdList.value = [];
                    $scope.info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice = {};
                    $scope.info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice = {};

                    $scope.info.proofOfPaymentInfo = {};
                    $scope.info.monthlySaleAmount = {};
                    $scope.info.urlFieldRecurringBillingTypeId = {};

                };

                $scope.resourceInit = function () {


                    $scope.resource = {
                        "introductionSection": { "title": "Introduction" },
                        "donationSection": { "title": "Donation Revenue Details" },
                        "productInfoSection": { "title": "Product Information" },
                        "salesInfoSection": { "title": "Sales Information" },
                        "customerRelationsSection": { "title": "Customer Relations" },
                        "submitDocumentsSection": { "title": "Submit Documents" },
                        "isSite": { "title": "Do you have a website for this business?" },
                        "isSiteCheck1": { "title": "Yes" },
                        "isSiteCheck2": { "title": "No" },
                        "url": { "title": "Please provide your website address:" },
                        "url": { "placeholder": "www.example.com/yourwebsiteaddress" },
                        "urlForDonation": { "title": "Please enter the third-party website URL you want to add buttons to:" },
                        "urlMessage1": { "title": "Provides Donate Now buttons that can be placed on your website or a third-party website you submit for review." },
                        "urlMessage2": { "title": "Selecting any of these options gives you access to all payment buttons, including Donate Now buttons." },
                        "noBusinessModel": { "title": "Does this website follow the same business model providing the same product/service as a previously submitted site?" },
                        "noBusinessModelCheck1": { "title": "Yes" },
                        "noBusinessModelCheck2": { "title": "No" },
                        "businessModel": { "title": "You can pre-fill answers from a previously submitted Website Review:" },
                        "revenueGenerationMethod": { "title": "What is the purpose of your website?" },
                        "revenueGenerationMethodCheck1": { "title": "Placing 'Donate now' buttons on third-party websites" },
                        "revenueGenerationMethodCheck2": { "title": "I sell products" },
                        "revenueGenerationMethodCheck3": { "title": "I offer services" },
                        "revenueGenerationMethodCheck4": { "title": "I sell products and offer services" },
                        "revenueGenerationMethodConfirmText": { "title": "Changing this response will clear any previously saved answers." },
                        "revenueGenerationMethodConfirmYesButtonText": { "title": "Proceed" },
                        "revenueGenerationMethodConfirmNoButtonText": { "title": "Cancel" },
                        "urlType": { "title": "Do you own and control the website?" },
                        "urlTypeCheck1": { "title": "Yes" },
                        "urlTypeCheck2": { "title": "No" },
                        "urlFieldMembersAreaTypeId": { "title": "Does your website have a members' area?" },
                        "urlFieldMembersAreaTypeIdCheck1": { "title": "Yes" },
                        "urlFieldMembersAreaTypeIdCheck2": { "title": "No" },
                        "membersAreaUrl": { "title":"Member's area URL","placeholder": "www.example.com/membersareaurlfdgdsg" },
                        "membersAreaDetails": { "title": "Please provide the necessary information to access the members' area:" },
                        "averagePrice": { "title": "What is the average product price (USD)?" },
                        "shippingCountryId": { "title": "Which country is your product shipped from?" },
                        "urlFieldProductDeliveryMethodTypeIdList": { "title": "How do you deliver the product?" },
                        "urlFieldProductDeliveryMethodTypeIdListCheck1": { "title": "Online" },
                        "urlFieldProductDeliveryMethodTypeIdListCheck2": { "title": "Regular Post" },
                        "urlFieldProductDeliveryMethodTypeIdListCheck3": { "title": "Registered Mail" },
                        "urlFieldProductDeliveryMethodTypeIdListCheck4": { "title": "In person" },
                        "urlFieldServiceProvisionMethodTypeIdList": { "title": "How do you provide the service?:" },
                        "urlFieldServiceProvisionMethodTypeIdListCheck1": { "title": "In person" },
                        "urlFieldServiceProvisionMethodTypeIdListCheck2": { "title": "Remotely" },
                        "productDeliveryDelayTime": { "title": "On average, how many days after the transaction is the product received by your customer?" },
                        "serviceProvisionDelayTime": { "title": "On average, how many days after the transaction is the service rendered to your customer?" },
                        "urlFieldProductSourceTypeId": { "title": "The product you are selling is:" },
                        "urlFieldProductSourceTypeIdCheck1": { "title": "Manufactured by you" },
                        "urlFieldProductSourceTypeIdCheck2": { "title": "Personal property" },
                        "urlFieldServiceSourceTypeId": { "title": "The service is provided by:" },
                        "urlFieldServiceSourceTypeIdCheck1": { "title": "You" },
                        "urlFieldServiceSourceTypeIdCheck2": { "title": "Third party" },
                        "serviceSourceThirdPartyInfo": { "title": "Please provide third party description and role in providing service" },
                        "promotionInfo": { "title": "How do you promote your product/service?" },
                        "urlFieldDiscountTypeId": { "title": "Do you ever offer discounts or promotional deals?" },
                        "urlFieldDiscountTypeIdCheck1": { "title": "Yes" },
                        "urlFieldDiscountTypeIdCheck2": { "title": "No" },
                        "urlFieldSupplierTypeId": { "title": "Are you an authorized distributor/supplier?" },
                        "urlFieldSupplierTypeIdCheck1": { "title": "Yes" },
                        "urlFieldSupplierTypeIdCheck2": { "title": "No" },
                        "urlFieldSupplierTypeIdMessage": { "title": "Please Provide supporting documents at the end of the questionnaire" },
                        "customerSupportInfo": { "title": "How do customers contact you? Please list all methods:" },
                        "urlFieldSaleOriginTypeIdList": { "title": "Where do most of your sales originate from:" },
                        "urlFieldSaleOriginTypeIdListCheck1": { "title": "North America" },
                        "urlFieldSaleOriginTypeIdListCheck2": { "title": "South America" },
                        "urlFieldSaleOriginTypeIdListCheck3": { "title": "Europe" },
                        "urlFieldSaleOriginTypeIdListCheck4": { "title": "Eastern Europe" },
                        "urlFieldSaleOriginTypeIdListCheck5": { "title": "Africa" },
                        "urlFieldSaleOriginTypeIdListCheck6": { "title": "Asia" },
                        "urlFieldSaleOriginTypeIdListCheck7": { "title": "Middle East" },
                        "urlFieldSaleOriginTypeIdListCheck8": { "title": "Oceania" },
                        "urlFieldInvoiceTypeId": { "title": "Do you provide an invoice for the sale?" },
                        "urlFieldInvoiceTypeIdCheck1": { "title": "Yes" },
                        "urlFieldInvoiceTypeIdCheck2": { "title": "No" },
                        "urlFieldInvoiceSendingTypeIdList": { "title": "How will you send an invoice?" },
                        "urlFieldInvoiceSendingTypeIdListCheck1": { "title": "Payza email invoice" },
                        "urlFieldInvoiceSendingTypeIdListCheck2": { "title": "Mail personalized invoice" },
                        "proofOfPaymentInfo": { "title": "What proof of payment is provided to the customer?" },
                        "monthlySaleAmount": { "title": "What is the estimated monthly sales amount you want to process through Payza (USD)?" },
                        "urlFieldRecurringBillingTypeId": { "title": "Do you offer recurring billing?" },
                        "urlFieldRecurringBillingTypeIdCheck1": { "title": "Yes" },
                        "urlFieldRecurringBillingTypeIdCheck2": { "title": "No" },
                        "customerSupportPhoneNumber": { "title": "Please provide your business's customer support phone number:" },
                        "customerSupportEmailAddress": { "title": "Please provide your business's customer support email address:" },
                        "returnRefundInfo": { "title": "How do you process returns, refunds and disputes?" },
                        "termsOfService": { "title": "What are your terms of service?" },
                        "termsOfServiceLocation": { "title": "Where are your terms of service located?" },
                        "refundPolicy": { "title": "What is your refund policy?" },
                        "refundPolicyLocation": { "title": "Where is your refund policy located?" },
                        "fraudPrevention": { "title": "What are your fraud prevention policies?" },
                        "urlFieldDonorContactTypeId": { "title": "Do donors contact you?" },
                        "urlFieldDonorContactTypeIdCheck1": { "title": "Yes" },
                        "urlFieldDonorContactTypeIdCheck2": { "title": "No" },
                        "donorContactInfo": { "title": "How do donors contact you? Please list all methods:" },
                        "averageDonationAmount": { "title": "What is the average donation amount (USD)?" },
                        "urlFieldRecurringDonationTypeId": { "title": "Do you offer recurring donations?" },
                        "urlFieldRecurringDonationTypeIdCheck1": { "title": "Yes" },
                        "urlFieldRecurringDonationTypeIdCheck2": { "title": "No" },
                        "monthlyDonationAmount": { "title": "What is the estimated monthly donation amount you want to process through Payza (USD)?" },
                        "urlFieldDonationOriginTypeIdList": { "title": "Where do most of your donations originate from?" },
                        "urlFieldDonationOriginTypeIdListCheck1": { "title": "North America" },
                        "urlFieldDonationOriginTypeIdListCheck2": { "title": "South America" },
                        "urlFieldDonationOriginTypeIdListCheck3": { "title": "Europe" },
                        "urlFieldDonationOriginTypeIdListCheck4": { "title": "Eastern Europe" },
                        "urlFieldDonationOriginTypeIdListCheck5": { "title": "Africa" },
                        "urlFieldDonationOriginTypeIdListCheck6": { "title": "Asia" },
                        "urlFieldDonationOriginTypeIdListCheck7": { "title": "Middle East" },
                        "urlFieldDonationOriginTypeIdListCheck8": { "title": "Oceania" },
                        "numberInvalidErrorMessage": { "title": "Please enter a valid number." },
                        "noBusinessModelForCharity": { "title": "Does this website provide the same product/service, and/or does it fall under the same charity business model as a previously submitted website?" },
                        "revenueGenerationMethodForCharity": { "title": "How do you raise donations for charity?" },
                        "revenueGenerationMethodCheck1ForCharity": { "title": "By collecting donations" },
                        "revenueGenerationMethodCheck2ForCharity": { "title": "By selling products" },
                        "revenueGenerationMethodCheck3ForCharity": { "title": "By offering services" },
                        "revenueGenerationMethodCheck4ForCharity": { "title": "By selling products and offering services" }
                    }

                };

                $scope.htmlInit = function () {

                    $scope.info.idOfRecord.value = document.getElementById('id-of-page').value;

                    $("#submitDocTitle+fieldset").append($('#checkout-document-upload-form'));

                    $('#checkout-document-upload-form').css("display", "block");

                };

                $scope.convertDataIntoAngularFormat = function () {

                    //$scope.introductionSection.serverValid = ($scope.info.isValidSection1 == null) ? "grey" : $scope.info.isValidSection1;
                    //$scope.donationRevenueDetails.serverValid = ($scope.info.isValidSectionDonations6 == null) ? "grey" : $scope.info.isValidSectionDonations6;
                    //$scope.productInformation.serverValid = ($scope.info.isValidSection3 == null) ? "grey" : $scope.info.isValidSection3;
                    //$scope.salesInformation.serverValid = ($scope.info.isValidSection4 == null) ? "grey" : $scope.info.isValidSection4;
                    //$scope.customerRelations.serverValid = ($scope.info.isValidSection5 == null) ? "grey" : $scope.info.isValidSection5;

                    $scope.introductionSection.serverValid = $scope.info.isValidSection1;
                    $scope.donationRevenueDetails.serverValid = $scope.info.isValidSectionDonations6;
                    $scope.productInformation.serverValid = $scope.info.isValidSection3;
                    $scope.salesInformation.serverValid = $scope.info.isValidSection4;
                    $scope.customerRelations.serverValid = $scope.info.isValidSection5;

                    var objName;
                    for (var key in $scope.info) {
                        if (key !== "generalErrorMessages") {
                            objName = "$scope.info." + key;
                            if ($scope.info[key] === null) { $scope.info[key] = {}; }
                            for (var key2 in eval(objName)) {
                                var valName = objName + '["' + key2 + '"]';
                                if (eval(valName) === null) { valName = {}; }
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
                            case 4: $scope.info.urlFieldSaleOriginTypeIdList.easternEurope.checked = 1; $scope.info.urlFieldSaleOriginTypeIdList.easternEurope.value = 4; break;
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
                    $scope.info.urlFieldDonationOriginTypeIdList.easternEurope = {};
                    $scope.info.urlFieldDonationOriginTypeIdList.africa = {};
                    $scope.info.urlFieldDonationOriginTypeIdList.asia = {};
                    $scope.info.urlFieldDonationOriginTypeIdList.middleEast = {};
                    $scope.info.urlFieldDonationOriginTypeIdList.oceania = {};

                    for (var i in $scope.info.urlFieldDonationOriginTypeIdList.value) {
                        switch ($scope.info.urlFieldDonationOriginTypeIdList.value[i]) {
                            case 1: $scope.info.urlFieldDonationOriginTypeIdList.northAmerica.checked = 1; $scope.info.urlFieldDonationOriginTypeIdList.northAmerica.value = 1; break;
                            case 2: $scope.info.urlFieldDonationOriginTypeIdList.southAmerica.checked = 1; $scope.info.urlFieldDonationOriginTypeIdList.southAmerica.value = 2; break;
                            case 3: $scope.info.urlFieldDonationOriginTypeIdList.westernEurope.checked = 1; $scope.info.urlFieldDonationOriginTypeIdList.westernEurope.value = 3; break;
                            case 4: $scope.info.urlFieldDonationOriginTypeIdList.easternEurope.checked = 1; $scope.info.urlFieldDonationOriginTypeIdList.easternEurope.value = 4; break;
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

                    var elementForShowHide = $("#" + sectionIdForShowHide + "+fieldset");

                    $("fieldset:not(#" + sectionIdForShowHide + "+fieldset):not(:last)").slideUp();

                    elementForShowHide.slideDown();


                    switch (sectionIdForShowHide) {
                        case "introductionSectionTitle": $scope.info.currentSection = 1; break;
                        case "productInformationTitle": $scope.info.currentSection = 2; break;
                        case "salesInformationTitle": $scope.info.currentSection = 3; break;
                        case "customerRelationsTitle": $scope.info.currentSection = 4; break;
                        case "submitDocTitle": $scope.info.currentSection = 5; break;
                        case "donationRevenueDetailsTitle": $scope.info.currentSection = 6; break;
                    }
                    $('html, body').animate({ scrollTop: 340 }, 'fast');
                    $scope.hideLoadingIndicator();

                    $(".opened").removeClass("opened");
                    $("#" + sectionIdForShowHide).addClass("opened");

                };

                $scope.turnConfirmBusinessmodelVisibility = function () { $scope.confirmBusinessmodelVisibility = 1; }

                $scope.convertBussinessModelToAngular = function () {

                    for (var i in $scope.previouslySubmittedWebsites) {

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

                        if ($scope.previouslySubmittedWebsites[i].data.length != 0) {
                            for (var ii in $scope.previouslySubmittedWebsites[i].data) {
                                $scope.previouslySubmittedWebsites[i].data[ii].isEnabled = ($scope.previouslySubmittedWebsites[i].id == $scope.info.revenueGenerationMethod.value) ? true : false;
                            }
                        } else {
                            $scope.previouslySubmittedWebsites[i].data.push({ name: "No data" });
                        }
                    }
                };

                $scope.prepareDataForServer = function () {

                    if ($scope.info.urlQuestionnaireTypeId !== null) {
                        if (typeof $scope.info.urlQuestionnaireTypeId.value !== 'undefined') { $scope.info.urlQuestionnaireTypeId.value = parseInt($scope.info.urlQuestionnaireTypeId.value); }
                    }

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


                    if ($scope.info.urlFieldDonorContactTypeId !== null) {
                        if (typeof $scope.info.urlFieldDonorContactTypeId.value !== 'undefined') { $scope.info.urlFieldDonorContactTypeId.value = parseInt($scope.info.urlFieldDonorContactTypeId.value); }
                    }
                    if ($scope.info.averageDonationAmount !== null) {
                        if (typeof $scope.info.averageDonationAmount.value !== 'undefined') { $scope.info.averageDonationAmount.value = parseFloat($scope.info.averageDonationAmount.value); }
                    }
                    if ($scope.info.urlFieldRecurringDonationTypeId !== null) {
                        if (typeof $scope.info.urlFieldRecurringDonationTypeId.value !== 'undefined') { $scope.info.urlFieldRecurringDonationTypeId.value = parseInt($scope.info.urlFieldRecurringDonationTypeId.value); }
                    }
                    if ($scope.info.monthlyDonationAmount !== null) {
                        if (typeof $scope.info.monthlyDonationAmount.value !== 'undefined') { $scope.info.monthlyDonationAmount.value = parseFloat($scope.info.monthlyDonationAmount.value); }
                    }
                    //if ($scope.info.urlFieldDiscountTypeId !== null) {
                    //    if (typeof $scope.info.urlFieldDiscountTypeId.value !== 'undefined') { $scope.info.urlFieldDiscountTypeId.value = parseInt($scope.info.urlFieldDiscountTypeId.value); }
                    //}


                    if ($scope.info.urlFieldSaleOriginTypeIdList !== null) {
                        $scope.info.urlFieldSaleOriginTypeIdList.value = [];

                        if (typeof $scope.info.urlFieldSaleOriginTypeIdList.northAmerica.value !== 'undefined' && ($scope.info.urlFieldSaleOriginTypeIdList.northAmerica.value)) { $scope.info.urlFieldSaleOriginTypeIdList.value.push(parseInt($scope.info.urlFieldSaleOriginTypeIdList.northAmerica.value)); }
                        if (typeof $scope.info.urlFieldSaleOriginTypeIdList.southAmerica.value !== 'undefined' && ($scope.info.urlFieldSaleOriginTypeIdList.southAmerica.value)) { $scope.info.urlFieldSaleOriginTypeIdList.value.push(parseInt($scope.info.urlFieldSaleOriginTypeIdList.southAmerica.value)); }
                        if (typeof $scope.info.urlFieldSaleOriginTypeIdList.westernEurope.value !== 'undefined' && ($scope.info.urlFieldSaleOriginTypeIdList.westernEurope.value)) { $scope.info.urlFieldSaleOriginTypeIdList.value.push(parseInt($scope.info.urlFieldSaleOriginTypeIdList.westernEurope.value)); }
                        if (typeof $scope.info.urlFieldSaleOriginTypeIdList.easternEurope.value !== 'undefined' && ($scope.info.urlFieldSaleOriginTypeIdList.easternEurope.value)) { $scope.info.urlFieldSaleOriginTypeIdList.value.push(parseInt($scope.info.urlFieldSaleOriginTypeIdList.easternEurope.value)); }
                        if (typeof $scope.info.urlFieldSaleOriginTypeIdList.africa.value !== 'undefined' && ($scope.info.urlFieldSaleOriginTypeIdList.africa.value)) { $scope.info.urlFieldSaleOriginTypeIdList.value.push(parseInt($scope.info.urlFieldSaleOriginTypeIdList.africa.value)); }
                        if (typeof $scope.info.urlFieldSaleOriginTypeIdList.asia.value !== 'undefined' && ($scope.info.urlFieldSaleOriginTypeIdList.asia.value)) { $scope.info.urlFieldSaleOriginTypeIdList.value.push(parseInt($scope.info.urlFieldSaleOriginTypeIdList.asia.value)); }
                        if (typeof $scope.info.urlFieldSaleOriginTypeIdList.middleEast.value !== 'undefined' && ($scope.info.urlFieldSaleOriginTypeIdList.middleEast.value)) { $scope.info.urlFieldSaleOriginTypeIdList.value.push(parseInt($scope.info.urlFieldSaleOriginTypeIdList.middleEast.value)); }
                        if (typeof $scope.info.urlFieldSaleOriginTypeIdList.oceania.value !== 'undefined' && ($scope.info.urlFieldSaleOriginTypeIdList.oceania.value)) { $scope.info.urlFieldSaleOriginTypeIdList.value.push(parseInt($scope.info.urlFieldSaleOriginTypeIdList.oceania.value)); }

                        delete $scope.info.urlFieldSaleOriginTypeIdList.northAmerica;
                        delete $scope.info.urlFieldSaleOriginTypeIdList.southAmerica;
                        delete $scope.info.urlFieldSaleOriginTypeIdList.westernEurope;
                        delete $scope.info.urlFieldSaleOriginTypeIdList.easternEurope;
                        delete $scope.info.urlFieldSaleOriginTypeIdList.africa;
                        delete $scope.info.urlFieldSaleOriginTypeIdList.asia;
                        delete $scope.info.urlFieldSaleOriginTypeIdList.middleEast;
                        delete $scope.info.urlFieldSaleOriginTypeIdList.oceania;
                    }

                    if ($scope.info.urlFieldDonationOriginTypeIdList !== null) {

                        $scope.info.urlFieldDonationOriginTypeIdList.value = [];

                        if (typeof $scope.info.urlFieldDonationOriginTypeIdList.northAmerica.value !== 'undefined' && ($scope.info.urlFieldDonationOriginTypeIdList.northAmerica.value)) { $scope.info.urlFieldDonationOriginTypeIdList.value.push(parseInt($scope.info.urlFieldDonationOriginTypeIdList.northAmerica.value)); }
                        if (typeof $scope.info.urlFieldDonationOriginTypeIdList.southAmerica.value !== 'undefined' && ($scope.info.urlFieldDonationOriginTypeIdList.southAmerica.value)) { $scope.info.urlFieldDonationOriginTypeIdList.value.push(parseInt($scope.info.urlFieldDonationOriginTypeIdList.southAmerica.value)); }
                        if (typeof $scope.info.urlFieldDonationOriginTypeIdList.westernEurope.value !== 'undefined' && ($scope.info.urlFieldDonationOriginTypeIdList.westernEurope.value)) { $scope.info.urlFieldDonationOriginTypeIdList.value.push(parseInt($scope.info.urlFieldDonationOriginTypeIdList.westernEurope.value)); }
                        if (typeof $scope.info.urlFieldDonationOriginTypeIdList.easternEurope.value !== 'undefined' && ($scope.info.urlFieldDonationOriginTypeIdList.easternEurope.value)) { $scope.info.urlFieldDonationOriginTypeIdList.value.push(parseInt($scope.info.urlFieldDonationOriginTypeIdList.easternEurope.value)); }
                        if (typeof $scope.info.urlFieldDonationOriginTypeIdList.africa.value !== 'undefined' && ($scope.info.urlFieldDonationOriginTypeIdList.africa.value)) { $scope.info.urlFieldDonationOriginTypeIdList.value.push(parseInt($scope.info.urlFieldDonationOriginTypeIdList.africa.value)); }
                        if (typeof $scope.info.urlFieldDonationOriginTypeIdList.asia.value !== 'undefined' && ($scope.info.urlFieldDonationOriginTypeIdList.asia.value)) { $scope.info.urlFieldDonationOriginTypeIdList.value.push(parseInt($scope.info.urlFieldDonationOriginTypeIdList.asia.value)); }
                        if (typeof $scope.info.urlFieldDonationOriginTypeIdList.middleEast.value !== 'undefined' && ($scope.info.urlFieldDonationOriginTypeIdList.middleEast.value)) { $scope.info.urlFieldDonationOriginTypeIdList.value.push(parseInt($scope.info.urlFieldDonationOriginTypeIdList.middleEast.value)); }
                        if (typeof $scope.info.urlFieldDonationOriginTypeIdList.oceania.value !== 'undefined' && ($scope.info.urlFieldDonationOriginTypeIdList.oceania.value)) { $scope.info.urlFieldDonationOriginTypeIdList.value.push(parseInt($scope.info.urlFieldDonationOriginTypeIdList.oceania.value)); }

                        delete $scope.info.urlFieldDonationOriginTypeIdList.northAmerica;
                        delete $scope.info.urlFieldDonationOriginTypeIdList.southAmerica;
                        delete $scope.info.urlFieldDonationOriginTypeIdList.westernEurope;
                        delete $scope.info.urlFieldDonationOriginTypeIdList.easternEurope;
                        delete $scope.info.urlFieldDonationOriginTypeIdList.africa;
                        delete $scope.info.urlFieldDonationOriginTypeIdList.asia;
                        delete $scope.info.urlFieldDonationOriginTypeIdList.middleEast;
                        delete $scope.info.urlFieldDonationOriginTypeIdList.oceania;

                    }

                    if ($scope.info.urlFieldPromotionMethodTypeIdList !== null) {

                        l("$scope.info.urlFieldPromotionMethodTypeIdList", $scope.info.urlFieldPromotionMethodTypeIdList)

                        $scope.info.urlFieldPromotionMethodTypeIdList.value = [];

                        if (typeof $scope.info.urlFieldPromotionMethodTypeIdList.email.value !== 'undefined' && ($scope.info.urlFieldPromotionMethodTypeIdList.email.value)) { $scope.info.urlFieldPromotionMethodTypeIdList.value.push(parseInt($scope.info.urlFieldPromotionMethodTypeIdList.email.value)); }
                        if (typeof $scope.info.urlFieldPromotionMethodTypeIdList.referral.value !== 'undefined' && ($scope.info.urlFieldPromotionMethodTypeIdList.referral.value)) { $scope.info.urlFieldPromotionMethodTypeIdList.value.push(parseInt($scope.info.urlFieldPromotionMethodTypeIdList.referral.value)); }
                        if (typeof $scope.info.urlFieldPromotionMethodTypeIdList.searchEngine.value !== 'undefined' && ($scope.info.urlFieldPromotionMethodTypeIdList.searchEngine.value)) { $scope.info.urlFieldPromotionMethodTypeIdList.value.push(parseInt($scope.info.urlFieldPromotionMethodTypeIdList.searchEngine.value)); }
                        if (typeof $scope.info.urlFieldPromotionMethodTypeIdList.regularMail.value !== 'undefined' && ($scope.info.urlFieldPromotionMethodTypeIdList.regularMail.value)) { $scope.info.urlFieldPromotionMethodTypeIdList.value.push(parseInt($scope.info.urlFieldPromotionMethodTypeIdList.regularMail.value)); }
                        if (typeof $scope.info.urlFieldPromotionMethodTypeIdList.social.value !== 'undefined' && ($scope.info.urlFieldPromotionMethodTypeIdList.social.value)) { $scope.info.urlFieldPromotionMethodTypeIdList.value.push(parseInt($scope.info.urlFieldPromotionMethodTypeIdList.social.value)); }
                        if (typeof $scope.info.urlFieldPromotionMethodTypeIdList.print.value !== 'undefined' && ($scope.info.urlFieldPromotionMethodTypeIdList.print.value)) { $scope.info.urlFieldPromotionMethodTypeIdList.value.push(parseInt($scope.info.urlFieldPromotionMethodTypeIdList.print.value)); }
                        if (typeof $scope.info.urlFieldPromotionMethodTypeIdList.affiliate.value !== 'undefined' && ($scope.info.urlFieldPromotionMethodTypeIdList.affiliate.value)) { $scope.info.urlFieldPromotionMethodTypeIdList.value.push(parseInt($scope.info.urlFieldPromotionMethodTypeIdList.affiliate.value)); }
                        if (typeof $scope.info.urlFieldPromotionMethodTypeIdList.televisionAndRadio.value !== 'undefined' && ($scope.info.urlFieldPromotionMethodTypeIdList.televisionAndRadio.value)) { $scope.info.urlFieldPromotionMethodTypeIdList.value.push(parseInt($scope.info.urlFieldPromotionMethodTypeIdList.televisionAndRadio.value)); }
                        if (typeof $scope.info.urlFieldPromotionMethodTypeIdList.webBanner.value !== 'undefined' && ($scope.info.urlFieldPromotionMethodTypeIdList.webBanner.value)) { $scope.info.urlFieldPromotionMethodTypeIdList.value.push(parseInt($scope.info.urlFieldPromotionMethodTypeIdList.webBanner.value)); }

                        delete $scope.info.urlFieldPromotionMethodTypeIdList.email;
                        delete $scope.info.urlFieldPromotionMethodTypeIdList.referral;
                        delete $scope.info.urlFieldPromotionMethodTypeIdList.searchEngine;
                        delete $scope.info.urlFieldPromotionMethodTypeIdList.regularMail;
                        delete $scope.info.urlFieldPromotionMethodTypeIdList.social;
                        delete $scope.info.urlFieldPromotionMethodTypeIdList.print;
                        delete $scope.info.urlFieldPromotionMethodTypeIdList.affiliate;
                        delete $scope.info.urlFieldPromotionMethodTypeIdList.televisionAndRadio;
                        delete $scope.info.urlFieldPromotionMethodTypeIdList.webBanner;
                    }

                    if ($scope.info.urlFieldCustomerContactMethodTypeIdList !== null) {

                        $scope.info.urlFieldCustomerContactMethodTypeIdList.value = [];

                        if (typeof $scope.info.urlFieldCustomerContactMethodTypeIdList.email.value !== 'undefined' && ($scope.info.urlFieldCustomerContactMethodTypeIdList.email.value)) { $scope.info.urlFieldCustomerContactMethodTypeIdList.value.push(parseInt($scope.info.urlFieldCustomerContactMethodTypeIdList.email.value)); }
                        if (typeof $scope.info.urlFieldCustomerContactMethodTypeIdList.phoneAndTelecomm.value !== 'undefined' && ($scope.info.urlFieldCustomerContactMethodTypeIdList.phoneAndTelecomm.value)) { $scope.info.urlFieldCustomerContactMethodTypeIdList.value.push(parseInt($scope.info.urlFieldCustomerContactMethodTypeIdList.phoneAndTelecomm.value)); }
                        if (typeof $scope.info.urlFieldCustomerContactMethodTypeIdList.social.value !== 'undefined' && ($scope.info.urlFieldCustomerContactMethodTypeIdList.social.value)) { $scope.info.urlFieldCustomerContactMethodTypeIdList.value.push(parseInt($scope.info.urlFieldCustomerContactMethodTypeIdList.social.value)); }
                        if (typeof $scope.info.urlFieldCustomerContactMethodTypeIdList.regularMail.value !== 'undefined' && ($scope.info.urlFieldCustomerContactMethodTypeIdList.regularMail.value)) { $scope.info.urlFieldCustomerContactMethodTypeIdList.value.push(parseInt($scope.info.urlFieldCustomerContactMethodTypeIdList.regularMail.value)); }
                        if (typeof $scope.info.urlFieldCustomerContactMethodTypeIdList.inPerson.value !== 'undefined' && ($scope.info.urlFieldCustomerContactMethodTypeIdList.inPerson.value)) { $scope.info.urlFieldCustomerContactMethodTypeIdList.value.push(parseInt($scope.info.urlFieldCustomerContactMethodTypeIdList.inPerson.value)); }
                        if (typeof $scope.info.urlFieldCustomerContactMethodTypeIdList.forumAndCommunity.value !== 'undefined' && ($scope.info.urlFieldCustomerContactMethodTypeIdList.forumAndCommunity.value)) { $scope.info.urlFieldCustomerContactMethodTypeIdList.value.push(parseInt($scope.info.urlFieldCustomerContactMethodTypeIdList.forumAndCommunity.value)); }
                        if (typeof $scope.info.urlFieldCustomerContactMethodTypeIdList.chatService.value !== 'undefined' && ($scope.info.urlFieldCustomerContactMethodTypeIdList.chatService.value)) { $scope.info.urlFieldCustomerContactMethodTypeIdList.value.push(parseInt($scope.info.urlFieldCustomerContactMethodTypeIdList.chatService.value)); }

                        delete $scope.info.urlFieldCustomerContactMethodTypeIdList.email;
                        delete $scope.info.urlFieldCustomerContactMethodTypeIdList.phoneAndTelecomm;
                        delete $scope.info.urlFieldCustomerContactMethodTypeIdList.social;
                        delete $scope.info.urlFieldCustomerContactMethodTypeIdList.regularMail;
                        delete $scope.info.urlFieldCustomerContactMethodTypeIdList.inPerson;
                        delete $scope.info.urlFieldCustomerContactMethodTypeIdList.forumAndCommunity;
                        delete $scope.info.urlFieldCustomerContactMethodTypeIdList.chatService;
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

                $scope.hideLoadingIndicator = function () {
                    $("#loading-indicator").css("display", "none");
                    $(".merchant-services").css("display", "block");
                };

                $scope.generalErrorMessages = function (data, response) {

                    $scope.info.generalErrorMessages = (typeof data.Message != "undefined") ? data.Message + "/n" : '' + (typeof data.errorMessage != "undefined") ? data.errorMessage : '';

                    switch (response) {
                        case 401:
                            window.location.href = '../Logout.aspx';
                            break;
                    }

                };

                $scope.revenueGenerationMethodConfirm = function (isConfirmed) {
                    if (isConfirmed == true) {
                        $scope.revenueGenerationMethodPreviousValue = $scope.info.revenueGenerationMethod.value;
                    }
                    else {
                        $scope.info.revenueGenerationMethod.value = $scope.revenueGenerationMethodPreviousValue;
                    }
                };

                $scope.getPreviousWebsiteReviewQuestionnaireConfirm = function (isConfirmed) {

                    if (isConfirmed == true) {
                        $scope.businessModelPreviousValue = $scope.info.businessModel.value;
                        $scope.getPreviousWebsiteReviewQuestionnaire($scope.info.businessModel.value);
                    }
                    else {
                        $scope.info.businessModel.value = $scope.businessModelPreviousValue;
                    }
                };

                $scope.getPreviousWebsiteReviewQuestionnaire = function (idOfRecord) {
                    $scope.info.previousUrlsId.value = idOfRecord;
                    $("#loading-indicator-lightbox").css("display", "block");

                    $http.get("../JSON/WebsiteApi/GetPreviousWebsiteQuestionnaire/" + idOfRecord)
                        .success(function (data) {

                            $scope.updateObjectProperty(data, $scope.info);

                            $scope.info.isValidSection2 = true;
                            $scope.info.isValidSection3 = true;

                            $scope.convertDataIntoAngularFormat();

                            $scope.info.currentSection = document.getElementById('id-of-current-section').value;

                            $scope.revenueGenerationMethodPreviousValue = $scope.info.revenueGenerationMethod.value;

                        })
                        .error(function (data, response) {
                            $scope.generalErrorMessages(data, response);
                            $scope.hideLoadingIndicator();
                        })
                };

                $scope.saveForm = function (sectionTitle) {
                    var functionArgumentsLength = arguments.length;

                    $("#loading-indicator-lightbox").css("display", "block");
                    if ($scope.info.currentSection === null || $scope.info.currentSection === undefined || $scope.info.currentSection === '') { $scope.info.currentSection = 1; }

                    $scope.prepareDataForServer();
                    $http({
                        method: 'POST',
                        url: '../JSON/WebsiteApi/SaveWebsiteQuestionnaire',
                        data: $scope.info
                    }).
                        success(function (response) {

                            $scope.info = response;

                            $scope.convertDataIntoAngularFormat();
                            $("#loading-indicator-lightbox").css("display", "none");
                            if (functionArgumentsLength > 0) {
                                $scope.openSection(sectionTitle);
                            }
                        }).
                        error(function (data, response) {
                            $scope.generalErrorMessages(data, response);
                            $("#loading-indicator-lightbox").css("display", "none");
                        });
                };

                $scope.submitForm = function (formName, sectionForShow) {
                    $("#loading-indicator-lightbox").css("display", "block");

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
                                    $("#" + formName.$name + "Title+fieldset").slideUp();
                                    $("#" + sectionForShow + "+fieldset").slideDown();
                                }
                            }

                            $('html, body').animate({ scrollTop: 340 }, 'fast');
                            $("#loading-indicator-lightbox").css("display", "none");

                            if ($scope.info.isValid !== false && sectionForShow == 5) {
                                window.location.href = '../Website/WebsiteAddEditResultRedirection.aspx'
                            }
                        }).
                        error(function (data, response) {
                            $scope.generalErrorMessages(data, response);
                            $("#loading-indicator-lightbox").css("display", "none");
                        });

                };

                $scope.objInit();

                $scope.resourceInit();

              //  $scope.htmlInit();

                data={"isValid":false,"isValidSection1":false,"isValidSectionDonations6":true,"isValidSection2":false,"isValidSection3":false,"isValidSection4":false,"isValidSection5":true,"generalErrorMessages":null,"currentSection":null,"idOfRecord":{"value":833,"errorMessage":null},"questionnaireMode":{"value":2,"errorMessage":null},"urlQuestionnaireTypeId":{"value":2,"errorMessage":null},"url":{"value":"payza-20131028_1609.comxasf","errorMessage":null},"urlType":{"value":1,"errorMessage":null},"revenueGenerationMethod":{"value":1,"errorMessage":null},"shippingCountryId":null,"fraudPrevention":{"value":"0890","errorMessage":null},"termsOfService":{"value":"789789789787","errorMessage":null},"termsOfServiceLocation":{"value":"payza-20131028_1609.comx/","errorMessage":null},"refundPolicy":{"value":"1234","errorMessage":null},"refundPolicyLocation":{"value":"payza-20131028_1609.comx/","errorMessage":null},"membersAreaDetails":{"value":"jklj","errorMessage":null},"urlFieldMembersAreaTypeId":{"value":1,"errorMessage":null},"membersAreaUrl":{"value":null,"errorMessage":null},"averagePrice":{"value":567,"errorMessage":null},"urlFieldProductDeliveryMethodTypeIdList":null,"urlFieldServiceProvisionMethodTypeIdList":{"value":[1],"errorMessage":null},"productDeliveryDelayTime":null,"serviceProvisionDelayTime":{"value":890,"errorMessage":null},"urlFieldProductSourceTypeId":null,"urlFieldServiceSourceTypeId":{"value":1,"errorMessage":null},"serviceSourceThirdPartyInfo":null,"urlFieldPromotionMethodTypeIdList":{"value":[],"errorMessage":null},"urlFieldDiscountTypeId":{"value":2,"errorMessage":null},"urlFieldSupplierTypeId":{"value":1,"errorMessage":null},"urlFieldCustomerContactMethodTypeIdList":{"value":[],"errorMessage":null},"urlFieldSaleOriginTypeIdList":{"value":[1,2],"errorMessage":null},"urlFieldInvoiceTypeId":{"value":2,"errorMessage":null},"urlFieldInvoiceSendingTypeIdList":null,"proofOfPaymentInfo":{"value":"iuo","errorMessage":null},"monthlySaleAmount":{"value":346236,"errorMessage":null},"urlFieldRecurringBillingTypeId":{"value":1,"errorMessage":null},"customerSupportPhoneNumber":{"value":"9999999999999999","errorMessage":null},"customerSupportEmailAddress":{"value":"12","errorMessage":null},"returnRefundInfo":{"value":"341234","errorMessage":null},"urlFieldDonorContactTypeId":null,"donorContactInfo":null,"averageDonationAmount":null,"urlFieldRecurringDonationTypeId":null,"monthlyDonationAmount":null,"urlFieldDonationOriginTypeIdList":null,"previousUrlsId":{"value":null,"errorMessage":null}}
//                $scope.updateObjectProperty(data, $scope.info);
//                $scope.convertDataIntoAngularFormat();

                $scope.info=data;
                
                console.log ("$scope.info>>>", $scope.info);

//                $scope.getCurrentCulture = function () {
//                    $http.get('../JSON/CultureApi/GetCurrentCulture')
//                        .success(function (data) {
//                            $scope.currentLanguage = data;
//                            $scope.getWebsiteReviewQuestionnaire();
//                        })
//                        .error(function (data, response) {
//                            $scope.generalErrorMessages(data, response);
//                            $scope.getWebsiteReviewQuestionnaire();
//                        });
//
//                };
//
//                $scope.getCurrentCulture();
//
//                $scope.getWebsiteReviewQuestionnaire = function () {
//
//                    $http.get("../JSON/WebsiteApi/GetWebsiteQuestionnaire/" + $scope.info.idOfRecord.value)
//                        .success(function (data) {
//
//                            $scope.updateObjectProperty(data, $scope.info);
//
//                            $scope.convertDataIntoAngularFormat();
//
//                            $scope.resourceInit();
//
//                            $scope.info.currentSection = document.getElementById('id-of-current-section').value;
//
//                            $scope.openSection($scope.info.currentSection);
//
//                            $scope.revenueGenerationMethodPreviousValue = $scope.info.revenueGenerationMethod.value;
//
//                            $scope.businessModelPreviousValue = $scope.info.businessModel.value;
//
//                            $scope.getShippingCountries();
//                        })
//                        .error(function (data, response) {
//
//                            $scope.resourceInit();
//
//                            $scope.getShippingCountries();
//
//                            $scope.info.currentSection = document.getElementById('id-of-current-section').value;
//
//                            $scope.openSection($scope.info.currentSection);
//
//                            $scope.revenueGenerationMethodPreviousValue = $scope.info.revenueGenerationMethod.value;
//
//                            $scope.businessModelPreviousValue = $scope.info.businessModel.value;
//
//
//                            $scope.generalErrorMessages(data, response);
//
//
//
//                        })
//                };
//
//                $scope.getShippingCountries = function () {
//                    $http.get('../JSON/WebsiteApi/GetShippingCountryList')
//                        .success(function (data) {
//                            $scope.shippingCountryId = {};
//                            $scope.shippingCountryId.source = {};
//
//                            for (var i in data) {
//                                $scope.shippingCountryId.source[data[i].name] = data[i].id;
//                            }
//
//                            $scope.getPreviouslySubmittedWebsites();
//
//                        })
//                        .error(function (data, response) {
//                            $scope.generalErrorMessages(data, response);
//                            $scope.hideLoadingIndicator();
//                        })
//                };
//
//                $scope.getPreviouslySubmittedWebsites = function () {
//
//                    $http.get('../JSON/WebsiteApi/GetWebsiteSummaryList/')
//                        .success(function (data) {
//
//                            $scope.previouslySubmittedWebsites = data;
//
//                            $scope.convertBussinessModelToAngular();
//
//                            $scope.$watch('introductionSection.$invalid', function (newValue, oldValue, $scope) {
//                                if (newValue !== oldValue) {
//                                    if ($scope.introductionSection.$invalid) {
//                                        $scope.introductionSection.serverValid = false;
//                                    }
//                                }
//
//                            });
//                            $scope.$watch('donationRevenueDetails.$invalid', function (newValue, oldValue, $scope) {
//                                if (newValue !== oldValue) {
//                                    if ($scope.donationRevenueDetails.$invalid) {
//                                        $scope.donationRevenueDetails.serverValid = false;
//                                    }
//                                }
//                            });
//                            $scope.$watch('productInformation.$invalid', function (newValue, oldValue, $scope) {
//                                if (newValue !== oldValue) {
//                                    if ($scope.productInformation.$invalid) {
//                                        $scope.productInformation.serverValid = false;
//                                    }
//                                }
//                            });
//                            $scope.$watch('salesInformation.$invalid', function (newValue, oldValue, $scope) {
//                                if (newValue !== oldValue) {
//                                    if ($scope.salesInformation.$invalid) {
//                                        $scope.salesInformation.serverValid = false;
//                                    }
//                                }
//                            });
//                            $scope.$watch('customerRelations.$invalid', function (newValue, oldValue, $scope) {
//                                if (newValue !== oldValue) {
//                                    if ($scope.customerRelations.$invalid) {
//                                        $scope.customerRelations.serverValid = false;
//                                    }
//                                }
//                            });
//
//                            $scope.$watch('info.revenueGenerationMethod.value', function (newValue, oldValue, $scope) {
//                                if (newValue !== oldValue) {
//                                    $scope.convertBussinessModelToAngular();
//                                }
//                            });
//
//                            $scope.hideLoadingIndicator();
//
//                            console.timeEnd("loading time");
//
//                        })
//                        .error(function (data, response) {
//
//                            $scope.generalErrorMessages(data, response);
//
//                            $scope.hideLoadingIndicator();
//
//                        })
//
//                };

            }
        };
    })
.controller('AnswersCheckoutCtrl', ['$scope', '$http', function ($scope, $http) {
}])




