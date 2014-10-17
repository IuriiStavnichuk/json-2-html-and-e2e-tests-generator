angular.module('cedric.directives', []).
    directive("dateEntry", ['$parse', function ($parse) {
        return {
            // restricted to be an attribute
            restrict: "A",
            // requires a model
            require: "ngModel",
            // update the DOM
            link: function (scope, element, attrs, ngModel) {
                var options = scope.$eval(attrs.dateEntry) || {};

                // make sure the view is updated when the model is
                // being changed by the datepick plugin
                options.onSelect = function (dateText) {
                    scope.$apply(function () {
                        ngModel.$setViewValue(element.val());
                    });
                };
                // run the plugin
                element.datepick(options);
            }
        };
    }])
angular.module('cedric.directives', []).
    directive("dateEntry", ['$parse', function ($parse) {
        return {
            // restricted to be an attribute
            restrict: "A",
            // requires a model
            require: "ngModel",
            // update the DOM
            link: function (scope, element, attrs, ngModel) {
                var options = scope.$eval(attrs.dateEntry) || {};

                // make sure the view is updated when the model is
                // being changed by the datepick plugin
                options.onSelect = function (dateText) {
                    scope.$apply(function () {
                        ngModel.$setViewValue(element.val());
                    });
                };
                // run the plugin
                element.datepick(options);
            }
        };
    }])
    .directive('payzaDisplayBlockNone', [function () {
        return function (scope, elm, attrs) {
            scope.$watch(attrs.payzaDisplayBlockNone, function (newVal, oldVal) {
                if (newVal) {
                    elm.removeClass('display-none').addClass('display-block');
                } else {
                    elm.removeClass('display-block').addClass('display-none');
                }
            });
        };
    }])
;
