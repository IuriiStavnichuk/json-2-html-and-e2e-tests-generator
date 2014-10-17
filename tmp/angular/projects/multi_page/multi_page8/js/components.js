var app=angular.module("App", ['ngTable'])
    .config(function($interpolateProvider, $routeProvider, $locationProvider){
        $interpolateProvider.startSymbol('{[').endSymbol(']}');

        $routeProvider
            .when("/", { templateUrl: "view/page.html" })
            .when("/About Payza", { templateUrl: "view/default.html" })
            .when("/News/:langid", { templateUrl: "view/news.html" })
            .when("/Nouvelles/:langid", { templateUrl: "view/news.html" })
            .when("/:newsid/", { templateUrl: "view/page.html" })
            .when("/:newsid/:langid", { templateUrl: "view/page.html" })
            //.when("/", { templateUrl: "view/blank.html" })
            .otherwise({ redirectTo: "/" })
        $locationProvider.html5Mode(false);
    }
)

app.run(function ($rootScope, $http, $location) { //init global variables

    $rootScope.arrayOfUrlParts = unescape($location.$$url).split('/');
    $rootScope.chosenLang=$rootScope.arrayOfUrlParts[2]

    console.log("$rootScope.arrayOfUrlParts[1] ", $rootScope.arrayOfUrlParts[1] )

    $rootScope.languageToggle = function (chosenLang) {
        switch ( chosenLang ) {
            case "FR":
                $rootScope.JsonForMenu="menu_fr.json"
                $rootScope.JsonForNews="news_fr.json"
                break
            default :
                $rootScope.JsonForMenu="menu.json"
                $rootScope.JsonForNews="news.json"
        }
    }
    $rootScope.languageToggle ($rootScope.chosenLang);

    //$rootScope.ArticleId="1";
    //$rootScope.JsonForMenu="menu.json";
    //$rootScope.JsonForNews="news.json";

    function findArticleByUrl(arrayWithArticles, url) {

        for (var i = 0; i < arrayWithArticles.length; i++) {
            if (arrayWithArticles[i].title == url) {
                $rootScope.ArticleId=arrayWithArticles[i].id;
                return $rootScope.activeArticle = arrayWithArticles[i];
            }
        }

        $rootScope.activeArticle = arrayWithArticles [0]; //by default About Payza (source[0])
        //throw "Couldn't find Menu with Url: " + url;
    }

    function LoadJsonByUrl () {

        $http.get($rootScope.JsonForMenu).success(function (data) { $rootScope.items_menu = data; })

        $http.get($rootScope.JsonForNews).success(function (data) { $rootScope.items = data.result;

            findArticleByUrl ( $rootScope.items, $rootScope.arrayOfUrlParts[1] );

        })
    }

    LoadJsonByUrl ()
});

app.controller ("AppCtrl", function ($scope, $http, $rootScope, $route, $routeParams, $location ) {


    function findArticleById (arrayWithArticles, id) {

        for (var i = 0; i < arrayWithArticles.length; i++) {
            if (arrayWithArticles[i].id == id) {
                return $rootScope.activeArticle = arrayWithArticles[i] ;
            }
        }

        $rootScope.activeArticle = arrayWithArticles [0]; //by default About Payza (source[0])
        //throw "Couldn't find Menu with id: " + id;
    }

    function LoadJsonById () {

        $http.get($rootScope.JsonForMenu).success(function (data) { $rootScope.items_menu = data; })

        $http.get($rootScope.JsonForNews).success(function (data) { $rootScope.items = data.result;

            console.log($rootScope.JsonForNews, $rootScope.ArticleId);

            findArticleById ( $rootScope.items, $rootScope.ArticleId );

            $location.path($rootScope.activeArticle.title);

        })
    }

    $scope.clickMenu = function (ArticleId) {
        $rootScope.ArticleId=ArticleId;
        //findArticleByUrl ( $rootScope.items, ArticleURL )
        console.log("$rootScope.ArticleId", $rootScope.ArticleId)
        findArticleById ( $rootScope.items, ArticleId )
        //$rootScope.news = $rootScope.items[lastPartOfUrl-1];

        console.log($rootScope.activeArticle)
    }

    $scope.clickLangLink = function ( chosenLang ) {

        $rootScope.languageToggle (chosenLang);
        $rootScope.chosenLang=chosenLang;
        //console.log("$rootScope.chosenLang>>>", $rootScope.chosenLang);
        LoadJsonById ()

   }

   // $scope.textWithTags=function (html_with_text) { return html_with_text } //Show text with TAGS

})

/*app.controller ("hormenu", function ($scope, $http, $rootScope, $routeParams, $location) {

  $scope.clickMenu = function (menu) {

        $rootScope.menu = menu;
        $rootScope.arrayOfUrlParts=unescape(menu.url).split('/');
        var lastPartOfUrl = $rootScope.arrayOfUrlParts[2];
        $rootScope.news = $rootScope.items[lastPartOfUrl-1]; }

})*/

app.controller ("PaginationCtrl", function ( $scope, $http, $q, $timeout, $location, ngTableParams, $rootScope ) {

    console.log(">>pagination");

    var news_array=[];
    for ( var i= 0; i<$rootScope.items.length; i++ )
    {

        if ( $rootScope.items[i].type =='news'){

            news_array.push($rootScope.items[i])
        }

    }
        $scope.tableParams = new ngTableParams({
            page: 1,
            total: news_array.length,
            count: 4
        });

        $scope.$watch('tableParams', function(params) {

            $rootScope.articles = news_array.slice((params.page - 1) * params.count, params.page * params.count);
        }, true);

})

app.directive ("hormenu", function(){
    return {
        restrict:"C",
        link: function (){},
        templateUrl: "view/menu.html"
    }
})


/*app.filter('delete', function() {
    return function(input) {
        if (input!=null)  return input.replace('/', '');
    }
});*/

/*app.directive ("click", function(){
 return function (scope, element, attrs) {
 element.bind("click", function () {
 scope.$apply(attrs.click)
 })
 }
 })*/










