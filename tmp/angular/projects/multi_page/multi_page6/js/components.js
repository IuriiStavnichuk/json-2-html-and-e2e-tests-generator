var app=angular.module("App", ['ngTable'])
    .config(function($interpolateProvider, $routeProvider, $locationProvider){
        $interpolateProvider.startSymbol('{[').endSymbol(']}');

        $routeProvider
            .when("/", { templateUrl: "view/default.html" })
            .when("/About Payza", { templateUrl: "view/default.html" })
            .when("/News", { templateUrl: "view/news.html" })
            .when("/:newsid", { templateUrl: "view/page.html" })
            .when("/Support", { templateUrl: "view/default.html"})
            .when("/Features", { templateUrl: "view/default.html" })
            .when("/Legal Agreements", { templateUrl: "view/default.html" })
            //.when("/", { templateUrl: "view/blank.html" })
            .otherwise({ redirectTo: "/" })
        $locationProvider.html5Mode(false);
    }
)

/* app.run(function ($rootScope) { //global variable
   $rootScope.selected_item = 'News';
    $rootScope.selected_id="";
    $rootScope.items="";
    $rootScope.items_menu="";
    $rootScope.test2="TTTTTTTTTTTTEEESSTTT";
});*/

app.controller ("AppCtrl", function ($scope, $http, $rootScope, $route, $routeParams, $location ) {

    function findRequiredField(source, required) {
        console.log( "required>>>", required );

        for (var i = 0; i < source.length; i++) {
            if (source[i].title == required) {
                console.log( "success" );
                return $rootScope.menu = source[i];
            }
        }

        $rootScope.menu = source[0];

        throw "Couldn't find Menu with id: " + required;
    }

    var arrayOfUrlParts = unescape($location.$$url).split('/');
    var firstPartOfUrl = arrayOfUrlParts[1];
    var lastPartOfUrl = arrayOfUrlParts[2];
    console.log(firstPartOfUrl, lastPartOfUrl);
   //var url=firstPartOfUrl

    if (firstPartOfUrl=='News') {var url=lastPartOfUrl} else {var url=firstPartOfUrl}

/*    switch(firstPartOfUrl)
    {
        case "News":
            url=lastPartOfUrl
            break;
        case "":
            url="About Payza"
            break;
        case "undefined":
            url="About Payza"
            break;
        default:
           // url="About Payza"
    }*/

    //console.log("firstPartOfUrl>>>", firstPartOfUrl); console.log("lastPartOfUrl>", lastPartOfUrl);


    $http.get('menu.json').success(function (data) { $rootScope.items_menu = data;

        //findRequiredField($rootScope.items_menu.result, firstPartOfUrl )

    })
    $http.get('news.json').success(function (data) {  $rootScope.items = data.result;

        findRequiredField ( $rootScope.items, url );

    })



/*    $scope.singlePageView=function (selected_id) {

        $rootScope.news = $rootScope.items[selected_id-1];
    }*/


    $scope.clickMenu = function (menuTitle) {

        //var arrayOfUrlParts=unescape(menu.url).split('/');
        //var lastPartOfUrl = arrayOfUrlParts[2];
        //$rootScope.menu = $rootScope.items_menu.result[id];
        //findRequiredField($rootScope.items_menu.result, menuTitle )

        findRequiredField ( $rootScope.items, menuTitle )

        $rootScope.news = $rootScope.items[lastPartOfUrl-1];
    }




    $scope.textWithTags=function (html_with_text) { return html_with_text } //Show text with TAGS

})

app.controller ("hormenu", function ($scope, $http, $rootScope, $routeParams, $location) {


/*    $scope.clickMenu = function (menu) {

        $rootScope.menu = menu;

        var arrayOfUrlParts=unescape(menu.url).split('/');
        var lastPartOfUrl = arrayOfUrlParts[2];

        $rootScope.news = $rootScope.items[lastPartOfUrl-1];
    }*/

})

app.controller ("PaginationCtrl", function ( $scope, $http, $q, $timeout, $location, ngTableParams, $rootScope ) {

    //$http.get('news.json').success(function (data) { $rootScope.items = data.result;

        $scope.tableParams = new ngTableParams({
            page: 1,
            total: $rootScope.items.length,
            count: 4
        });

        $scope.$watch('tableParams', function(params) {
            $rootScope.articles = $rootScope.items.slice((params.page - 1) * params.count, params.page * params.count);
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

/*app.directive ("content", function(){
    return {
        replace: false,
        restrict:"C",
        link: function (){},
        template:
            "<div ng-include='getInclude()'></div>"
    }
})*/

/*app.filter('delete', function() {
    return function(input) {
        if (input!=null)  return input.replace('/', '');
    }
});*/










