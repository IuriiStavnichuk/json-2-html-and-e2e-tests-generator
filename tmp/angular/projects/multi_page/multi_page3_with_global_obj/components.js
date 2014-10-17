var app=angular.module("App", ['ngTable'])
    .config(function($interpolateProvider, $routeProvider){
        $interpolateProvider.startSymbol('{[').endSymbol(']}');
});


app.run(function ($rootScope) { //global variable
    $rootScope.selected_item = 'News';
    $rootScope.selected_id="";

    $rootScope.items= new Object();

    $rootScope.items['hormenu'] = "test menu";
    $rootScope.items['content'] = "test content";

    $rootScope.readJson=function  ($scope, $http, jsonFileName, controller_name ) {
        $http.get(jsonFileName).success(function (data) {

            console.log(">0",jsonFileName, controller_name);
            $rootScope.items[controller_name]=data;
            console.log($rootScope.items[controller_name]);

           // console.log("111", $rootScope.items_menu);
           // setTimeout(function(){ $rootScope.items_menu=data;console.log("222",$rootScope.items_menu)},400);
           // return data.result
        })
    }

});

app.controller ("AppCtrl", function ($scope, $http, $rootScope ) {

    $rootScope.getInclude = function(selected_item){

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

/*    function readJson_news ($scope, $http,jsonFileName ) {
        $http.get(jsonFileName).success(function (data) {
            $scope.items = data;
        })
    }
    readJson_news ($scope, $http,'news.json');*/

    $scope.singlePageView=function (selected_id) {
        $rootScope.selected_item="page";
        $rootScope.selected_id=selected_id-1;
       // $rootScope.readJson ($scope, $http,'menu.json','hormenu');
    }

    $scope.textWithTags=function (html_with_text) { return html_with_text } //Show text with TAGS

})

app.controller ("hormenu", function ($scope, $http, $rootScope) {

    $rootScope.readJson ($scope, $http,'menu.json','hormenu');

    $scope.clickMenu= function (menu) {
        $rootScope.selected_item = menu.title;
        $rootScope.selected_id=menu.id-1;
    }

})

app.controller ("PaginationCtrl", function ($scope, $http, $q, $timeout, $location, ngTableParams, $rootScope) {

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
        template: "<span  click='clickMenu(menu)' ng-repeat='menu in items.hormenu.result'>{{menu.title}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>"

    }
})

app.directive ("content", function(){
    return {
        replace: false,
        restrict:"C",
        link: function (){},
        template: "<div ng-include='getInclude(selected_item)'></div>"
    }
})











