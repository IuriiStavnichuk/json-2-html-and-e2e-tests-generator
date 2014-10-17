MainWebApp.controller('SignupForm', function ($scope, $timeout, $http) {

    //directive('valOnTimeout', ['$timeout', function ($timeout) {
    $scope.isValid = {};
    var timers = new Array();

    $scope.step5SequrityDetailsCompleted = 1;

    $scope.deselectMenuItems = function () {
        $scope.step1TourVisibility = 0;
        $scope.step2WorkDetailsVisibility = 0;
        $scope.step3AddressVisibility = 0;
        $scope.step4PhoneVisibility = 0;
        $scope.step5SequrityDetailsVisibility = 0;
    }

    $scope.signupForPersonalVisibility = true;
    $scope.emailValidationVisibility = 0;
    $scope.step1TourVisibility = 0;
    $scope.step2WorkDetailsVisibility = 0;
    $scope.step3AddressVisibility = 0;
    $scope.step4PhoneVisibility = 0;
    $scope.step5SequrityDetailsVisibility = 0;

    $scope.hideElements = function (id) {
        $(id).slideUp(0);
    };

    $scope.showHideAlert = function (nameOfElementForShow, timeDelay) {

        if (timeDelay === undefined) { timeDelay = 2200 }

        for (var i = 0; i < timers.length; i++) {clearTimeout(timers[i])}

        if ($scope.isValid[nameOfElementForShow] === false) { //start timer

            timers.push(setTimeout(function () {

                if ($scope.isValid[nameOfElementForShow] === false) { angular.element("#" + nameOfElementForShow + "Alert").slideDown(); }

            }, timeDelay));

        } else {

            angular.element("#" + nameOfElementForShow + "Alert").slideUp()
        }
    }

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

    $scope.testcontent = [{ "id": 5, "name": "Afghanistan", "isSelected": false }, { "id": 6, "name": "Albania", "isSelected": false }, { "id": 7, "name": "Algeria", "isSelected": false }, { "id": 8, "name": "American Samoa", "isSelected": false }, { "id": 9, "name": "Andorra", "isSelected": false }, { "id": 10, "name": "Angola", "isSelected": false }, { "id": 11, "name": "Anguilla", "isSelected": false }];

    $scope.submitPersonalSignupData = function () {
        $scope.signupForm.info = { "firstName": { "value": "aaaaaaa1111", "errorMessage": "Tes aaaaaaaaaaaaa" }, "lastName": { "value": "bbbbbbb222bbb", "errorMessage": "" }, "emailAddress": { "value": "aaa@bbb.ccc", "errorMessage": "" }, "password": { "value": "444", "errorMessage": "" }, "newsletterSubscription": { "value": true, "errorMessage": "" }, "actionWasSuccessful": true, "isValid": null, "generalErrorMessages": null }

        $http({
            method: 'POST',
            url: '../JSON/SignupApi/SubmitPersonalSignupData',
            data: $scope.signupForm.info
        }).
            success(function (response) {
                $scope.signupForm.info = { "firstName": { "value": "aaa", "errorMessage": "Error message for FirstName" }, "lastName": { "value": "bbb", "errorMessage": "Error message for LastName" }, "emailAddress": { "value": "aaa@bbb.ccc", "errorMessage": "Error message for emailAddress" }, "password": { "value": "444", "errorMessage": "Error message for Password" }, "newsletterSubscription": { "value": true, "errorMessage": "Error message for password" }, "actionWasSuccessful": true, "isValid": null, "generalErrorMessages1": { "errorMessage": "Error message for generalErrorMessages" } }
                //$scope.signupForm.info = response;
                //l( "$scope.response >>>", $scope.response );
                var response = $scope.signupForm.info;
                for (var key in response) {
                    if (response[key] !== null) {
                        if (response[key].errorMessage !== "") $("#"+key+"Alert").slideDown();
                    }
                }
            }).
            error(function (data, response) {
                $scope.generalErrorMessages(data, response);
                $(".loading-indicator-lightbox").css("display", "none");
            });
    };


});


MainWebApp.directive("signupForPersonal", [function () {
    return {
        restrict: "E",
        templateUrl: "../ng-partials/modules/signup/SignupForPersonal.html",
        replace: true,
        transclude: true
    };
}]);
MainWebApp.directive("emailValidation", [function () {
    return {
        restrict: "E",
        templateUrl: "../ng-partials/modules/signup/EmailValidation.html",
        replace: true,
        transclude: true
    };
}]);
MainWebApp.directive("step1Tour", [function () {
    return {
        restrict: "E",
        templateUrl: "../ng-partials/modules/signup/Step1Tour.html",
        replace: true,
        transclude: true
    };
}]);
MainWebApp.directive("step2WorkDetails", [function () {
    return {
        restrict: "E",
        templateUrl: "../ng-partials/modules/signup/Step2WorkDetails.html",
        replace: true,
        transclude: true
    };
}]);
MainWebApp.directive("step3Address", [function () {
    return {
        restrict: "E",
        templateUrl: "../ng-partials/modules/signup/Step3Address.html",
        replace: true,
        transclude: true
    };
}]);
MainWebApp.directive("step4Phone", [function () {
    return {
        restrict: "E",
        templateUrl: "../ng-partials/modules/signup/Step4Phone.html",
        replace: true,
        transclude: true
    };
}]);
MainWebApp.directive("step5SequrityDetails", [function () {
    return {
        restrict: "E",
        templateUrl: "../ng-partials/modules/signup/Step5SequrityDetails.html",
        replace: true,
        transclude: true
    };
}]);





