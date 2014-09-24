MainWebApp.controller('SignupBox', function ($scope, $rootScope, $http, getJsonData, $q) {

    $rootScope.getProfileProgress = function () {
        getJsonData.getData('JSON/SignupApi/GetProfileProgress').success(function (data) {
            $rootScope.currentStep = data.currentStep;
            $rootScope.percentComplete = data.percentComplete;
            $rootScope.isAccountVerified = data.isAccountVerified;
            $rootScope.profileCompleted = data.profileCompleted;
            $rootScope.step1Completed = data.step1Completed;
            $rootScope.step2Completed = data.step2Completed;
            $rootScope.step3Completed = data.step3Completed;
            $rootScope.step35Completed = data.step35Completed;
            $rootScope.step4Completed = data.step4Completed;
            $rootScope.emailValidated = data.emailValidated;
            $rootScope.soleProprietorship = data.soleProprietorship;
            $rootScope.accountType = data.accountType;

            if ($rootScope.accountType != 1 && $rootScope.accountType != 5 && $rootScope.accountType != 10 && $rootScope.accountType != 18) $rootScope.profileCompleted = true;

            $rootScope.validationEmailAddress = data.emailAddress;

            $q.all([$rootScope.getCurrentCulturePromise]).then(function () {
                        $scope.resourceInit = function () {
                            if (typeof $rootScope.currentLanguage === 'undefined') { $rootScope.currentLanguage = '\"en-US\"'; }
                            switch ($rootScope.currentLanguage) {
                                case '\"en-US\"': var pathToResource = baseUrl + 'ng-resources/signup/complete_profile_setup_en.json'; break;
                                case '\"fr-CA\"': var pathToResource = baseUrl + 'ng-resources/signup/complete_profile_setup_fr.json'; break;
                            }
                            $http.get(pathToResource)
                                .success(function (data) { $rootScope.resourceForInit = data;})
                                .error(function (response) { $rootScope.generalErrorMessages(response); });                           
                        }();
                    });

            if ($rootScope.percentComplete == 0) $rootScope.currentStep = 0;
            if ($rootScope.percentComplete == 0 && $rootScope.accountType == 18) $rootScope.currentStep = 2;
            if ((window.location.pathname.split('/').pop() == "AccountOverview.aspx" || window.location.pathname.split('/').pop() == "FeatureApprovalChecklistCheckout.aspx") && $rootScope.percentComplete == 0) $rootScope.suggestionPopup = 1;
        }).error(function (response) { $rootScope.generalErrorMessages(response); });
    };
    $rootScope.getProfileProgress();

    $rootScope.currentStepVisibilityTurnOn = function () {
        $rootScope.suggestionPopup = 0;
        $rootScope.currentStepVisibility = 1;

        if ($rootScope.accountType === 1) $rootScope.trackElement('starter/profilesetup');
        else if ($rootScope.accountType === 5) $rootScope.trackElement('personal/profilesetup');
        else if ($rootScope.accountType === 10) $rootScope.trackElement('business/profilesetup');

    };
    $rootScope.currentStepVisibilityTurnOff = function () { $rootScope.currentStepVisibility = 0; }

    $rootScope.trackElement = function (url) {
        var finalUrl = '/virtual/newsignup/' + url;
        _gaq.push(['_trackPageview', finalUrl]);
    };

});
MainWebApp.controller('CompleteProfile', function ($scope, $rootScope, $timeout, $http, $q, getJsonData) {

    $scope.info = {};
    $rootScope.resource = {};
    $rootScope.isValid = true;

    function stepsAndSidebarMenuTemplateLoad() {
        var completeProfileScope = angular.element('.complete-profile-popup').scope();
        completeProfileScope.startLoadTemplate = true;
        completeProfileScope.$apply();
    }
    setTimeout(function () { stepsAndSidebarMenuTemplateLoad(); }, 0);

    $scope.daysYearsListInit = function () {
        $scope.daysList = {}; $scope.daysList.value = []; var day = {}; day.id = 0; day.name = $scope.resource.day.title;

        for (var i = 1; i <= 32; i++) {
            $scope.daysList.value[i - 1] = day;
            var day = {}; day.id = i; day.name = ('0' + i).slice(-2);
        }

        $scope.yearsList = {}; $scope.yearsList.value = []; var year = {}; year.id = 0; year.name = $scope.resource.year.title;
        for (var i = 1914; i <= 2000; i++) {
            $scope.yearsList.value[i - 1914] = year;
            var year = {}; year.id = i; year.name = i;
        }
    };

   $rootScope.getCurrentCulturePromise = $http.get(baseUrl + 'JSON/CultureApi/GetCurrentCulture')
            .success(function (data) {
                $rootScope.currentLanguage = data;
            })
            .error(function (response) {
                $rootScope.generalErrorMessages(response);
            });
    

    var deferredResource = $q.defer();
    $rootScope.resourcePromise = deferredResource.promise;


    $q.all([$rootScope.getCurrentCulturePromise]).then(function () {
        $http.get(baseUrl + 'JSON/CultureApi/GetCurrentCulture')
            .success(function (data) {
                if (typeof $rootScope.currentLanguage === 'undefined') { $rootScope.currentLanguage = '\"en-US\"'; }
                switch ($rootScope.currentLanguage) {
                    case '\"en-US\"':
                        var pathToResource = baseUrl + 'ng-resources/signup/complete_profile_setup2_en.json'; break;
                    case '\"fr-CA\"':
                        var pathToResource = baseUrl + 'ng-resources/signup/complete_profile_setup2_fr.json'; break;
                }

                $http.get(pathToResource)
                    .success(function (data) {
                        $scope.resource = data;
                        $scope.daysYearsListInit();
                        $scope.resource.type2 = $scope.resource.type1;
                        $scope.resource.type3 = $scope.resource.type1;
                        deferredResource.resolve();
                    })
                    .error(function (response) {
                        $rootScope.generalErrorMessages(response);
                    });
            })
            .error(function (response) {
                    $rootScope.generalErrorMessages(response);
    });
    });

    $scope.currentStepVisibilityTurnOff = function () {
        $rootScope.currentStepVisibility = false;
    };

    $rootScope.hideElements = function (id) {
        angular.element(id).slideUp(0);
    };
    $scope.showElements = function (id) {
        angular.element(id).slideDown(0);
    };
    $scope.slideDownAnimation = function (id) {
        angular.element(id).slideDown();
    };
    $scope.slideUpAnimation = function (id) {
        angular.element(id).slideUp();
    };

    $scope.scrollTop = function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    };
    $scope.generalErrorMessages = function (response) {

        if (typeof response !== "undefined") {

            if (typeof response.generalErrorMessages !== "undefined") {
                if (response.generalErrorMessages.errorMessage !== "" && response.generalErrorMessages.errorMessage !== null) {
                    $scope.resource.generalErrorMessages.errorMessage = response.generalErrorMessages.errorMessage;
                    angular.element(".generalErrorMessagesAlert").slideDown();
                }
            }
            if (typeof response.ExceptionMessage !== "undefined") {
                if (response.ExceptionMessage !== "" && response.ExceptionMessage !== null) {
                    $scope.resource.generalErrorMessages.errorMessage[0] = response.ExceptionMessage;
                    angular.element(".generalErrorMessagesAlert").slideDown();
                }
            }
        }

    };

    $scope.redirect = function (redirectUrl) { window.location.href = redirectUrl; };

    $scope.changeCurrentStep = function (nextSectionVisibility) {
        $rootScope.currentStep = nextSectionVisibility;
        $scope.scrollTop();
    };
    $scope.submitPersonalSignupData = function (url, formData, nextSectionVisibility) {

        $rootScope.loadingIndicatorLightboxVisible = true;
        $http({
            method: 'POST',
            url: baseUrl + url,
            data: formData
        }).
            success(function (response) {
                for (var key in response) {

                    if (response[key] !== null && response[key].errorMessage !== "" && response[key].errorMessage !== null) {

                    } else {
                        angular.element("#" + key + "Alert").slideUp();
                        angular.element("." + key + "Alert").slideUp();
                    }
                }

                $rootScope.isValid = response.isValid;

                if (response.accountIsDuplicate === true) {
                    $rootScope.currentStep = "undefined";
                    $rootScope.accountIsDuplicateVisibility = true;
                    $rootScope.currentStepVisibility = false;
                    $timeout(function () { $scope.redirect('https://www.payza.com/'); }, 30000);
                } else {

                    if (response.isValid === true) {
                        if (url == 'JSON/SignupApi/ResendValidationEmail') {
                            $scope.resource.resubmit.title = $scope.resource.resubmit2.title;
                            $scope.isValidationEmailSent = true;
                        }
                        switch (nextSectionVisibility) {
                            case 2: $rootScope.step1Completed = true; break;
                            case 3: $rootScope.step2Completed = true; break;
                            case 35: $rootScope.step3Completed = true; break;
                            case 36: $scope.contactFormCompleted = true;
                                nextSectionVisibility = 35;
                                var differentFormScope = angular.element('form[name="differentForm"]').scope();
                                $scope.submitPersonalSignupData('JSON/SignupApi/SubmitContactAddress', differentFormScope.differentForm.info, 4);

                                break;
                            case 4: $rootScope.step3Completed = true; $rootScope.step35Completed = true;
                                break;
                            case 5: $rootScope.step4Completed = true; break;
                        }

                        if (typeof nextSectionVisibility === "undefined") {

                            $rootScope.getProfileProgress();
                            $rootScope.currentStepVisibilityTurnOff();
                        } else {
                            $scope.changeCurrentStep(nextSectionVisibility);
                        }

                    } else {
                        if (nextSectionVisibility == 36) {
                            var differentFormScope = angular.element('form[name="differentForm"]').scope();
                            $scope.submitPersonalSignupData('JSON/SignupApi/SubmitContactAddress', differentFormScope.differentForm.info, 35);
                        }

                        for (var key in response) {
                            if (response[key] !== null && response[key].errorMessage !== "" && response[key].errorMessage !== null) {

                                if (typeof $scope.resource[key] === "undefined") $scope.resource[key] = {};

                                $scope.resource[key].errorMessage = response[key].errorMessage;
                                if (key !== "generalErrorMessages") {
                                    angular.element("#" + key + "Alert").slideDown();
                                } else {
                                    angular.element("." + key + "Alert").slideDown();
                                }
                            }
                        }
                    }
                }
                $rootScope.loadingIndicatorLightboxVisible = false;
            }).
            error(function (response) {
                $rootScope.loadingIndicatorLightboxVisible = false;
                if (typeof response.generalErrorMessages !== "undefined") {
                    if (response.generalErrorMessages.errorMessage !== "" && response.generalErrorMessages.errorMessage !== null) {
                        $scope.resource.generalErrorMessages.errorMessage = response.generalErrorMessages.errorMessage;
                        angular.element(".generalErrorMessagesAlert").slideDown();
                    }
                }
                if (typeof response.ExceptionMessage !== "undefined") {
                    if (response.ExceptionMessage !== "" && response.ExceptionMessage !== null) {
                        $scope.resource.generalErrorMessages.errorMessage[0] = response.ExceptionMessage;
                        angular.element(".generalErrorMessagesAlert").slideDown();
                    }
                }
            });
    };
});

