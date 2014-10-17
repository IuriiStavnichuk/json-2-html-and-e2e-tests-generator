angular.module('payza.formElements',[])

    .directive("fieldset", function () {
        return {
            restrict: "E",
            templateUrl: "js/app/cedric/modules/QuestionnaireCheckout.html",
            replace:true,
            transclude: true,
            link: function ($scope) {

            }
        };
    })
    .controller('AnswersCtrl', ['$scope', '$http', function ($scope, $http) {

        $scope.postIntroductionSection = function () {
            console.log("$scope.answers>>>", $scope.answers);
            $http({
                method: 'POST',
                url: 'JSON/Support/EnablePhoneNumbers',
                data: $scope.answers
            }).
                success(function () {
                    console.log("success>>>");
                }).
                error(function (status) {
                    console.log("error>>>", status);
                });
        };

    }])

;

