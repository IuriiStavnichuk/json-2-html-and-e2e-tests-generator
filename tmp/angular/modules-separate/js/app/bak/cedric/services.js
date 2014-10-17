
angular.module('SharedServices', [])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.responseInterceptors.push('myHttpInterceptor');
        var spinnerFunction = function (data, headersGetter) {
            // todo start the spinner here
            $('.loading').show();

            return data;
        };
        $httpProvider.defaults.transformRequest.push(spinnerFunction);
    }])
// register the interceptor as a service, intercepts ALL angular ajax http calls
    .factory('myHttpInterceptor', ['$q', '$window', function ($q, $window) {
        return function (promise) {
            return promise.then(function (response) {
                // do something on success
                // todo hide the spinner
                $('.loading').hide();
                return response;

            }, function (response) {
                // do something on error
                // todo hide the spinner
                $('.loading').hide();
                return $q.reject(response);
            });
        };
    }]);

angular.module('AuthenticationServices', [], ['$routeProvider', '$locationProvider', '$httpProvider',
        function ($routeProvider, $locationProvider, $httpProvider) {

            var interceptor = ['$rootScope', '$q', function (scope, $q) {

                function success(response) {
                    return response;
                }

                function error(response) {
                    var status = response.status;

                    if (status == 401) {
                        window.location = "./login.aspx";
                        return;
                    }
                    // otherwise
                    return $q.reject(response);

                }

                return function (promise) {
                    return promise.then(success, error);
                };
            }];
            $httpProvider.responseInterceptors.push(interceptor);
        }]);
