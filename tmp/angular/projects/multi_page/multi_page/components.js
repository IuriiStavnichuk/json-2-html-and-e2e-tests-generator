var app=angular.module("App", ['ngTable'])
    .config(function($interpolateProvider, $routeProvider){
        $interpolateProvider.startSymbol('{[').endSymbol(']}');
});

app.controller ("AppCtrl", function ($scope, $http ) {

    $scope.clickMenu= function (menu) {
        $scope.selected_item=menu.title;
        $scope.selected_id=menu.id-1;
    }

    $scope.getInclude = function(selected_item){

        switch (selected_item) {
            case "About Payza":
                return "default.html";
                break;
            case "News":
                return "news.html";
                break;
            case "Support":
                return "default.html";
                break;
            case "Features":
                return "default.html";
                break;
            case "Legal Agreements":
                return "default.html";
                break;
            case "page":
                return "page.html";
                break;
            default:
                return "news.html";
        }
    }

    function readJson ($scope, $http, jsonFileName ) {
        $http.get(jsonFileName).success(function (data) {
            $scope.items = data;
        })
    }

    readJson ($scope, $http,'menu.json');

    $scope.singlePageView=function (selected_id) { $scope.selected_item="page";$scope.selected_id=selected_id-1; }

    $scope.textWithTags=function (html_with_text) { return html_with_text } //Show text with TAGS

})

app.directive ("click", function(){
    return function (scope, element, attrs) {
        element.bind("click", function () {
            scope.$apply(attrs.click)
        })
    }
})

app.directive ("hormenu", function(){
    return {
        restrict:"C",
        link: function (){},
        template:"<span  click='clickMenu(menu)' ng-repeat='menu in items.result'>{{menu.title}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>"
    }
})

app.directive ("content", function(){
    return {
        replace: false,
        restrict:"C",
        link: function (){},
        template:
            "<div ng-include='getInclude(selected_item)'></div>"
}

})


app.controller ("PaginationCtrl", function ($scope, $http, $q, $timeout, $location, ngTableParams) {

    $scope.init = function(jsonFileName) {

        $http.get(jsonFileName).success(function (data) {
           // $scope.items = data;
            data=data.result;

            $scope.tableParams = new ngTableParams({
                page: 1,
                total: data.length,
                count: 4
            });

            $scope.$watch('tableParams', function(params) {
                $scope.articles = data.slice((params.page - 1) * params.count, params.page * params.count);
            }, true);

        })
    }
})










