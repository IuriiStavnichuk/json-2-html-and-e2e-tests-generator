//MainWebApp.run(function ($rootScope, $templateCache) {
//    $templateCache.removeAll();
//    $rootScope.$on('$viewContentLoaded', function () {
//        $templateCache.removeAll();
//    });
//});

MainWebApp.controller('SignupForm', function ($scope, $rootScope, $timeout, $http, getJsonData) {

    // TODO Delete it
    // $scope.countryId = 2;
    // $scope.isValid = {};
    // $scope.resource = {};

    $scope.info = {};
    $scope.isValid = {};

    var timers = [];

    $scope.hideElements = function (id) {
        angular.element(id).slideUp(0);
    };
    $scope.slideDownAnimation = function (id) {
        angular.element(id).slideDown();
    };
    $scope.slideUpAnimation = function (id) {
        angular.element(id).slideUp();
    };

    //$scope.$watch('$window.countryId', function (newValue, oldValue) {
    //    if (newValue !== oldValue) {
    //        $scope.signupForm.info = {}; $scope.signupForm.info.countryId = {};
    //        $scope.signupForm.info.countryId.value = $window.countryId;
    //        l("yesss>", $window.countryId)
    //    }
    //});

    $scope.refreshCountryId = function (countryId) {
        $rootScope.countryId = countryId;
    };
    $scope.showPopup = function () {
        $scope.currentStep = 'signupForPersonal';
        $scope.$apply();
    };

    $scope.showHideAlert = function (nameOfElementForShow, timeDelay) {

        if (timeDelay === undefined) { timeDelay = 2200; }

        for (var i = 0; i < timers.length; i++) { clearTimeout(timers[i]) }

        if ($scope.isValid[nameOfElementForShow] === false) { //start timer

            timers.push(setTimeout(function () {

                if ($scope.isValid[nameOfElementForShow] === false) {
                    angular.element("#" + nameOfElementForShow + "Alert").slideDown();
                    angular.element("#" + nameOfElementForShow + "Alert").slideDown();
                }

            }, timeDelay));

        } else {

            angular.element("#" + nameOfElementForShow + "Alert").slideUp()
        }
    }

    $scope.scrollTop = function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    $scope.generalErrorMessages = function (data, response) {

        $scope.info.generalErrorMessages = (typeof data.Message != "undefined") ? data.Message : '' + (typeof data.errorMessage != "undefined") ? data.errorMessage : '';

    };
    $scope.currentStepVisibilityTurnOff = function () { $scope.currentStep = ''; }

    //$scope.hideLoadingIndicator = function () {
    //    setTimeout(function () { $scope.loadingIndicatorLightboxVisible = 0; $scope.$apply(); }, 2000);
    //};

    $scope.redirect=function (redirectUrl) { window.location.href = redirectUrl;} 

    $scope.submitPersonalSignupData = function (url, formData, nextSectionVisibility) {

        $http({
            method: 'POST',
            url: url,
            data: formData
        }).
            success(function (response) {


                if (response.isValid === true) {

                        $scope.nextSection(nextSectionVisibility);


                    //if (nextSectionVisibility === "AccountOverview.aspx") {
                    //    window.location.href = '../AccountOverview.aspx';
                    //} else {
                    //    $scope.nextSection(nextSectionVisibility);
                    //}
                } else {

                    for (var key in response) {

                        if (response[key] !== null) {
                            
                            if (typeof $scope.resource[key] !== 'undefined') {

                                if (response[key].errorMessage !== "" && response[key].errorMessage !== null) {
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
                }

            }).
            error(function (data, response) {
                $scope.generalErrorMessages(data, response);
                //$scope.nextSection(nextSectionVisibility);
            });
    };

    $scope.nextSection = function (nextSectionVisibility) {
        $scope.currentStep = nextSectionVisibility;
    };


});


MainWebApp.directive("signupForPersonal", [function () {
    return {
        restrict: "E",
        templateUrl: "../ng-partials/modules/signup/SignupForPersonal.html",
        replace: true,
        transclude: true,
        controller: function ($scope, $rootScope, $http) {
            $scope.getCurrentCulture = function () {
                $http.get('../JSON/CultureApi/GetCurrentCulture')
                    .success(function (data) {
                        $rootScope.currentLanguage = data;

                        $scope.resourceInit = function () {
                            if (typeof $rootScope.currentLanguage === 'undefined') { $rootScope.currentLanguage = '\"en-US\"'; }
                            switch ($rootScope.currentLanguage) {
                                case '\"en-US\"':
                                    // for Checkout
                                    $http.get('../ng-resources/signup/signup_resources_en.json')
                                        .success(function (data) {
                                            $rootScope.resource = data;
                                        })
                                        .error(function (data, response) {
                                            if (typeof data !== "undefined") {
                                                $rootScope.generalErrorMessages(data, response);
                                            }
                                        });
                                    break;
                                case '\"fr-CA\"':
                                    $http.get('../ng-resources/signup/signup_resources_fr.json')
                                        .success(function (data) {
                                            $rootScope.resource = data;
                                        })
                                        .error(function (data, response) {
                                            if (typeof data !== "undefined") {
                                                $rootScope.generalErrorMessages(data, response);
                                            }
                                        });
                                    break;
                            }
                        }();

                    })
                    .error(function (data, response) {
                        $scope.generalErrorMessages(data, response);
                    });
            }();

        }

    }
}])
MainWebApp.directive("signupEmailValidation", [function () {
    return {
        restrict: "E",
        templateUrl: "../ng-partials/modules/signup/SignupEmailValidation.html",
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










