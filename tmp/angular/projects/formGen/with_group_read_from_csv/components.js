var demo = angular.module( "Demo", [] );

demo.controller(
    "DemoController",
    function( $scope ) {



        $scope.group_array=[
            { group: [
                { groupName:"Info", title: "Pants size",value: "2", type:  "input" },
                {                   title: "Pants size",value: "2", type:  "input" } ,
                {                   title: "Pants size",value: "2", type:  "input" } ,
                {                   title: "Pants size",value: "2", type:  "input" } ,
                {                   title: "Pants size",value: "2", type:  "select" } ] },
            { group: [
                { groupName:"Boy", title: "Pants size",value: "2", type:  "input" },
                {                  title: "Pants size",value: "2", type:  "input" } ,
                {                  title: "Pants size",value: "2", type:  "select" } ] },
            { group: [
                { groupName:"Men", title: "Pants size",value: "2", type:  "input" },
                {                  title: "Pants size",value: "2", type:  "input" } ,
                {                  title: "Pants size",value: "2", type:  "select" } ] }
        ]


    }
);