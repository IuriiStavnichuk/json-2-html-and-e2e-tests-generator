var app=angular.module("App", ['ngTable'])
    .config(function($interpolateProvider, $routeProvider){
        $interpolateProvider.startSymbol('{[').endSymbol(']}');
});

/* app.run(function ($rootScope) { //global variable
   $rootScope.selected_item = 'News';
    $rootScope.selected_id="";
    $rootScope.items="";
    $rootScope.items_menu="";
});*/

app.controller ("AppCtrl", function ($scope, $http, $rootScope ) {

    $scope.getInclude = function(){

        switch ($rootScope.selected_item) {
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

    $scope.singlePageView=function (selected_id) {
        $rootScope.selected_item="page";
        $rootScope.selected_id=selected_id-1;
    }

    $scope.textWithTags=function (html_with_text) { return html_with_text } //Show text with TAGS

})

app.controller ("hormenu", function ($scope, $http, $rootScope) {

    $http.get('menu.json').success(function (data) { $rootScope.items_menu = data; })

    $scope.clickMenu= function (menu) {
        $rootScope.selected_item = menu.title;
        $rootScope.selected_id=menu.id-1;
    }

})

app.controller ("PaginationCtrl", function ($scope, $http, $q, $timeout, $location, ngTableParams, $rootScope) {

    $http.get('news.json').success(function (data) {
        $rootScope.items = data.result;

        $scope.tableParams = new ngTableParams({
            page: 1,
            total: $rootScope.items.length,
            count: 4
        });

        $scope.$watch('tableParams', function(params) {
            $rootScope.articles = $rootScope.items.slice((params.page - 1) * params.count, params.page * params.count);
        }, true);

    })

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
        template:"<span  click='clickMenu(menu)' ng-repeat='menu in items_menu.result'>{{menu.title}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>"
    }
})

app.directive ("content", function(){
    return {
        replace: false,
        restrict:"C",
        link: function (){},
        template:
            "<div ng-include='getInclude()'></div>"
    }

})










