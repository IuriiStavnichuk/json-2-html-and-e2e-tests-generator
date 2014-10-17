angular.module('MainWebApp', [ 'ngResource','payza.countriesList'])

angular.module('payza.countriesList',[])
    .directive("countriesList", function () {
        return {
            restrict: "E",
            // templateUrl: "ng-partials/modules/countriesList.html",
            template:
                "<div>"+
                    "    <div class='column-left'>"+
                    "        <ul>"+
                    "            <li>"+
                    "                <input type='checkbox'  data-ng-init='arrayCountriesList.selectAllCheckersState=false' data-ng-click='arrayCountriesList.selectAllCheckersState=!arrayCountriesList.selectAllCheckersState;selectAllCheckers()' data-ng-model='arrayCountriesList.selectAllCheckersState'><span>Select all</span>"+
                    "            </li>"+
                    "        </ul>"+
                    "        <div data-ng-repeat='continent in arrayCountriesList'>"+
                    "            <ul>"+
                    "                <li class='continent'>"+
                    "                   <span data-ng-class='classname' data-ng-init=\"classname='icon-state-true';showHide=true\" data-ng-click=\"showHide=!showHide; classname='icon-state-'+showHide\"></span>"+
                    "                    <input type='checkbox' data-ng-model='continent.isSelected' data-ng-click='continent.isSelected=!continent.isSelected;selectAllCountriesInContinent( $index, continent.isSelected )'>"+
//                    "<span data-ng-click=\"showHide=!showHide; classname='icon-state-'+showHide\">{{continent.continent}}</span>"+
                    "                   <span data-ng-click=\"showHide=!showHide; classname='icon-state-'+showHide\">{{continent.continent}}</span>"+
                    "                </li>"+
                    "            </ul>"+
//                    "            <ul payza-display-block-none='showHide'>"+
                    "            <ul data-ng-show='showHide'>"+
                    "                <li data-ng-repeat='country in continent.country'>"+
                    "                    <input type='checkbox' data-ng-model='country.isSelected' data-ng-click='changeIsSelectedStatus( country.id )'><span>{{country.name}}</span>"+
                    "                </li>"+
                    "            </ul>"+
                    "        </div>"+
                    "    </div>"+
                    "    <div class='column-right'>"+
                    "        <ul>"+
                    "            <li class='selected-countries'>"+
                    "                <span>({{numberOfSelectedCountries}}) selected countries  </span>"+
                    "                <a class='reset-link' data-ng-click='resetArrayCountriesList()'> Reset</a>"+
                    "            </li>"+
                    "        </ul>"+
                    "        <ul data-ng-repeat='continent in arrayCountriesList'>"+
                    "            <li data-ng-repeat='country in continent.country' data-ng-show='country.isSelected'>"+
                    "                <input type='checkbox' data-ng-model='country.isSelected' data-ng-click='changeIsSelectedStatus()'><span>{{country.name}}</span>"+
                    "            </li>"+
                    "        </ul>"+
                    "    </div>"+
                    "    <div class='clear'></div>"+
                    "</div>",
            replace:true,
            transclude: true,
            scope:{
                arrayCountriesList:'='
//                getarray:"&"
            },
            link: function ($scope) {
                $scope.numberOfSelectedCountries = 0;
                $scope.changeIsSelectedStatus = function (countryId) {
                    $scope.numberOfSelectedCountries = 0;
                    $scope.countryIdMin=(countryId<$scope.prevCountryId)?countryId:$scope.prevCountryId;
                    $scope.countryIdMax=(countryId>$scope.prevCountryId)?countryId:$scope.prevCountryId;

                    for (var continentIndex in $scope.arrayCountriesList) {
                        for (var countryIndex in $scope.arrayCountriesList[continentIndex].country) {
                            if ( window.shiftDown && $scope.arrayCountriesList[continentIndex].country[countryIndex].id>=$scope.countryIdMin && $scope.arrayCountriesList[continentIndex].country[countryIndex].id<=$scope.countryIdMax) //if only one continent
                            {$scope.arrayCountriesList[continentIndex].country[countryIndex].isSelected=true;
                            }
                            if ($scope.arrayCountriesList[continentIndex].country[countryIndex].isSelected) {
                                $scope.numberOfSelectedCountries++;
                            }
                        }
                    }
                    $scope.prevCountryId=countryId;
                };
                $scope.selectAllCountriesInContinent = function (continentIndex, continentIsSelected ) {

                    for (var countryIndex in $scope.arrayCountriesList[continentIndex].country) {
                        $scope.arrayCountriesList[continentIndex].country[countryIndex].isSelected=continentIsSelected;
                        $scope.numberOfSelectedCountries=($scope.arrayCountriesList[continentIndex].country[countryIndex].isSelected)? $scope.numberOfSelectedCountries+1:$scope.numberOfSelectedCountries-1;
                    }
                }
                $scope.selectAllCheckers = function () {
                    if ($scope.arrayCountriesList.selectAllCheckersState === true) {
                        for (var continentIndex in $scope.arrayCountriesList) {
                            for (var countryIndex in $scope.arrayCountriesList[continentIndex].country) {
                                $scope.arrayCountriesList[continentIndex].isSelected = true;
                                $scope.arrayCountriesList[continentIndex].country[countryIndex].isSelected = true;
                                $scope.numberOfSelectedCountries++;
                            }
                        }
                    } else {
                        $scope.resetArrayCountriesList();
                    }
                };
                $scope.resetArrayCountriesList = function () {
                    for (var continentIndex in $scope.arrayCountriesList) {
                        for (var countryIndex in $scope.arrayCountriesList[continentIndex].country) {
                            $scope.arrayCountriesList[continentIndex].country[countryIndex].isSelected = false;
                            $scope.arrayCountriesList[continentIndex].isSelected = false;
                        }
                    }
                    $scope.arrayCountriesList.selectAllCheckersState = false;
                    $scope.numberOfSelectedCountries=0;
                };
            }
        };
    })
    .controller('CountriesListCtrl', ['$scope', '$http', 'jsonServiceCountriesList',  function ($scope, $http, jsonServiceCountriesList) {
        $scope.arrayCountriesList = [{}];
        jsonServiceCountriesList.get(function (data) {
            $scope.arrayCountriesList = data.result;

        });
    }])

    .factory('jsonServiceCountriesList', ['$resource', function ($resource) {
        return $resource('json/countries-list.json');
    }])
;