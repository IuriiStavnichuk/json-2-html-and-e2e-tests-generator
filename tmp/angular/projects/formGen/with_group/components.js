var demo = angular.module( "Demo", [] );

demo.controller(
    "DemoController",
    function( $scope ) {



        $scope.group_array=[
            { group: [{groupName:"Info"},
                { title: "Pants size",value: "2", type:  "i" },
                { title: "Pants size",value: "2", type:  "i" } ,
                { title: "Pants size",value: "2", type:  "i" } ,
                { title: "Pants size",value: "2", type:  "i" } ,
                { title: "Pants size",value: "2", type:  "s" } ] },
            { group: [{groupName:"Boys"},
                { title: "Pants size",value: "2", type:  "s" },
                { title: "Pants size",value: "2", type:  "s" } ,
                { title: "Pants size",value: "2", type:  "s" } ] },
            { group: [{groupName:"Men"},
                { title: "Pants size",value: "2", type:  "s" },
                { title: "Pants size",value: "2", type:  "s" } ,
                { title: "Pants size",value: "2", type:  "s" } ] }
        ]


    }
);