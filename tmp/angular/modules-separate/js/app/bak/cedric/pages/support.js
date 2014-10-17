angular.module('support', ['ngResource', 'payza.countriesList', 'payza.donutChart', 'payza.questionnaireCheckout'])

    .controller('SupportPageCtrl', ['$scope', '$http', 'jsonServiceCountriesList', 'jsonServiceDonutChart1', 'jsonServiceDonutChart2', '$timeout', function ($scope, $http, jsonServiceCountriesList, jsonServiceDonutChart1, jsonServiceDonutChart2, $timeout) {


//        var events=jsonServiceCountriesList.query();
//        console.log(" events >>", events)
//        console.log(" events[0].name >>", events[0].name)

    $scope.arrayCountriesList = [{}];
    jsonServiceCountriesList.get(function (data) {
        $scope.arrayCountriesList = data.result;

    });
    $scope.arrayCountriesList2 = [{}];
    jsonServiceCountriesList.get(function (data) {
        $scope.arrayCountriesList2 = data.result;
    })

    jsonServiceDonutChart1.success(function(data) {
        $scope.donutChartData1 = data.result;
    });
    jsonServiceDonutChart2.success(function(data) {
        $scope.donutChartData2 = data.result;
    });

}])

    .factory('jsonServiceCountriesList', ['$resource', function ($resource) {
        return $resource('json/countries-list.json');
    }])
    .factory('jsonServiceDonutChart1', ['$http', function ($http) {
        return $http.get('json/donutChart/donut-chart1.json');
    }])
    .factory('jsonServiceDonutChart2', ['$http', function ($http) {
        return $http.get('json/donutChart/donut-chart2.json');
    }])

;