MainWebApp.directive("step0Tour", [function () {
    return {
        restrict: "E",
        templateUrl: baseUrl + "ng-partials/modules/signup/Step0Tour.html",
        replace: true,
        transclude: true
    };
}]);
MainWebApp.directive("step1WorkDetails", [function () {
    return {
        restrict: "E",
        templateUrl: baseUrl + "ng-partials/modules/signup/Step1WorkDetails.html",
        replace: true,
        transclude: true,
        controller: function ($scope, $rootScope, $http, getJsonData) {

            $scope.getBusinessSubcategoryList = function (businessCategory, businessSubCategory) {

                getJsonData.getData('JSON/SignupApi/GetBusinessSubcategoryList?categoryId=' + businessCategory).success(function (data) {
                    $scope.businessSubcategoryList = data;
                    $scope.workDetailsForm.info.businessSubcategoryId.value = businessSubCategory;
                }).error(function (response) { $rootScope.generalErrorMessages(response); });
            };

            getJsonData.getData('JSON/SignupApi/GetBusinessCategoryList').success(function (data) {
                $scope.businessCategoryList = data;
            }).error(function (response) { $rootScope.generalErrorMessages(response); });

            getJsonData.getData('JSON/SignupApi/GetJobCategoryList').success(function (data) {
                $scope.jobCategoryList = data;
            }).error(function (response) { $rootScope.generalErrorMessages(response); });

            $scope.getOccupationList = function (jobCategoryId) {
                getJsonData.getData('JSON/SignupApi/GetOccupationList?jobCategoryId=' + jobCategoryId).success(function (data) {
                    $scope.occupationList = data;
                }).error(function (response) { $rootScope.generalErrorMessages(response); });
            };

            $scope.getWorkDetails = function () {
                getJsonData.getData('JSON/SignupApi/GetWorkDetails').success(function (data) {
                    if (typeof $scope.workdetailsForm === "undefined") $scope.workdetailsForm = {};
                    $scope.workDetailsForm = {};
                    $scope.workDetailsForm.info = {};

                    if ($scope.accountType == 10) {
                        $scope.workDetailsForm.info.businessCategoryId = data.businessCategoryId;
                        $scope.workDetailsForm.info.businessSubcategoryId = data.businessSubcategoryId;
                        $scope.getBusinessSubcategoryList(data.businessCategoryId.value, data.businessSubcategoryId.value);
                    } else {
                        $scope.workDetailsForm.info.jobCategoryId = data.jobCategoryId;
                        $scope.workDetailsForm.info.occupationId = data.occupationId;

                        $scope.getOccupationList(data.jobCategoryId.value);
                    }
                }).error(function (response) { $rootScope.generalErrorMessages(response); });
            };
            $scope.getWorkDetails();

        }
    };
}]);
MainWebApp.directive("step2Address", [function () {
    return {
        restrict: "E",
        templateUrl: baseUrl + "ng-partials/modules/signup/Step2Address.html",
        replace: true,
        transclude: true,

        controller: function ($scope, $rootScope, getJsonData) {
            $scope.getAccountRegionName = function () {
                getJsonData.getData('JSON/SignupApi/GetAccountRegionName').success(function (data) {
                    $scope.accountRegionName = data.regionName.value;
                    $scope.accountCountryFlag = "fl_" + data.countryFlag.value.toLowerCase();
                    $scope.accountCountryName = data.countryName.value;
                }).error(function (response) { $rootScope.generalErrorMessages(response); });
            }();

            $scope.getAddress = function () {
                getJsonData.getData('JSON/SignupApi/GetAddress').success(function (data) {

                    if (typeof $scope.addressForm === "undefined") $scope.addressForm = {};
                    $scope.addressForm.info = {};

                    $scope.addressForm.info.address1 = data.address1;
                    $scope.addressForm.info.address2 = data.address2;
                    $scope.addressForm.info.citizenshipCountryId = data.citizenshipCountryId;
                    $scope.addressForm.info.city = data.city;
                    $scope.addressForm.info.postalCode = data.postalCode;
                    $scope.addressForm.info.region = data.region;
                    $scope.addressForm.info.sameCountryCitizenship = data.sameCountryCitizenship;
                    $scope.addressForm.info.generalErrorMessages = data.generalErrorMessages;

                }).error(function (response) { $rootScope.generalErrorMessages(response); });
            };

            $scope.getRegionList = function () {
                getJsonData.getData('JSON/SignupApi/GetRegionList').success(function (data) {
                    $scope.regionList = data;
            $scope.getAddress();
                }).error(function (response) { $rootScope.generalErrorMessages(response); });
            }();

            getJsonData.getData('JSON/SignupApi/GetCountryList').success(function (data) {
                $scope.countryList = data;
            }).error(function (response) { $rootScope.generalErrorMessages(response); });

        }


    };
}]);
MainWebApp.directive("step3Phone", [function () {
    return {
        restrict: "E",
        templateUrl: baseUrl + "ng-partials/modules/signup/Step3Phone.html",
        replace: true,
        transclude: true,
        controller: function ($scope, $rootScope, getJsonData, $q, $http) {

            $scope.getContactInformation = function () {
                getJsonData.getData('JSON/SignupApi/GetContactInformation').success(function (data) {
                    if (typeof $scope.phoneForm === "undefined") $scope.phoneForm = {};
                    $scope.phoneForm.info = {};

                    $scope.phoneForm.info.type1 = data.type1;
                    if ($scope.phoneForm.info.type1.value === null) $scope.phoneForm.info.type1.value = "home";
                    $scope.phoneForm.info.countryId1 = data.countryId1;
                    if ($scope.phoneForm.info.countryId1.value === null || $scope.phoneForm.info.countryId1.value == 0) $scope.phoneForm.info.countryId1.value = $scope.countryId;
                    $scope.phoneForm.info.number1 = data.number1;
                    if ($scope.phoneForm.info.number1.value === null) { $scope.phoneForm.number2LinkVisible = 1 } else { $scope.phoneForm.number2LinkVisible = 0 }

                    $scope.phoneForm.info.emailAddress = data.emailAddress;

                    $scope.phoneForm.info.type2 = data.type2;
                    $scope.phoneForm.info.countryId2 = data.countryId2;
                    if ($scope.phoneForm.info.countryId2.value === null || $scope.phoneForm.info.countryId2.value == 0) $scope.phoneForm.info.countryId2.value = $scope.countryId;
                    $scope.phoneForm.info.number2 = data.number2;
                    if ($scope.phoneForm.info.number2.value === null) { $scope.phoneForm.number2LinkVisible = 1; $scope.phoneForm.number3LinkVisible = 1; } else { $scope.phoneForm.number2LinkVisible = 0; $scope.phoneForm.number3LinkVisible = 0; }

                    $scope.phoneForm.info.type3 = data.type3;
                    $scope.phoneForm.info.countryId3 = data.countryId3;
                    if ($scope.phoneForm.info.countryId3.value === null || $scope.phoneForm.info.countryId3.value == 0) $scope.phoneForm.info.countryId3.value = $scope.countryId;
               
              
                    $scope.phoneForm.info.number3 = data.number3;
                    if ($scope.phoneForm.info.number3.value === null) { $scope.phoneForm.number3LinkVisible = 1; } else { $scope.phoneForm.number3LinkVisible = 0; }
                    var tempArray = $scope.resource.type1.value.slice();
                    for (var i in tempArray) {
                        if (tempArray[i].id === data.type1.value) {
                            tempArray.splice(i, 1);
                            $scope.resource.type2 = {};
                            $scope.resource.type2.value = tempArray;
                        }
                    }
                    tempArray = $scope.resource.type2.value.slice();
                    for (var i in tempArray) {
                        if (tempArray[i].id === data.type2.value) {
                            tempArray.splice(i, 1);
                            $scope.resource.type3 = {};
                            $scope.resource.type3.value = tempArray;
                        }
                    }

                }).error(function (response) { $rootScope.generalErrorMessages(response); });
            };

            $scope.getAccountRegionName = function () {
                getJsonData.getData('JSON/SignupApi/GetAccountRegionName').success(function (data) {
                    $scope.countryId = data.countryId.value;

                    $scope.getContactInformation();

                }).error(function (response) { $rootScope.generalErrorMessages(response); });
            };

            $q.all([$rootScope.resourcePromise]).then(function () { $scope.getAccountRegionName(); });


            getJsonData.getData('JSON/SignupApi/GetPhoneCountryCodes').success(function (data) {
                $scope.countryCodes = data;
            }).error(function (response) { $rootScope.generalErrorMessages(response); });

            $scope.updateTypeListForOtherSelectors = function (selectedType, sourceArray, targetArray) {
                var tempArray = $scope.resource[sourceArray].value.slice();
                for (var i in tempArray) {
                    if (tempArray[i].id === selectedType) {
                        tempArray.splice(i, 1);
                        $scope.resource[targetArray] = {};
                        $scope.resource[targetArray].value = tempArray;

                        if ($scope.phoneForm.number2LinkVisible === 0) $scope.phoneForm.info[targetArray].value = $scope.resource[targetArray].value[0].id;
                        if ($scope.phoneForm.number3LinkVisible === 0) $scope.phoneForm.info[targetArray].value = $scope.resource[targetArray].value[0].id;

                    }
                }
            }

        }
    };
}]);

