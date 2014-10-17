angular.module('payza.formGenerator',['payza.formElements'])

    .directive("questionnaireCheckout", function () {
        return {
            restrict: "E",
            templateUrl: "js/app/cedric/modules/QuestionnaireCheckout.html",
            replace:true,
            transclude: true,
            link: function ($scope) {

            }
        };
    })

    .controller("formGenerator",[ '$scope', function( $scope ) {



        $scope.answers=[
            { level1: [
                { type:"fieldset", title:"Introduction", visible:"true",
                    level2:[
                        {type:"radio-check-field", title:"What sort of business do you conduct?", visible:"true",
                            level3:[
                                { type:  "radio-check-item", title: "Pants size", value: "2", visible:"true"} ,
                                { type:  "radio-check-item", title: "Pants size", value: "2", visible:"true"} ,
                                { type:  "radio-check-item", title: "Pants size", value: "2", visible:"true"}
                            ]
                        }
                    ]

                }
            ] },
            { level1: [
                { type:"fieldset", title:"Introduction", visible:"true",
                    level2:[
                        {type:"radio-check-field", title:"What sort of business do you conduct?", visible:"true",
                            level3:[
                                { type:  "radio-check-item", title: "Pants size", value: "2", visible:"true"} ,
                                { type:  "radio-check-item", title: "Pants size", value: "2", visible:"true"} ,
                                { type:  "radio-check-item", title: "Pants size", value: "2", visible:"true"}
                            ]
                        }
                    ]

                }
            ] }
        ]


    }])


;

