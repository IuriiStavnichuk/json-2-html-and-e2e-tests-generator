var app=angular.module("superApp", [])

app.directive ("superhero", function(){
    return {
        restrict:"E",
        scope:{},

        controller: function($scope) {

            $scope.abilities=[]

            this.addStrength = function () {
               $scope.abilities.push("stength")
            }
            this.addSpeed = function () {
                $scope.abilities.push("speed")
            }
            this.addFlight = function () {
                $scope.abilities.push("flight")
            }
        },

        link: function ( scope, element ) {
            element.addClass ("button");
            element.bind ("click", function () {
                console.log(scope.abilities);
            })
        }
    }
});

app.directive ("strength", function(){
    return {
        require: "superhero",

        link: function ( scope, element, attrs, superheroCtrl, test) {

            console.log(scope, element, attrs, superheroCtrl, test);

            superheroCtrl.addStrength();

        }
    }
})

app.directive ("speed", function(){
    return {
        require: "superhero",

        link: function ( scope, element, attrs, superheroCtrl) {

            superheroCtrl.addSpeed();

        }
    }
})

app.directive ("flight", function(){
    return {
        require: "superhero",

        link: function ( scope, element, attrs, superheroCtrl) {

            superheroCtrl.addFlight();

        }
    }
})