MainWebApp.directive("step3CustomerService", [function () {
    return {
        restrict: "E",
        templateUrl: baseUrl + "ng-partials/modules/signup/Step3CustomerService.html",
        replace: true,
        transclude: true,
        controller: function ($scope, $rootScope, getJsonData) {
            $scope.getAccountRegionName = function () {
                getJsonData.getData('JSON/SignupApi/GetAccountRegionName').success(function (data) {
                    $scope.countryId = data.countryId.value;

                    $scope.getCustomerServiceInformation = function () {
                        getJsonData.getData('JSON/SignupApi/GetCustomerServiceInformation').success(function (data) {
                            if (typeof $scope.customerServiceInfoForm === "undefined") $scope.customerServiceInfoForm = {};
                            $scope.customerServiceInfoForm.info = {};
                            $scope.customerServiceInfoForm.info.phoneCountryId = data.phoneCountryId;
                            if (data.phoneCountryId !== null) {
                                if ($scope.customerServiceInfoForm.info.phoneCountryId.value === null || $scope.customerServiceInfoForm.info.phoneCountryId.value == 0) $scope.customerServiceInfoForm.info.phoneCountryId.value = $scope.countryId;
                            }
                            $scope.customerServiceInfoForm.info.phoneNumber = data.phoneNumber;
                            $scope.customerServiceInfoForm.info.emailAddress = data.emailAddress;

                        }).error(function (response) { $rootScope.generalErrorMessages(response); });
                    };
                    $scope.getCustomerServiceInformation();

                }).error(function (response) { $rootScope.generalErrorMessages(response); });
            }();

            getJsonData.getData('JSON/SignupApi/GetPhoneCountryCodes').success(function (data) {
                $scope.countryCodes = data;
            }).error(function (response) { $rootScope.generalErrorMessages(response); });

        }
    };
}]);

