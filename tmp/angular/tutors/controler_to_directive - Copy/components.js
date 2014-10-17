var app=angular.module("twitterApp", [])

app.controller ("AppCtrl", function ($scope) {

    $scope.clickTweets= function () {
        alert ("click567567")
    }

    $scope.enterTweets= function () {
        alert ("222222222222")
    }

    $scope.test= "TESTTT_ENTER"
})


app.directive ("enter", function(){
    return function (scope, element, attrs) {
        element.bind("mouseenter", function (){
            scope.$apply(attrs.enter)

        })
    }
})

app.directive ("click", function(){
    return function (scope, element, attrs) {
        element.bind("click", function (){
            scope.$apply(attrs.click)

        })
    }
})

