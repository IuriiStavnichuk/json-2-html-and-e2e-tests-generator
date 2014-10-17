If you want to go beyond binary evaluation and keep your CSS out of your controller you can implement a simple filter that evaluates the input against a map object:
angular.module('myApp.filters, [])
  .filter('switch', function () { 
      return function (input, map) {
          return map[input] || '';
      }; 
  });
This allows you to write your markup like this:
<div ng-class="muppets.star|switch:{'Kermit':'green', 'Miss Piggy': 'pink', 'Animal': 'loud'}">
    ...
</div>

Services

Syntax: module.service( 'serviceName', function ); Result: When declaring serviceName as an injectable argument you will be provided with an instance of the function. In other words new FunctionYouPassedToService().

Factories

Syntax: module.factory( 'factoryName', function ); Result: When declaring factoryName as an injectable argument you will be provided with the value that is returned by invoking the function reference passed to module.factory.

Providers

Syntax: module.provider( 'providerName', function ); Result: When declaring providerName as an injectable argument you will be provided with new ProviderFunction().$get(). The constructor function is instantiated before the $get method is called - ProviderFunction is the function reference passed to module.provider.

$timeout(function() { console.log(" $scope.arrayCountriesList >>", $scope.arrayCountriesList)});

$scope.$watch('data', function (newVal, oldVal) {  if (!newVal) { return;}



----------------------------------------------------------------------------------------------
How to make input[text] ngModel delay valued while typing [duplicate]

The tidiest way to handle this is probably to write a directive which wraps up the <input> element and adds the delaying behaviour. Here is a directive I wrote for the same purpose:

angular.module('MyModule')
    .directive('easedInput', function($timeout) {
        return {
            restrict: 'E',
            template: '<div>
    <input class="my-eased-input" type="text" ng-model="currentInputValue" ng-change="update()" placeholder="{{placeholder}}"/>
</div>',
            scope: {
                value: '=',
                timeout: '@',
                placeholder: '@'
            },
            transclude: true,
            link: function ($scope) {
                $scope.timeout = parseInt($scope.timeout);
                $scope.update = function {
                    if ($scope.pendingPromise) { $timeout.cancel($scope.pendingPromise); }
                    $scope.pendingPromise = $timeout(function () { 
                        $scope.value = $scope.currentInputValue
                    }, $scope.timeout);
                };
            }
        }
    });
This directive would be called in your HTML like so:

<eased-input value="myValue" timeout="500" placeholder="Please enter text..." />
Dissecting the directive:

Timeout Service

This directive uses angular's $timeout service to handle timing: it is an injectable, mockable, idiomatic alternative to calling setTimeout. This service is injected in the directive constructor.

Attributes

The directive accepts three attributes: value, timeout and placeholder.

The value attribute here binds to a variable on the scope of the controller which owns the enclosing 'context'. In this case it binds to myValue, i.e. to $scope.myValue on whichever controller is in charge of this code. It has a two-way binding, denoted by the '=' entry in the scope property of the directive. This means that when this directive updates value, the change is propagated up to the controller which owns the directive; hence, $scope.myValue will change when value is changed inside the directive.

The timeout and placeholder attributes have one-way bindings: the directive reads their values from the attributes but does not alter them. They are effectively configuration values.

HTML Template

The template property on the directive shows the HTML which will be generated in its place once Angular compiles and links it. It's basically just an input element with some special and not-so-special attributes. The value in the input box is bound to the currentInputValue variable on the directive's $scope via ng-model. The change event on the input box is bound to the update function on the directive's $scope via the ng-change directive.

Link function

The guts of the process lie in the link function on the directive: we define an update method. As stated above, this method is bound to the change event of the input box within the directive's HTML template. Thus, every time the user changes the input in the box, update is called.

This method uses the $timeout service. It tells the $timeout service to wait for timeout milliseconds, then to apply a callback which sets $scope.value = $scope.currentInputValue. This is similar to calling setTimeout(function () {$scope.value = $scope.currentInputValue}, timeout).

The $timeout call returns a promise. We are able to cancel a promise p produced by $timeout which is waiting to execute by calling $timeout.cancel(p). This is what update does in its first line: if we have a promise from a previous change event, we cancel it before creating a new one. This means that if we have e.g. a 500ms timeout, and update gets called twice, with the calls 400ms apart, we will only have one promise waiting to fire.

Overall result

The promise, when resolved, sets $scope.value = currentInputValue; i.e. it sets the 'outwardly visible' value property to have the value of the contents of the input box. value will only change -- and external controllers will only see value change -- after a quiescent period of timeout milliseconds, which I believe is the behaviour you were after.
------------------------------------------------