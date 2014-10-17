MainWebApp.controller('SignupBox', function ($scope, $rootScope, getJsonData) {

    $scope.getProfileProgress = function () {

        getJsonData.getData('JSON/SignupApi/GetProfileProgress').success(function (data) {
            $rootScope.currentStep = data.currentStep;
            $rootScope.percentComplete = data.percentComplete;
            $rootScope.profileCompleted = data.profileCompleted;

            $scope.emailValidated = data.emailValidated;

            $rootScope.step1Completed = data.step1Completed;
            $rootScope.step2Completed = data.step2Completed;
            $rootScope.step3Completed = data.step3Completed;
            $rootScope.step4Completed = data.step4Completed;
//TODO Delete it
            //$rootScope.profileCompleted = false;
            //$rootScope.step1Completed = false;
            //$rootScope.step2Completed = false;
            //$rootScope.step3Completed = false;
            //$rootScope.step4Completed = false;
//$rootScope.step4Completed = false;

        }).error(function () { });
    }();
    $rootScope.currentStepVisibilityTurnOn = function () { $rootScope.currentStepVisibility = 1;  }
    $rootScope.currentStepVisibilityTurnOff = function () { $rootScope.currentStepVisibility = 0; }

});
MainWebApp.controller('SignupForm', function ($scope, $rootScope, $timeout, $http, getJsonData) {



    //function getUrlVars() {
    //    var vars = {};
    //    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    //        vars[key] = value;
    //    });
    //    return vars;
    //}

    //$rootScope.currentStepGetFromUrl = getUrlVars()["currentStep"];

    //TODO Delete it
    //$scope.countryId = 2;

    $scope.isValid = {};
    var timers = new Array();
    $rootScope.resource = {};

    //$scope.deselectMenuItems = function () {
    //    $scope.step1TourVisibility = 0;
    //    $scope.step2WorkDetailsVisibility = 0;
    //    $scope.step3AddressVisibility = 0;
    //    $scope.step4PhoneVisibility = 0;
    //    $scope.step5SecurityDetailsVisibility = 0;
    //}


    $scope.resourceInit = function () {
        if (typeof $scope.currentLanguage === 'undefined') { $scope.currentLanguage = '\"en-US\"'; }
        switch ($scope.currentLanguage) {
            case '\"en-US\"':
                // for Checkout
                $http.get('ng-resources/signup/signup_resources_en.json')
                    .success(function (data) {
                        $rootScope.resource = data;
                    })
                    .error(function (data, response) {
                        if (typeof data !== "undefined") {
                            $scope.generalErrorMessages(data, response);
                        }
                    });
                break;
            case '\"fr-CA\"':
                $http.get('ng-resources/signup/signup_resources_fr.json')
                    .success(function (data) {
                        $rootScope.resource = data;
                    })
                    .error(function (data, response) {
                        if (typeof data !== "undefined") {
                            $scope.generalErrorMessages(data, response);
                        }
                    });
                break;
        }
    }();

 
    $scope.hideElements = function (id) {
        angular.element(id).slideUp(0);
    };
    $scope.slideDownAnimation = function (id) {
        angular.element(id).slideDown();
    };
    $scope.slideUpAnimation = function (id) {
        angular.element(id).slideUp();
    };

    $scope.showHideAlert = function (nameOfElementForShow, timeDelay) {



        if (timeDelay === undefined) { timeDelay = 2200; }

        for (var i = 0; i < timers.length; i++) { clearTimeout(timers[i]) }
        if ($scope.isValid[nameOfElementForShow] === false) { //start timer

            timers.push(setTimeout(function () {
                if ($scope.isValid[nameOfElementForShow] === false) { angular.element("#" + nameOfElementForShow + "Alert").slideDown(); }
            }, timeDelay));

        } else {

            angular.element("#" + nameOfElementForShow + "Alert").slideUp()
        }
    }

    $scope.scrollTop = function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    $scope.generalErrorMessages = function (data, response) {

        //$scope.merchantServicesBlockVisible = 0;

        //switch (response) {
        //    case 401:
        //        window.location.href = 'Logout.aspx';
        //        break;
        //    case 500:
        //        $scope.info.generalErrorMessages = (typeof data.Message != "undefined") ? data.Message : '' + (typeof data.errorMessage != "undefined") ? data.errorMessage : '';
        //        break;
        //    default:
        //        $scope.info.generalErrorMessages = "An Error occurred, please refresh the page and try again.";
        //}

    };

    //$scope.hideLoadingIndicator = function () {
    //    setTimeout(function () { $scope.loadingIndicatorLightboxVisible = 0; $scope.$apply(); }, 2000);
    //}

    $scope.changeCurrentStep =function (nextSectionVisibility) {
        $scope.currentStep = nextSectionVisibility;
    }

    $scope.submitPersonalSignupData = function (url, formData, nextSectionVisibility) {

        $http({
            method: 'POST',
            url: url,
            data: formData
        }).
        success(function (response) {
            if (response.isValid === true) {

                //if (nextSectionVisibility == "AccountOverview") {
                //    window.location.href = 'AccountOverview.aspx';
                //}
                //else {
                //    $rootScope.currentStep = nextSectionVisibility;
                //    l("$rootScope.currentStep >>", $rootScope.currentStep);
                //}

                switch (nextSectionVisibility) {
                    case 2: $rootScope.step1Completed = true; break;
                    case 3: $rootScope.step2Completed = true; break;
                    case 4: $rootScope.step3Completed = true; break;
                    case 5: $rootScope.step4Completed = true; break;
                }
                
                $scope.changeCurrentStep(nextSectionVisibility);


            } else {

                for (var key in response) {
                    l("key", key)
                    if (response[key] !== null) {
                        l("response[key].errorMessage", response[key].errorMessage)

                        l("$rootScope.resource[key]", $rootScope.resource[key])

                        if (typeof $rootScope.resource[key] !== 'undefined') {

                            if (response[key].errorMessage !== "" && response[key].errorMessage !== null) {
                                $rootScope.resource[key].errorMessage = response[key].errorMessage;
                                l("$rootScope.resource[key].errorMessage", $rootScope.resource[key].errorMessage)

                                if (key !== "generalErrorMessages") {
                                    angular.element("#" + key + "Alert").slideDown();
                                } else {
                                    angular.element("." + key + "Alert").slideDown();
                                }
                            }
                        }
                    }
                }
            }

        }).
        error(function (data, response) {
            $scope.generalErrorMessages(data, response);
        });
    };

    $scope.getCurrentCulture = function () {
        $http.get('JSON/CultureApi/GetCurrentCulture')
            .success(function (data) {
                $scope.currentLanguage = data;
            })
            .error(function (data, response) {
                $scope.generalErrorMessages(data, response);
            });

    };

    $scope.getCurrentCulture();

});

