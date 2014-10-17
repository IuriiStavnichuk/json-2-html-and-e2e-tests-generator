var app=angular.module("App", ['ngTable'])
    .config(function($interpolateProvider, $routeProvider, $locationProvider){
        $interpolateProvider.startSymbol('{[').endSymbol(']}');

        $routeProvider
            .when("/", { templateUrl: "view/default.html" })
            .when("/About Payza", { templateUrl: "view/default.html" })
            .when("/News", { templateUrl: "view/news.html" })
            .when("/Nouvelles", { templateUrl: "view/news.html" })
            .when("/:newsid", { templateUrl: "view/page.html" })
            .when("/Support", { templateUrl: "view/default.html"})
            .when("/Features", { templateUrl: "view/default.html" })
            .when("/Legal Agreements", { templateUrl: "view/default.html" })
            //.when("/", { templateUrl: "view/blank.html" })
            .otherwise({ redirectTo: "/" })
        $locationProvider.html5Mode(false);
    }
)

app.run(function ($rootScope) { //global variable
    $rootScope.JsonForMenu="menu.json";
    $rootScope.JsonForNews="news.json";
});

app.controller ("AppCtrl", function ($scope, $http, $rootScope, $route, $routeParams, $location ) {

    function findRequiredField(source, required) {

        for (var i = 0; i < source.length; i++) {
            if (source[i].title == required) {
                console.log("3 $rootScope.menu >>>", source[i] );
                return $rootScope.menu = source[i];
            }
        }

        $rootScope.menu = source[0]; //by default About Payza (source[0])

        throw "Couldn't find Menu with id: " + required;
    }

    var arrayOfUrlParts = unescape($location.$$url).split('/');

    function LoadJson ()
    {
        console.log("1>>>", $rootScope.JsonForNews);

        $http.get($rootScope.JsonForMenu).success(function (data) { $rootScope.items_menu = data; })

        $http.get($rootScope.JsonForNews).success(function (data) { $rootScope.items = data.result;
            findRequiredField ( $rootScope.items, arrayOfUrlParts[1] );
        })
    }

    LoadJson ()


    $scope.clickMenu = function (menuTitle) {

        findRequiredField ( $rootScope.items, menuTitle )

        //$rootScope.news = $rootScope.items[lastPartOfUrl-1];
    }

    $scope.clickLangLink = function (selectedLang) {

        switch (selectedLang) {
            case "FR":
                $rootScope.JsonForMenu="menu_fr.json"
                $rootScope.JsonForNews="news_fr.json"
                break
            default :
                $rootScope.JsonForMenu="menu.json"
                $rootScope.JsonForNews="news.json"
        }
        LoadJson ()
    }

    $scope.textWithTags=function (html_with_text) { return html_with_text } //Show text with TAGS

})

app.controller ("hormenu", function ($scope, $http, $rootScope, $routeParams, $location) {


/*  $scope.clickMenu = function (menu) {

        $rootScope.menu = menu;

        var arrayOfUrlParts=unescape(menu.url).split('/');
        var lastPartOfUrl = arrayOfUrlParts[2];

        $rootScope.news = $rootScope.items[lastPartOfUrl-1];
    }*/

})

app.controller ("PaginationCtrl", function ( $scope, $http, $q, $timeout, $location, ngTableParams, $rootScope ) {

    //$http.get('news.json').success(function (data) { $rootScope.items = data.result;
    var news_array=[];
    for (var i= 0; i<$rootScope.items.length; i++)
    {

        if ( $rootScope.items[i].type =='news'){

            news_array.push($rootScope.items[i])
        }

    }
        $scope.tableParams = new ngTableParams({
            page: 1,
            // total: $rootScope.items.length,
            total: news_array.length,
            count: 4
        });

        $scope.$watch('tableParams', function(params) {
            // $rootScope.articles = $rootScope.items.slice((params.page - 1) * params.count, params.page * params.count);
            $rootScope.articles = news_array.slice((params.page - 1) * params.count, params.page * params.count);
        }, true);
    //})
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
        //template:"<a href='#/{{menu.title}}'  click='clickMenu(menu)' ng-repeat='menu in items_menu.result' ng-show='menu.idParent==0' >{{menu.title}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>"
        templateUrl: "view/menu.html"
    }
})




/*app.filter('delete', function() {
    return function(input) {
        if (input!=null)  return input.replace('/', '');
    }
});*/










