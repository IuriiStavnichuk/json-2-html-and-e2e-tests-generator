MainWebApp.directive("progressBar", function () {
    return {
        restrict: "E",
        replace: true,
        template:
            '<div class="progress-block">' +
                        '<div class="progress">' +
                            '<div class="progress-bar"></div>' +
                        '</div>' +
                        '<label>{{value}}%</label>' +
                   '</div>',
        scope: {
            value: '='
        },
        link: function (scope) {
            scope.$watch('value', function () {
                angular.element('.complete-profile .progress-bar').css('width', scope.value + '%');
            });


        }
    };
});