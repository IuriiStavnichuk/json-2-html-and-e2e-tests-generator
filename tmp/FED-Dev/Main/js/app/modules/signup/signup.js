MainWebApp.controller('SignupForm', function ($scope, $rootScope, $timeout, $http, getJsonData) {

    $scope.info = {};
    $rootScope.loadingIndicatorLightboxVisible = true;

    $scope.hideElements = function (id) {
        angular.element(id).slideUp(0);
    };

    $scope.slideDownAnimation = function (id) {
        angular.element(id).slideDown();
    };

    $scope.slideUpAnimation = function (id) {
        angular.element(id).slideUp();
    };

    $scope.redirect = function (redirectUrl) { window.location.href = redirectUrl; };

    $scope.getUserAgreementCheckboxState = function (countryId) {

        $scope.getRegionName = function () {
            getJsonData.getData('../JSON/SignupApi/GetRegionName?countryId=' + countryId).success(function (data) {
                if (data.displayUserAgreementCheckbox !== null) $scope.displayUserAgreementCheckbox = data.displayUserAgreementCheckbox.value;
                if (data.userAgreementLink !== null) $scope.userAgreementLink = data.userAgreementLink.value;
            }).error(function (data, response) { });
        }();

    };

    $scope.toolTipPosition = function (e) {
        var elem = angular.element(e.srcElement)
        var xOffset=($(window).width()/2)-310;
        var position = elem.offset(), top = position.top - 107, left = position.left - xOffset+36;
        $('.tooltip').css({ 'top': top, 'left': left });
    }

    $scope.getBusinessSubcategorySupported = function () {

        var signupFormScope = angular.element('#signupForm').scope();
        var categoryId = signupFormScope.signupForm.info.businessSubcategoryId.value;

        getJsonData.getData('../JSON/SignupApi/GetBusinessSubcategorySupported?categoryId=' + categoryId).success(function (data) {
            $scope.resource.businessSubcategoryId.warningMessage = data.isSupported.errorMessage;
            if (data.isSupported.value === false || categoryId==0) {
                angular.element("#businessSubcategoryIdWarning").slideDown();
            } else {
                angular.element("#businessSubcategoryIdWarning").slideUp();
            }
        }).error(function (response) {
            $scope.generalErrorMessages(response);
        });
    };


    $rootScope.generalErrorMessages = function (response) {

        $rootScope.loadingIndicatorLightboxVisible = false;

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

    $scope.currentStepVisibilityTurnOff = function () { $rootScope.currentStep = ''; $('.country-select select').on('change keypress', setFlag); };

    $scope.submitPersonalSignupData = function (url, formData, nextSectionVisibility) {

        $rootScope.loadingIndicatorLightboxVisible = true;

        $http({
            method: 'POST',
            url: url,
            data: formData
        }).
            success(function (response) {

                if (response.isValid === true) {

                    if ($rootScope.accountType === 1) $rootScope.trackElement('starter/complete');
                    else if ($rootScope.accountType === 5) $rootScope.trackElement('personal/complete');
                    else if ($rootScope.accountType === 10) $rootScope.trackElement('business/complete');

                    if (url == '../JSON/SignupApi/ResendValidationEmail') {
                        $rootScope.resource.resubmit.title = $rootScope.resource.resubmit2.title;
                        $scope.isValidationEmailSent = true;
                    }

                    $scope.nextSection(nextSectionVisibility);

                } else {

                    for (var key in response) {

                        if (typeof $scope.resource[key] !== 'undefined') {

                            if (response[key].errorMessage !== "" && response[key].errorMessage !== null) {

                                $scope.resource[key].errorMessage = response[key].errorMessage;
                                if (key !== "generalErrorMessages") {
                                    angular.element("#" + key + "Alert").slideDown();
                                } else {
                                    angular.element("." + key + "Alert").slideDown();
                                }
                            } else {
                                if (key !== "generalErrorMessages") {
                                    angular.element("#" + key + "Alert").slideUp();
                                } else {
                                    angular.element("." + key + "Alert").slideUp();
                                }
                            }
                        }
                    }
                }
                $rootScope.loadingIndicatorLightboxVisible = false;
            }).
            error(function (response) {
                $scope.generalErrorMessages(response);
            });
    };

    $scope.nextSection = function (nextSectionVisibility) {
        $scope.currentStep = nextSectionVisibility;
    };

    $scope.showCreateAccountPopup = function (accountType, countryId) {
        $rootScope.currentStep = 'signupCreateAccount';
        $rootScope.accountType = accountType;
        var signupFormScope = angular.element('#signupForm').scope();
        signupFormScope.signupForm.info.countryId.value = countryId;
        $scope.getUserAgreementCheckboxState(countryId);

        if ($rootScope.accountType === 1) $rootScope.trackElement('starter/selection');
        else if ($rootScope.accountType === 5) $rootScope.trackElement('personal/selection');
        else if ($rootScope.accountType === 10) $rootScope.trackElement('business/selection');

        setTimeout(function () { window.scrollTo(0, 0); $scope.hideElements('.complete-profile-box .alert.alert-error') }, 0)
    }

    $rootScope.trackElement = function (url) {
        var finalUrl = '/virtual/newsignup/' + url;
        _gaq.push(['_trackPageview', finalUrl]);
    };

});

MainWebApp.directive("signupCreateAccount", [function () {
    return {
        restrict: "E",
        templateUrl: "../ng-partials/modules/signup/SignupCreateAccount.html",
        replace: true,
        transclude: true,
        controller: function ($scope, $rootScope, $http, getJsonData) {

            function getQueryVariable(variable) {
                var query = window.location.search.substring(1);
                var vars = query.split("&");
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split("=");
                    if (pair[0] == variable) { return pair[1]; }
                }
                return (false);
            }

            $scope.getCurrentCulture = function () {

                getJsonData.getData('../JSON/CultureApi/GetCurrentCulture')
                    .success(function (data) {
                        $rootScope.currentLanguage = data;

                        getJsonData.getData('../JSON/SignupApi/GetSalutationList').success(function (data) {
                            $scope.salutationList = data;
                        }).error(function (response) { $rootScope.generalErrorMessages(response); });

                        $scope.resourceInit = function () {
                            if (typeof $rootScope.currentLanguage === 'undefined') { $rootScope.currentLanguage = '\"en-US\"'; }
                            switch ($rootScope.currentLanguage) {
                                case '\"en-US\"':
                                    getJsonData.getData('../ng-resources/signup/signup_resources_en.json')
                                        .success(function (data) {
                                            $rootScope.resource = data;

                                            $rootScope.loadingIndicatorLightboxVisible = false;

                                            //Show Gateway account
                                            if (getQueryVariable("t") === '0') {
                                                $scope.showCreateAccountPopup(18, 3)
                                            }

                                        })
                                        .error(function (response) {
                                            $scope.generalErrorMessages(response);
                                        });
                                    break;
                                case '\"fr-CA\"':
                                    getJsonData.getData('../ng-resources/signup/signup_resources_fr.json')
                                        .success(function (data) {
                                            $rootScope.resource = data;
                                            $rootScope.loadingIndicatorLightboxVisible = false;

                                            if (getQueryVariable("t") === '0') {
                                                $scope.showCreateAccountPopup(18, 3)
                                            }
                                        })
                                        .error(function (response) {
                                            $scope.generalErrorMessages(response);
                                        });
                                    break;
                            }
                        }();
                    })
                    .error(function (response) {
                        $scope.generalErrorMessages(response);
                    });
            }();


            getJsonData.getData('../JSON/SignupApi/GetBusinessStructureList').success(function (data) {
                $scope.businessStructureList = data;
            }).error(function (response) { $rootScope.generalErrorMessages(response); });


            $scope.getBusinessSubcategoryList = function (businessCategory, businessSubCategory) {
                getJsonData.getData('../JSON/SignupApi/GetBusinessSubcategoryList?categoryId=' + businessCategory).success(function (data) {

                    $scope.businessSubcategoryList = data;
                    $scope.signupForm.info.businessSubcategoryId = {};
                    $scope.signupForm.info.businessSubcategoryId.value = 0;
                    $scope.slideUpAnimation('#businessSubcategoryIdWarning');
                }).error(function (response) { rootScope.generalErrorMessages(response); });
            };

            getJsonData.getData('../JSON/SignupApi/GetBusinessCategoryList').success(function (data) {
                $scope.businessCategoryList = data;
            }).error(function (response) { $rootScope.generalErrorMessages(response); });

            $scope.getLogin = function () {
                $http({
                    method: 'POST',
                    url: '../JSON/SignupApi/Login',
                    data: ''
                }).
                    success(function () {
                        if ($rootScope.accountType === 1) $rootScope.trackElement('starter/accountoverview');
                        else if ($rootScope.accountType === 5) $rootScope.trackElement('personal/accountoverview');
                        else if ($rootScope.accountType === 10) $rootScope.trackElement('business/accountoverview');
                        window.location.href = '../AccountOverview.aspx';
                    }).
                    error(function (response) {
                        $scope.generalErrorMessages(response);
                    });
            };
            $scope.getBusinessSubcategoryList(0, 0);


        }
    };
}]);

MainWebApp.directive("signupEmailValidation", [function () {
    return {
        restrict: "E",
        templateUrl: "../ng-partials/modules/signup/SignupEmailValidation.html",
        replace: true,
        transclude: true
    };
}]);

MainWebApp.directive('autoFillSync', function ($timeout) {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ngModel) {
            var origVal = elem.val();
            $timeout(function () {
                var newVal = elem.val();
                if (ngModel.$pristine && origVal !== newVal) {
                    ngModel.$setViewValue(newVal);
                }
            }, 500);
        }
    }
});

MainWebApp.factory('getJsonData', ['$http', '$rootScope', function ($http) {
    var dataType = 'application/json; charset=utf-8', dataItems = {};

    dataItems.getData = function (requestName) {
        return $http({
            method: 'GET',
            url: requestName,
            contentType: dataType
        })
            .success(function (data) {
            })
            .error(function (response) {
            });

    };
    return dataItems;
}]);