MainWebApp.directive("step0Tour", [function () {
    return {
        restrict: "E",
        templateUrl: "ng-partials/modules/signup/Step0Tour.html",
        replace: true,
        transclude: true
    };
}]);
MainWebApp.directive("step1WorkDetails", [function () {
    return {
        restrict: "E",
        templateUrl: "ng-partials/modules/signup/Step1WorkDetails.html",
        replace: true,
        transclude: true,
        controller: function ($scope, $rootScope, $http, getJsonData) {

            //$scope.resourceInit = function () {
            //    if (typeof $scope.currentLanguage === 'undefined') { $scope.currentLanguage = '\"en-US\"'; }
            //    switch ($scope.currentLanguage) {
            //        case '\"en-US\"':
            //            // for Checkout
            //            $http.get('ng-resources/signup/signup_resources_en.json')
            //                .success(function (data) {
            //                    $rootScope.resource = data;
            //                })
            //                .error(function (data, response) {
            //                    if (typeof data !== "undefined") {
            //                        $scope.generalErrorMessages(data, response);
            //                    }
            //                });
            //            break;
            //        case '\"fr-CA\"':
            //            $http.get('ng-resources/signup/signup_resources_fr.json')
            //                .success(function (data) {
            //                    $rootScope.resource = data;
            //                })
            //                .error(function (data, response) {
            //                    if (typeof data !== "undefined") {
            //                        $scope.generalErrorMessages(data, response);
            //                    }
            //                });
            //            break;
            //    }
            //}();


                getJsonData.getData('JSON/SignupApi/GetJobCategoryList').success(function (data) {
                    $scope.jobCategoryList = data;
                    //$scope.workDetailsForm.info.jobCategoryId.value = data[0].name;
                }).error(function (data, response) { });

                $scope.getOccupationList = function (jobCategoryId) {
                    getJsonData.getData('JSON/SignupApi/GetOccupationList?jobCategoryId=' + jobCategoryId).success(function (data) {
                        $scope.occupationList = data;
                    }).error(function (data, response) { });
                };

                getJsonData.getData('JSON/SignupApi/GetWorkDetails').success(function (data) {
                    if (typeof $scope.workdetailsForm === "undefined") $scope.workdetailsForm = {};
                    $scope.workDetailsForm.info = {};
                    $scope.workDetailsForm.info.jobCategoryId = data.jobCategoryId;
                    //$scope.workDetailsForm.info.occupationId = {};
                    $scope.workDetailsForm.info.occupationId = data.occupationId;
                    $scope.getOccupationList(data.jobCategoryId.value);
                }).error(function (data, response) { });
            }
    };
}]);
MainWebApp.directive("step2Address", [function () {
    return {
        restrict: "E",
        templateUrl: "ng-partials/modules/signup/Step2Address.html",
        replace: true,
        transclude: true,

        controller: function ($scope, $rootScope, getJsonData) {

            //$scope.getRegionName = function (countryId) {
            //    getJsonData.getData('JSON/SignupApi/GetRegionName?countryId=' + countryId).success(function (data) {
            //        $scope.regionName = data.regionName.value;
            //        $scope.countryFlag = "fl_" + data.countryFlag.value.toLowerCase();
            //        //$scope.countryName = data.countryName.value;
            //    }).error(function (data, response) { });
            //};
            $scope.getRegionList = function (countryId) {
                getJsonData.getData('JSON/SignupApi/GetRegionList').success(function (data) {
                    //getJsonData.getData('JSON/SignupApi/GetRegionList?countryId=' + countryId).success(function (data) {
                    $scope.regionList = data;
                    //$scope.regionList.unshift({ name: "-- "+$scope.resource.region.title+" --" });
                }).error(function (data, response) { });
            }();
            $scope.getAccountRegionName = function (countryId) {
                getJsonData.getData('JSON/SignupApi/GetAccountRegionName').success(function (data) {
                    $scope.accountRegionName = data.regionName.value;
                    $scope.accountCountryFlag = "fl_" + data.countryFlag.value.toLowerCase();
                    $scope.accountCountryName = data.countryName.value;
                }).error(function (data, response) { });
            }();




            getJsonData.getData('JSON/SignupApi/GetResidentialAddress').success(function (data) {

                if (typeof $scope.addressForm === "undefined") $scope.addressForm = {};
                $scope.addressForm.info = {};

                $scope.addressForm.info.address1 = data.address1;
                $scope.addressForm.info.address2 = data.address2;
                $scope.addressForm.info.citizenshipCountryId = data.citizenshipCountryId;
                $scope.addressForm.info.city = data.city;
                $scope.addressForm.info.postalCode = data.postalCode;
                $scope.addressForm.info.region = data.region;
                $scope.addressForm.info.region.value = parseInt($scope.addressForm.info.region.value);

                $scope.addressForm.info.sameCountryCitizenship = data.sameCountryCitizenship;
                $scope.addressForm.info.generalErrorMessages = data.generalErrorMessages;

                //$scope.getDefaultRegionName(data.citizenshipCountryId.value);
                //$scope.getRegionList(data.citizenshipCountryId.value);


            }).error(function (data, response) {});




            getJsonData.getData('JSON/SignupApi/GetCountryList').success(function (data) {
                $scope.countryList = data;
                //$scope.countryList.unshift({ name: "-- " + $rootScope.resource.country.title + " --" });
            }).error(function (data, response) { });

        }


    };
}]);
MainWebApp.directive("step3Phone", [function () {
    return {
        restrict: "E",
        templateUrl: "ng-partials/modules/signup/Step3Phone.html",
        replace: true,
        transclude: true,
        controller: function ($scope, getJsonData) {
            getJsonData.getData('JSON/SignupApi/GetPhoneCountryCodes').success(function (data) {
                $scope.countryCodes = data;
            }).error(function (data, response) { });
            getJsonData.getData('JSON/SignupApi/GetPersonalPhoneNumbers').success(function (data) {
                if (typeof $scope.phoneForm === "undefined") $scope.phoneForm = {};
                $scope.phoneForm.info = {};

                $scope.phoneForm.info.type1 = data.type1;
                $scope.phoneForm.info.countryId1 = data.countryId1;
                $scope.phoneForm.info.number1 = data.number1;

                $scope.phoneForm.info.type2 = data.type2;
                $scope.phoneForm.info.countryId2 = data.countryId2;
                $scope.phoneForm.info.number2 = data.number2;

            }).error(function (data, response) { });
        }
    };
}]);
MainWebApp.directive("step4SecurityDetails", [function () {
    return {
        restrict: "E",
        templateUrl: "ng-partials/modules/signup/Step4SecurityDetails.html",
        replace: true,
        transclude: true,
        controller: function ($scope, getJsonData) {

            getJsonData.getData('JSON/SignupApi/GetSecurityDetails').success(function (data) {
                if (typeof $scope.securityDetailsForm === "undefined") $scope.securityDetailsForm = {};
                $scope.securityDetailsForm.info = {};

                $scope.securityDetailsForm.info.securityQuestionId = data.securityQuestionId;
                $scope.securityDetailsForm.info.securityQuestionAnswer = data.securityQuestionAnswer;
                $scope.securityDetailsForm.info.birthdayYear = data.birthdayYear;

                $scope.securityDetailsForm.info.birthdayMonth = data.birthdayMonth;
                $scope.securityDetailsForm.info.birthdayDay = data.birthdayDay;
                $scope.securityDetailsForm.info.securityPin = data.securityPin;

            }).error(function (data, response) { });

            getJsonData.getData('JSON/SignupApi/GetSecurityQuestions').success(function (data) {
                $scope.securityQuestionList = data;
            }).error(function (data, response) { });

        }
    };
}]);
MainWebApp.directive("step5LastStep", [function () {
    return {
        restrict: "E",
        templateUrl: "ng-partials/modules/signup/Step5LastStep.html",
        replace: true,
        transclude: true
    };
}]);

MainWebApp.factory('getJsonData', ['$http', function ($http) {
    dataType = 'application/json; charset=utf-8',
    dataItems = {};

    dataItems.getData = function (requestName) {
        return $http({
            method: 'GET',
            url: requestName,
            contentType: dataType
        });
    };
    return dataItems;
}])