MainWebApp.directive("step35ContactInfo", [function () {
    return {
        restrict: "E",
        templateUrl: baseUrl + "ng-partials/modules/signup/Step35ContactInfo.html",
        replace: true,
        transclude: true,
        controller: function ($scope, $rootScope, $q, getJsonData, $http) {

            var deferredGetAccountRegionName = $q.defer();
            $scope.getAccountRegionNamePromise = deferredGetAccountRegionName.promise;

            $scope.getAccountRegionName = function () {
       
                getJsonData.getData('JSON/SignupApi/GetAccountRegionName').success(function (data) {
                    $scope.countryId = data.countryId.value;
                    $scope.postalCodeName = {};
                    $scope.postalCodeName.title = data.postalCodeName.value;
                    $scope.displayOccupationFields = data.displayOccupationFields.value;
                    deferredGetAccountRegionName.resolve();
                    
                    getJsonData.getData('JSON/SignupApi/GetJobCategoryList').success(function (data) {                    
                        $scope.jobCategoryList = data;
                    }).error(function (response) { $rootScope.generalErrorMessages(response); });

                    $scope.getOccupationList = function (jobCategoryId) {
                        getJsonData.getData('JSON/SignupApi/GetOccupationList?jobCategoryId=' + jobCategoryId).success(function (data) {
                            $scope.occupationList = data;
                        }).error(function (response) { $rootScope.generalErrorMessages(response); });
                    };

                }).error(function (response) { $rootScope.generalErrorMessages(response); });
            };
            $scope.getAccountRegionName();

          $q.all([$rootScope.resourcePromise, $scope.getAccountRegionNamePromise]).then(function () {
                $scope.getContactInformationForBusiness = function () {
                    getJsonData.getData('JSON/SignupApi/GetContactInformation').success(function (data) {
                        if (typeof $scope.contactForm === "undefined") $scope.contactForm = {};
                        $scope.contactForm.info = {};
                        $scope.contactForm.info.type1 = data.type1;
                        if ($scope.contactForm.info.type1.value === null) $scope.contactForm.info.type1.value = "work";
                        $scope.contactForm.info.countryId1 = data.countryId1;

                        if ($scope.contactForm.info.countryId1.value === null || $scope.contactForm.info.countryId1.value == 0) $scope.contactForm.info.countryId1.value = $scope.countryId;
                        $scope.contactForm.info.number1 = data.number1;
                        if ($scope.contactForm.info.number1.value === null) { $scope.contactForm.number2LinkVisible = 1; } else { $scope.contactForm.number2LinkVisible = 0; }
                        $scope.contactForm.info.emailAddress = data.emailAddress;

                        $scope.contactForm.info.type2 = data.type2;
                        $scope.contactForm.info.countryId2 = data.countryId2;
                        if ($scope.contactForm.info.countryId2.value === null || $scope.contactForm.info.countryId2.value == 0) $scope.contactForm.info.countryId2.value = $scope.countryId;
                        $scope.contactForm.info.number2 = data.number2;
                        if ($scope.contactForm.info.number2.value === null) { $scope.contactForm.number2LinkVisible = 1; $scope.contactForm.number3LinkVisible = 1 } else { $scope.contactForm.number2LinkVisible = 0; $scope.contactForm.number3LinkVisible = 0 }

                        $scope.contactForm.info.type3 = data.type3;
                        $scope.contactForm.info.countryId3 = data.countryId3;
                        if ($scope.contactForm.info.countryId3.value === null || $scope.contactForm.info.countryId3.value == 0) $scope.contactForm.info.countryId3.value = $scope.countryId;
                        $scope.contactForm.info.number3 = data.number3;
                        if ($scope.contactForm.info.number3.value === null) { $scope.contactForm.number3LinkVisible = 1; } else { $scope.contactForm.number3LinkVisible = 0; }

                        $scope.contactForm.info.jobCategoryId = data.jobCategoryId;
                        if (typeof $scope.contactForm.info.jobCategoryId === "undefined") $scope.contactForm.info.jobCategoryId.value = 0;

                        $scope.contactForm.info.occupationId = data.occupationId;
                        if (typeof $scope.contactForm.info.occupationId === "undefined") $scope.contactForm.info.occupationId.value = 0;

                        $scope.contactForm.info.contactCitizenshipCountryId = data.contactCitizenshipCountryId;
                        $scope.contactForm.info.contactSameCountryCitizenship = data.contactSameCountryCitizenship;

                        var tempArray = $scope.resource.type1.value.slice();
                        for (var i in tempArray) {
                            if (tempArray[i].id === data.type1.value) {
                                tempArray.splice(i, 1);
                                $scope.resource.type2 = {};
                                $scope.resource.type2.value = tempArray;
                            }
                        }
                        tempArray = $scope.resource.type2.value.slice();
                        for (var i in tempArray) {
                            if (tempArray[i].id === data.type2.value) {
                                tempArray.splice(i, 1);
                                $scope.resource.type3 = {};
                                $scope.resource.type3.value = tempArray;
                            }
                        }

                        $scope.getOccupationList($scope.contactForm.info.jobCategoryId.value);

                    }).error(function (response) { $rootScope.generalErrorMessages(response); });
                }();
            });




            $scope.updateTypeListForOtherSelectors = function (selectedType, sourceArray, targetArray) {
                var tempArray = $scope.resource[sourceArray].value.slice();
                for (var i in tempArray) {
                    if (tempArray[i].id === selectedType) {
                        tempArray.splice(i, 1);
                        $scope.resource[targetArray] = {};
                        $scope.resource[targetArray].value = tempArray;

                        if ($scope.contactForm.number2LinkVisible === 0) $scope.contactForm.info[targetArray].value = $scope.resource[targetArray].value[0].id;
                        if ($scope.contactForm.number3LinkVisible === 0) $scope.contactForm.info[targetArray].value = $scope.resource[targetArray].value[0].id;
                    }
                }
            };

            getJsonData.getData('JSON/SignupApi/GetPhoneCountryCodes').success(function (data) {
                $scope.countryCodes = data;
            }).error(function (response) { $rootScope.generalErrorMessages(response); });




            getJsonData.getData('JSON/SignupApi/GetContactAddress').success(function (data) {

                $scope.differentForm.info = {};

                $scope.differentForm.info.contactSameAddress = data.contactSameAddress;
                if ($scope.differentForm.info.contactSameAddress === null) $scope.differentForm.info.contactSameAddress.value = 1;

                $scope.differentForm.info.contactAddress1 = data.contactAddress1;
                $scope.differentForm.info.contactAddress2 = data.contactAddress2;

                $scope.differentForm.info.contactCity = data.contactCity;
                $scope.differentForm.info.contactPostalCode = data.contactPostalCode;
                $scope.differentForm.info.contactRegion = data.contactRegion;
                if (!isNaN($scope.differentForm.info.contactRegion.value)) $scope.differentForm.info.contactRegion.value = parseInt($scope.differentForm.info.contactRegion.value); //Convert to Integer for selector

            }).error(function (response) { $rootScope.generalErrorMessages(response); });

        }
    };
}]);
MainWebApp.directive("step4SecurityDetails", [function () {
    return {
        restrict: "E",
        templateUrl: baseUrl + "ng-partials/modules/signup/Step4SecurityDetails.html",
        replace: true,
        transclude: true,
        controller: function ($scope, getJsonData) {

            $scope.getSecurityDetails = function () {
                getJsonData.getData('JSON/SignupApi/GetSecurityDetails').success(function (data) {
                    if (typeof $scope.securityDetailsForm === "undefined") $scope.securityDetailsForm = {};
                    $scope.securityDetailsForm.info = {};
                    $scope.securityDetailsForm.info.securityQuestionId = data.securityQuestionId;
                    $scope.securityDetailsForm.info.securityQuestionAnswer = data.securityQuestionAnswer;
                    $scope.securityDetailsForm.info.birthdayYear = data.birthdayYear;
                    $scope.securityDetailsForm.info.birthdayMonth = data.birthdayMonth;
                    $scope.securityDetailsForm.info.birthdayDay = data.birthdayDay;
                    $scope.securityDetailsForm.info.securityPin = data.securityPin;

                }).error(function (response) { $rootScope.generalErrorMessages(response); });
            };
            $scope.getSecurityDetails();

            getJsonData.getData('JSON/SignupApi/GetSecurityQuestions').success(function (data) {
                $scope.securityQuestionList = data;
            }).error(function (response) { $rootScope.generalErrorMessages(response); });

        }
    };
}]);
MainWebApp.directive("step5LastStep", [function () {
    return {
        restrict: "E",
        templateUrl: baseUrl + "ng-partials/modules/signup/Step5LastStep.html",
        replace: true,
        transclude: true
    };
}]);
MainWebApp.directive("notificationAccountIsDuplicate", [function () {
    return {
        restrict: "E",
        templateUrl: baseUrl + "ng-partials/modules/signup/NotificationAccountIsDuplicate.html",
        replace: true,
        transclude: true
    };
}]);
MainWebApp.factory('getJsonData', ['$http', '$rootScope', function ($http, $rootScope) {
    var dataType = 'application/json; charset=utf-8', dataItems = {};

    dataItems.getData = function (requestName) {
        $rootScope.loadingIndicatorLightboxVisible = true;
        return $http({
            method: 'GET',
            url: baseUrl + requestName,
            contentType: dataType
        })
            .success(function () {
                $rootScope.loadingIndicatorLightboxVisible = false;
            })
            .error(function () {
                $rootScope.loadingIndicatorLightboxVisible = false;
            });
    };
    return dataItems;
}]);




